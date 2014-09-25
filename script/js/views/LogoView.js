(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var ContainerSurface, Easing, ImageSurface, Logoview, StateModifier, Surface, Timer, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    ImageSurface = require('famous/surfaces/ImageSurface');
    ContainerSurface = require('famous/surfaces/ContainerSurface');
    Easing = require('famous/transitions/Easing');
    Timer = require('famous/utilities/Timer');
    return Logoview = (function(_super) {
      __extends(Logoview, _super);

      Logoview.prototype.defaults = {
        width: 100,
        height: 100,
        color: 0,
        borderWidth: 4,
        transition: {
          duration: 500,
          curve: Easing.outBack
        }
      };

      function Logoview() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createLogo();
      }

      Logoview.prototype._createLogo = function() {
        var borderModifier, borderSurface, logoModifier, logoSurface;
        logoSurface = new Surface({
          size: [this.options.width + 10, this.options.height + 10],
          content: '<img style="overflow:hidden" width=' + this.options.width + ' height=' + this.options.height + 'px src="images/logo.jpg" />',
          properties: {
            overflow: 'hidden',
            border: '5px solid white',
            zIndex: 3,
            borderRadius: '50%'
          }
        });
        borderSurface = new Surface({
          size: [this.options.width + 10 + this.options.borderWidth * 2, this.options.height + 10 + this.options.borderWidth * 2],
          properties: {
            backgroundColor: "hsl(" + this.options.color + ", 100%, 50%)",
            borderRadius: "50%",
            zIndex: 2
          }
        });
        borderModifier = new StateModifier({
          align: [0.5, 1],
          origin: [0.5, 0.5]
        });
        logoModifier = new StateModifier({
          align: [0.5, 1],
          origin: [0.5, 0.5],
          transform: Transform.scale(0, 0, 1)
        });
        this.add(borderModifier).add(borderSurface);
        this.add(logoModifier).add(logoSurface);
        return logoModifier.setTransform(Transform.scale(1, 1, 1), this.options.transition, (function(_this) {
          return function() {
            logoModifier.setAlign([0.5, 0.7], _this.options.transition);
            return borderModifier.setAlign([0.5, 0.7], _this.options.transition);
          };
        })(this));
      };

      return Logoview;

    })(View);
  });

}).call(this);
