define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	StateModifier = require 'famous/modifiers/StateModifier'
	ImageSurface = require 'famous/surfaces/ImageSurface'

	ContainerSurface = require 'famous/surfaces/ContainerSurface'

	Easing = require 'famous/transitions/Easing'
	Timer = require 'famous/utilities/Timer'

	class Logoview extends View
		defaults:
			width: 100
			height: 100
			color: 0
			borderWidth: 4
			transition: 
				duration: 500
				curve: Easing.outBack
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createLogo()
		_createLogo: ->
			logoSurface = new Surface
				size: [@options.width+10, @options.height+10]
				content: '<img style="overflow:hidden" width='+@options.width+' height='+@options.height+'px src="images/logo.jpg" />'
				properties: 
					overflow: 'hidden'
					border: '5px solid white'
					zIndex: 3
					borderRadius: '50%'
			borderSurface = new Surface
				size: [@options.width+10+@options.borderWidth*2, @options.height+10+@options.borderWidth*2]
				properties:
					backgroundColor: "hsl("+@options.color+", 100%, 50%)"
					borderRadius: "50%"
					zIndex: 2
			borderModifier = new StateModifier 
				align: [0.5, 1]
				origin: [0.5, 0.5]
			logoModifier = new StateModifier 
				align: [0.5, 1]
				origin: [0.5, 0.5]
				transform: Transform.scale(0, 0, 1)
			@add(borderModifier).add(borderSurface)
			@add(logoModifier).add(logoSurface)
			logoModifier.setTransform Transform.scale(1, 1, 1), @options.transition
