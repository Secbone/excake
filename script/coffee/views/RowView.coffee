define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Transform = require 'famous/core/Transform'
	Modifier = require 'famous/core/Modifier'
	SequentialLayout = require 'famous/views/SequentialLayout'

	class RowView extends View
		defaults:
			size: [undefined, 100]
			space: 10
			images: []
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createContent()
			@sequentialLayout.rowView = @
		_createContent: ->
			views = []
			@sequentialLayout = new SequentialLayout
				itemSpacing: 0
				direction: 0

			@modifiers = []

			for item, i in @options.images
				surface = new Surface 
					size: @options.size
					content: "<img width=#{@options.size[0]}px height=#{@options.size[1]}px src=#{item.pic} />"
				Xoffset = @options.space*(i+1)
				Yoffset = @options.space*(@options.row) + 50
				modifier = new Modifier 
					transform: Transform.translate Xoffset, Yoffset, 0
					opacity: 1
				modifier.offset = Xoffset
				@modifiers.push modifier
				view = new View
					size: @options.size
				view._add(modifier).add(surface)
				surface.pipe @options.scrollView
				views.push view
			###
			contentSurface = new Surface
				size: @options.size
				properties: 
					backgroundColor: "hsl("+Math.random()*360+", 100%, 50%)"
			view = new View()
			view.add contentSurface
			views.push view
			###
			@sequentialLayout.sequenceFrom views
		animateIn: ->
			return

	module.exports = RowView