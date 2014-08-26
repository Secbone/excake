(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var MenuView, StateModifier, StripView, Surface, Timer, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    Timer = require('famous/utilities/Timer');
    StripView = require('views/StripView');
    MenuView = (function(_super) {
      __extends(MenuView, _super);

      MenuView.prototype.defaults = {
        stripData: {},
        angle: -0.2,
        stripWidth: 320,
        stripHeight: 54,
        topOffset: 37,
        stripOffset: 58,
        staggerDelay: 35,
        transition: {
          deration: 400,
          curve: 'easeOut'
        }
      };

      function MenuView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createBackground();
        this._createStripViews();
      }

      MenuView.prototype.resetStrips = function() {
        var i, initX, initY, item, _i, _len, _ref, _results;
        _ref = this.stripModifiers;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          item = _ref[i];
          initX = -this.options.stripWidth;
          initY = this.options.topOffset + this.options.stripOffset * i + this.options.stripWidth * Math.tan(-this.options.angle);
          _results.push(item.setTransform(Transform.translate(initX, initY, 0)));
        }
        return _results;
      };

      MenuView.prototype.animateStrips = function() {
        var delay, i, item, stripOffset, topOffset, transition, _i, _len, _ref, _results;
        this.resetStrips();
        transition = this.options.transition;
        delay = this.options.staggerDelay;
        stripOffset = this.options.stripOffset;
        topOffset = this.options.topOffset;
        _ref = this.stripModifiers;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          item = _ref[i];
          _results.push(Timer.setTimeout(((function(_this) {
            return function(i, item) {
              var yOffset;
              yOffset = topOffset + stripOffset * i;
              return item.setTransform(Transform.translate(0, yOffset, 0), transition);
            };
          })(this)).bind(this, i, item), i * delay));
        }
        return _results;
      };

      MenuView.prototype._createBackground = function() {
        var backgroundSurface;
        backgroundSurface = new Surface({
          size: [320, void 0],
          properties: {
            backgroundColor: 'gray',
            boxShadow: '0 0 1px rgba(0,0,0,1)'
          }
        });
        return this.add(backgroundSurface);
      };

      MenuView.prototype._createStripViews = function() {
        var item, stripModifier, stripView, yOffset, _i, _len, _ref, _results;
        this.stripModifiers = [];
        yOffset = this.options.topOffset;
        _ref = this.options.stripData;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          stripView = new StripView({
            title: item.title
          });
          stripModifier = new StateModifier({
            transform: Transform.translate(0, yOffset, 0)
          });
          this.stripModifiers.push(stripModifier);
          this.add(stripModifier).add(stripView);
          _results.push(yOffset += this.options.stripOffset);
        }
        return _results;
      };

      return MenuView;

    })(View);
    return module.exports = MenuView;
  });

}).call(this);
