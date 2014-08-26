define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'

	class StripView extends View
		defaults: 
			width: 320
			height: 55
			angle: -0.2
			title: 'title'
			fontSize: 26
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createBackground()
			@_createTitle()
		_createBackground: ->
			backgroundSurface = new Surface 
				size: [@options.width, @options.height]
				properties:
					backgroundColor: 'black'
					boxShadow: '0 0 1px rgba(0,0,0,1)'
			rotateModifier = new StateModifier 
				transform: Transform.rotateZ(@options.angle)
			skewModifier = new StateModifier 
				transform: Transform.skew(0, 0, @options.angle)
			@add(rotateModifier).add(skewModifier).add(backgroundSurface)
		_createTitle: ->
			titleSurface = new Surface 
				size: [true, true]
				content: @options.title
				properties:
					color: 'white'
					fontSize: @options.fontSize
					textTransform: 'uppercase'
					pointerEvents: 'none'
			titleModifier = new StateModifier
				transform: Transform.thenMove(Transform.rotateZ(@options.angle), [75, -5, 0])
			@add(titleModifier).add(titleSurface)	

	module.exports = StripView