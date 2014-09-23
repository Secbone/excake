define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'
	Timer = require 'famous/utilities/Timer'

	StripView = require 'views/StripView'

	StripData = require 'data/StripData'

	class MenuView extends View
		defaults:
			stripData: StripData.getData()
			angle: -0.2
			stripWidth: 320
			stripHeight: 54
			topOffset: 37
			stripOffset: 58
			staggerDelay: 35
			transition: 
				deration: 400
				curve: 'easeOut'
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createBackground()
			@_createStripViews()
		resetStrips: ->
			for item, i in @stripModifiers
				initX = -@options.stripWidth
				initY = @options.topOffset + @options.stripOffset*i + @options.stripWidth*Math.tan(-@options.angle)
				item.setTransform(Transform.translate(initX, initY, 0))
		animateStrips: ->
			@resetStrips()
			transition = @options.transition
			delay = @options.staggerDelay
			stripOffset = @options.stripOffset
			topOffset = @options.topOffset
			for item, i in @stripModifiers
				Timer.setTimeout ((i, item)=>
					yOffset = topOffset + stripOffset * i
					item.setTransform(Transform.translate(0, yOffset, 0), transition)
				).bind(@, i, item), i*delay
		_createBackground: ->
			backgroundSurface = new Surface 
				size: [320, undefined]
				properties:
					backgroundColor: 'gray'
					boxShadow: '0 0 1px rgba(0,0,0,1)'
			@add(backgroundSurface)
		_createStripViews: ->
			@stripModifiers = []
			yOffset = @options.topOffset

			for item in @options.stripData
				stripView = new StripView
					title: item.title
				stripModifier = new StateModifier 
					transform: Transform.translate(0, yOffset, 0)
				@stripModifiers.push stripModifier
				@add(stripModifier).add(stripView)
				yOffset += @options.stripOffset

	module.exports = MenuView