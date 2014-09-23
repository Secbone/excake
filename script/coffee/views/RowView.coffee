define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	Modifier = require 'famous/core/Modifier'
	SequentialLayout = require 'famous/views/SequentialLayout'

	class RowView extends View
		defaults:
			size: [undefined, 100]
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createContent()
			@sequentialLayout.rowView = @
		_createContent: ->
			views = []
			@sequentialLayout = new SequentialLayout
				direction: 0
			contentSurface = new Surface
				size: @options.size
				properties: 
					backgroundColor: "hsl("+Math.random()*360+", 100%, 50%)"

			view = new View()
			view.add contentSurface
			views.push view
			@sequentialLayout.sequenceFrom views
		animateIn: ->
			return

	module.exports = RowView