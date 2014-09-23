define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'
	ImageSurface = require 'famous/surfaces/ImageSurface'
	Easing = require 'famous/transitions/Easing'
	Timer = require 'famous/utilities/Timer'

	class Logoview extends View
		defaults:
			size: [100, 100]
			transition: 
				duration: 500
				curve: Easing.outBack
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createLogo()
		_createLogo: ->
			logoSurface = new ImageSurface
				size: @options.size
				content: 'images/logo.jpg'
				properties: 
					overflow: 'hidden'
					border: '5px solid white'
					zIndex: 3
					borderRadius: '50%'
			logoModifier = new StateModifier 
				align: [0.5, 1]
				origin: [0.5, 0.5]
				transform: Transform.scale(0, 0, 1)
			@add(logoModifier).add(logoSurface)
			logoModifier.setTransform Transform.scale(1, 1, 1), @options.transition
