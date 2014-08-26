(function() {
  define(function(require, exports, module) {
    var AppView, Engine, appView, mainContext;
    Engine = require('famous/core/Engine');
    AppView = require('views/AppView');
    mainContext = Engine.createContext();
    appView = new AppView();
    return mainContext.add(appView);
  });

}).call(this);
