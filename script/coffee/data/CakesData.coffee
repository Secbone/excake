define (require, exports, module)->
	CakesData = 
		_data: [
			{
				name: '红丝绒蛋糕'
				pic: 'images/cakes/red-velvet.jpg'
				price: '88.00'
			}
			{
				name: '黑森林蛋糕'
				pic: 'images/cakes/black-forest.jpg'
				price: '88.00'
			}
			{
				name: '棉花糖杯子蛋糕'
				pic: 'images/cakes/cotton-candy-cup.jpg'
				price: '68.00'
			}
			{
				name: '蔓越莓香草杯子蛋糕'
				pic: 'images/cakes/cranberry-cup.jpg'
				price: '88.00'
			}
			{
				name: '柠檬蛋白派'
				pic: 'images/cakes/lemon-pie.jpg'
				price: '88.00'
			}
			{
				name: '烤布蕾'
				pic: 'images/cakes/baked-pudding.jpg'
				price: '98.00'
			}
			{
				name: '香蕉巧克力杯子蛋糕'
				pic: 'images/cakes/banana-chocolate-cup.jpg'
				price: '88.00'
			}
			{
				name: '清甜蜜瓜派'
				pic: 'images/cakes/melon-pie.jpg'
				price: '88.00'
			}
		]
		getData: ->
			@_data
		getRowData: (row, length)->
			@_data.slice length*(row-1), length*row
		getLength: ->
			@_data.length
		getItem: (index)->
			@_data[index]
	module.exports = CakesData