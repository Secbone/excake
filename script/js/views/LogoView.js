(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var ImageSurface, Logoview, StateModifier, Surface, Timer, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    ImageSurface = require('famous/surfaces/ImageSurface');
    Timer = require('famous/utilities/Timer');
    return Logoview = (function(_super) {
      __extends(Logoview, _super);

      Logoview.prototype.defaults = {
        size: [100, 100]
      };

      function Logoview() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createLogo();
      }

      Logoview.prototype._createLogo = function() {
        var logoModifier, logoSurface;
        logoSurface = new ImageSurface({
          size: this.options.size,
          content: 'images/logo.jpg',
          properties: {
            border: '5px solid white',
            zIndex: 3,
            borderRadius: '50%'
          }
        });
        logoModifier = new StateModifier({
          align: [0.5, 1],
          origin: [0.5, 0.5]
        });
        return this.add(logoModifier).add(logoSurface);
      };

      return Logoview;

    })(View);
  });

}).call(this);