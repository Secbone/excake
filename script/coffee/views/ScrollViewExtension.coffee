define (require, exports, module)->
	Engine = require 'famous/core/Engine'
	ScrollView = require 'famous/views/Scrollview'
	GenericSync = require 'famous/inputs/GenericSync'
	MouseSync = require 'famous/inputs/MouseSync'

	GenericSync.register 
		mouse: MouseSync

	class ScrollViewExtension extends ScrollView
		defaults: {}
		constructor: ->
			ScrollView.apply @, arguments
			@options = _.extend(@defaults, @options)

			@displayed = {}

			@sync = new GenericSync ['mouse', 'touch', 'scroll'], 
				direction: GenericSync.DIRECTION_Y

			@_eventInput.pipe @sync
			@sync.pipe @_eventInput

			@_monitorOffsets()
		_monitorOffsets: ->
			Engine.on 'prerender', =>
				newDisplay = {}
				node = @_node.getPrevious() || @_node
				for i in [node.index...node.index+7]
					newDisplay[i] = true
					if !@displayed[i] && node._.array[i]
						node._.array[i].rowView.animateIn()

				for row in @displayed
					if !(row in newDisplay) && node._.array[row]
						node._.array[row].rowView.reset()

				@displayed = newDisplay


	module.exports = ScrollViewExtension