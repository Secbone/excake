(function() {
  define(function(require, exports, module) {
    var Engine, HeaderFooterLayout, Surface, layout, mainContext;
    Engine = require('famous/core/Engine');
    Surface = require('famous/core/Surface');
    HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    mainContext = Engine.createContext();
    layout = new HeaderFooterLayout({
      headerSize: 100,
      footerSize: 50
    });
    layout.header.add(new Surface({
      content: 'header',
      classes: ['red-bg'],
      properties: {
        lineHeight: '100px',
        textAlign: 'center'
      }
    }));
    layout.content.add(new Surface({
      content: 'content',
      classes: ['grey-bg'],
      properties: {
        lineHeight: '400px',
        textAlign: 'center',
        backgroundColor: 'white'
      }
    }));
    layout.footer.add(new Surface({
      content: 'footer',
      classes: ['red-bg'],
      properties: {
        lineHeight: '50px',
        textAlign: 'center'
      }
    }));
    return mainContext.add(layout);
  });

}).call(this);
