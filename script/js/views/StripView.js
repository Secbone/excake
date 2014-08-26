(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var StateModifier, StripView, Surface, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    StripView = (function(_super) {
      __extends(StripView, _super);

      StripView.prototype.defaults = {
        width: 320,
        height: 55,
        angle: -0.2,
        title: 'title',
        fontSize: 26
      };

      function StripView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createBackground();
        this._createTitle();
      }

      StripView.prototype._createBackground = function() {
        var backgroundSurface, rotateModifier, skewModifier;
        backgroundSurface = new Surface({
          size: [this.options.width, this.options.height],
          properties: {
            backgroundColor: 'black',
            boxShadow: '0 0 1px rgba(0,0,0,1)'
          }
        });
        rotateModifier = new StateModifier({
          transform: Transform.rotateZ(this.options.angle)
        });
        skewModifier = new StateModifier({
          transform: Transform.skew(0, 0, this.options.angle)
        });
        return this.add(rotateModifier).add(skewModifier).add(backgroundSurface);
      };

      StripView.prototype._createTitle = function() {
        var titleModifier, titleSurface;
        titleSurface = new Surface({
          size: [true, true],
          content: this.options.title,
          properties: {
            color: 'white',
            fontSize: this.options.fontSize,
            textTransform: 'uppercase',
            pointerEvents: 'none'
          }
        });
        titleModifier = new StateModifier({
          transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -5, 0])
        });
        return this.add(titleModifier).add(titleSurface);
      };

      return StripView;

    })(View);
    return module.exports = StripView;
  });

}).call(this);
