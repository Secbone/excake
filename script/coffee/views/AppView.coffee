define (require, exports, module)->
	View = require 'famous/core/View'
	Surface	= require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'
	Modifier = require 'famous/core/Modifier'
	Easing = require 'famous/transitions/Easing'

	PageView = require 'views/PageView'
	MenuView = require 'views/MenuView'
	StripData = require 'data/StripData'

	GenericSync = require 'famous/inputs/GenericSync'
	MouseSync = require 'famous/inputs/MouseSync'
	TouchSync = require 'famous/inputs/TouchSync'
	Transitionable = require 'famous/transitions/Transitionable'

	GenericSync.register 
		'mouse': MouseSync
		'touch': TouchSync

	class AppView extends View
		defaults :
			openPosition: 276
			posThreshold: 138
			velThreshold: 0.75
			transition:
				duration: 300
				curve: Easing.outBack
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@menuToggle = false
			@pageViewPos = new Transitionable(0)

			@_createMenuView()
			@_createPageView()

			@_setListeners()
			@_handleSwipe()
		_createPageView: ->
			@pageView = new PageView()
			@pageModifier = new Modifier 
				transform: =>
					Transform.translate(@pageViewPos.get(), 0, 0)

			@add(@pageModifier).add(@pageView)
		_createMenuView: ->
			@menuView = new MenuView
				stripData: StripData
			@menuModifier = new StateModifier 
				transform: Transform.behind
			@add(@menuModifier).add(@menuView)
		_setListeners: ->
			@pageView.on 'menuToggle', @toggleMenu.bind(this)
		_handleSwipe: ->
			sync = new GenericSync ['mouse', 'touch'], 
				direction: GenericSync.DIRECTION_X
			@pageView.pipe(sync)
			sync.on 'update', (data)=>
				currentPosition = @pageViewPos.get()
				if currentPosition is 0 and data.velocity > 0
					@menuView.animateStrips()
				@pageViewPos.set Math.min(@options.openPosition, Math.max(0, currentPosition + data.delta))
			sync.on 'end', (data)=>
				velocity = data.velocity
				position = @pageViewPos.get()
				if position > @options.posThreshold
					if velocity < -@options.velThreshold
						@slideLeft()
					else
						@slideRight()
				else
					if velocity > @options.velThreshold
						@slideRight()
					else
						@slideLeft()
		toggleMenu: ->
			if @menuToggle
				@slideLeft()
			else
				@slideRight()
				@menuView.animateStrips()
			@menuToggle = !@menuToggle
		slideRight: ->
			@pageViewPos.set @options.openPosition, @options.transition, =>
				@menuToggle = true
			@pageView._eventOutput.emit('slideRight')
		slideLeft: ->
			@pageViewPos.set 0, @options.transition, =>
				@menuToggle = false
			@pageView._eventOutput.emit('slideLeft')
		

	module.exports = AppView