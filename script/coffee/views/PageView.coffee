define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'
	HeaderFooter = require 'famous/views/HeaderFooterLayout'
	FastClick = require 'famous/inputs/FastClick'

	HamburgerView = require 'views/HamburgerView'
	LogoView = require 'views/LogoView'

	class PageView extends View
		defaults: 
			headerSize: 100
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createLayout()
			@_createHeader()
			@_createBody()
			@_setListeners()
		_createLayout: ->
			@layout = new HeaderFooter 
				headerSize: @options.headerSize
			layoutModifier = new StateModifier 
				transform: Transform.translate(0,0,0.1)
			@add(layoutModifier).add(@layout)
		_createHeader: ->
			backgroundSurface = new Surface 
				size: [undefined,100]
				properties: 
					backgroundColor: '#a4ffa5'
			backgroundModifier = new StateModifier 
				transform: Transform.behind
			@hamburgerView = new HamburgerView()
			hamburgerModifier = new StateModifier 
				size: [30, 30]
				align: [0, 0.5]
				origin: [-0.5, 0.5]
			@logoView = new LogoView()
			@layout.header.add(backgroundModifier).add(backgroundSurface)
			@layout.header.add(hamburgerModifier).add(@hamburgerView)
			@layout.header.add(@logoView)

		_createBody: ->
			@bodySurface = new Surface 
				size: [undefined, undefined]
				properties: 
					backgroundColor: 'white'
			@layout.content.add(@bodySurface)
		_setListeners: ->
			@hamburgerView._eventInput.on 'click', =>
				@_eventOutput.emit 'menuToggle'
			@on 'slideRight', =>
				@hamburgerView.setOpenStatus()
			@on 'slideLeft', =>
				@hamburgerView.setCloseStatus()
			@bodySurface.pipe(@_eventOutput)

	module.exports = PageView