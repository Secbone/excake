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
			imgSize: [300, 300]
			imgSpace: 10
			imgMinSpace: 10
		constructor: ->
			View.apply @, arguments
			@options = _.extend(@defaults, @options)

			@_createContent()
		_createContent: ->
			rowLength = @getRowLength()
			console.log rowLength
			rowCount = CakesData.getRows rowLength
			@scrollView = new ScrollViewExtension 
				margin: 1000000
			#@scrollView.on 'start', =>

			views = []
			@scrollView.sequenceFrom(views)

			@rowViews = []
			count = 0
			for row in [1..rowCount]
				rowView = new RowView
					size: @options.imgSize
					scrollView: @scrollView
					count: count
					space: @options.imgSpace
					row: row
					images: CakesData.getRowData(row, rowLength)
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
		getRowLength: ->
			width = window.innerWidth
			console.log width
			i = 0
			i++ until @options.imgSize[0]*i + @options.imgMinSpace*(i+1) >= width
			i= i-1 || 1

			@options.imgSpace = (width-@options.imgSize[0]*i)/(i+1)
			i

	module.exports = ContainerView