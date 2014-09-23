define (require, exports, module)->
	StripData = 
		_data: [
			{
				title: '敬请期待'
			}
			{
				title: '敬请期待'
			}
			{
				title: '敬请期待'
			}
		]
		getData: ->
			@_data

	module.exports = StripData