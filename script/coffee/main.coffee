define (require, exports, module)->
	Engine = require 'famous/core/Engine'
	AppView = require 'views/AppView'

	mainContext = Engine.createContext()
	appView = new AppView()
	#surface = new Surface({content: 'hello'})
	
	mainContext.add appView