define (require, exports, module)->
	View = require 'famous/core/View'
	Surface = require 'famous/core/Surface'
	Modifier = require 'famous/core/Modifier'
	Transform = require 'famous/core/Transform'
	ScrollView = require 'famous/views/Scrollview'
	SequentialLayout = require 'famous/views/SequentialLayout'
	Transitionable = require 'famous/transitions/Transitionable'
	GenericSync = require 'famous/inputs/GenericSync'

	ContainerSurface = require 'famous/surfaces/ContainerSurface'

	CakesData = require 'data/CakesData'

	ScrollViewExtension = require 'views/ScrollViewExtension'
	RowView = require 'views/RowView'

	class ContainerView extends View
		defaults:
			height: undefined
			width: undefined
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createContent()
		_createContent: ->
			@scrollView = new ScrollViewExtension 
				margin: 1000000
			#@scrollView.on 'start', =>

			views = []
			@scrollView.sequenceFrom(views)

			@rowViews = []
			count = 0
			for row in [1..3]
				console.log row
				rowView = new RowView
					size: [200, 200]
					scrollView: @scrollView
					count: count
					row: row
					images: CakesData.getRowData(row, 3)
				@rowViews.push rowView
				views.push rowView.sequentialLayout
				count += 3
			@container = new ContainerSurface 
				classes: ['scrollContainer']
				size: [@options.width, @options.height]
				properties:
					overflow: 'hidden'

			@container.add @scrollView

			#testView = new RowView()

			#@container.add testView
			@_add @container
		render: ->
			@_node.render.apply(@_node, arguments)

	module.exports = ContainerView