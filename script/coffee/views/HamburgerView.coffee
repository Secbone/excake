define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'
	Timer = require 'famous/utilities/Timer'

	class HamburgerView extends View
		defaults: 
			width: 30
			height: 30
			lineSize: [30, 7]
			lineStyle: 
				backgroundColor: 'white'
			transition:
				duration: 200
				curve: 'linear'
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createLines()
			@_setListeners()
			#@setOpenStatus()
		_createLines: ->
			lineSurfaces = []
			@lineModifiers = []
			for i in [0..2]
				surface = new Surface 
					size: @options.lineSize
					properties: @options.lineStyle
				modifier = new StateModifier
					align: [0.5, 0.5*i]
					origin: [0.5, 0.5*i]
				@add(modifier).add(surface);
				lineSurfaces.push surface
				@lineModifiers.push modifier

			@eventSurface = new Surface()
			@add(@eventSurface)
		_setListeners: ->
			@subscribe(@eventSurface)
		setOpenStatus: ->
			for item, i in @lineModifiers
				item.setAlign [0.5, 0.5], @options.transition
				item.setOrigin [0.5, 0.5], @options.transition
				Timer.setTimeout ((i, item)->
					if i == 1
						item.setTransform Transform.rotateZ(Math.PI/4), @options.transition
					else
						item.setTransform Transform.rotateZ(-Math.PI/4), @options.transition
				).bind(@, i, item), @options.transition.duration
		setCloseStatus: ->
			for item, i in @lineModifiers
				item.setTransform Transform.rotateZ(0), @options.transition
				Timer.setTimeout ((i, item)->
					item.setAlign [0.5, 0.5*i], @options.transition
					item.setOrigin [0.5, 0.5*i], @options.transition
				).bind(@, i, item), @options.transition.duration

		module.exports = HamburgerView