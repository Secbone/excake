(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var HamburgerView, StateModifier, Surface, Timer, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    Timer = require('famous/utilities/Timer');
    return HamburgerView = (function(_super) {
      __extends(HamburgerView, _super);

      HamburgerView.prototype.defaults = {
        width: 30,
        height: 30,
        lineSize: [30, 7],
        lineStyle: {
          backgroundColor: 'white'
        },
        transition: {
          duration: 200,
          curve: 'linear'
        }
      };

      function HamburgerView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createLines();
        this._setListeners();
      }

      HamburgerView.prototype._createLines = function() {
        var i, lineSurfaces, modifier, surface, _i;
        lineSurfaces = [];
        this.lineModifiers = [];
        for (i = _i = 0; _i <= 2; i = ++_i) {
          surface = new Surface({
            size: this.options.lineSize,
            properties: this.options.lineStyle
          });
          modifier = new StateModifier({
            align: [0.5, 0.5 * i],
            origin: [0.5, 0.5 * i]
          });
          this.add(modifier).add(surface);
          lineSurfaces.push(surface);
          this.lineModifiers.push(modifier);
        }
        this.eventSurface = new Surface();
        return this.add(this.eventSurface);
      };

      HamburgerView.prototype._setListeners = function() {
        return this.subscribe(this.eventSurface);
      };

      HamburgerView.prototype.setOpenStatus = function() {
        var i, item, _i, _len, _ref, _results;
        _ref = this.lineModifiers;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          item = _ref[i];
          item.setAlign([0.5, 0.5], this.options.transition);
          item.setOrigin([0.5, 0.5], this.options.transition);
          _results.push(Timer.setTimeout((function(i, item) {
            if (i === 1) {
              return item.setTransform(Transform.rotateZ(Math.PI / 4), this.options.transition);
            } else {
              return item.setTransform(Transform.rotateZ(-Math.PI / 4), this.options.transition);
            }
          }).bind(this, i, item), this.options.transition.duration));
        }
        return _results;
      };

      HamburgerView.prototype.setCloseStatus = function() {
        var i, item, _i, _len, _ref, _results;
        _ref = this.lineModifiers;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          item = _ref[i];
          item.setTransform(Transform.rotateZ(0), this.options.transition);
          _results.push(Timer.setTimeout((function(i, item) {
            item.setAlign([0.5, 0.5 * i], this.options.transition);
            return item.setOrigin([0.5, 0.5 * i], this.options.transition);
          }).bind(this, i, item), this.options.transition.duration));
        }
        return _results;
      };

      module.exports = HamburgerView;

      return HamburgerView;

    })(View);
  });

}).call(this);
