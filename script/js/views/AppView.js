(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var AppView, Easing, GenericSync, MenuView, Modifier, MouseSync, PageView, StateModifier, StripData, Surface, TouchSync, Transform, Transitionable, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    Modifier = require('famous/core/Modifier');
    Easing = require('famous/transitions/Easing');
    PageView = require('views/PageView');
    MenuView = require('views/MenuView');
    StripData = require('data/StripData');
    GenericSync = require('famous/inputs/GenericSync');
    MouseSync = require('famous/inputs/MouseSync');
    TouchSync = require('famous/inputs/TouchSync');
    Transitionable = require('famous/transitions/Transitionable');
    GenericSync.register({
      'mouse': MouseSync,
      'touch': TouchSync
    });
    AppView = (function(_super) {
      __extends(AppView, _super);

      AppView.prototype.defaults = {
        openPosition: 200,
        posThreshold: 100,
        velThreshold: 0.5,
        transition: {
          duration: 300,
          curve: Easing.outBack
        }
      };

      function AppView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this.menuToggle = false;
        this.pageViewPos = new Transitionable(0);
        this._createMenuView();
        this._createPageView();
        this._setListeners();
        this._handleSwipe();
      }

      AppView.prototype._createPageView = function() {
        this.pageView = new PageView();
        this.pageModifier = new Modifier({
          transform: (function(_this) {
            return function() {
              return Transform.translate(_this.pageViewPos.get(), 0, 0);
            };
          })(this)
        });
        return this.add(this.pageModifier).add(this.pageView);
      };

      AppView.prototype._createMenuView = function() {
        this.menuView = new MenuView({
          stripData: StripData
        });
        this.menuModifier = new StateModifier({
          transform: Transform.behind
        });
        return this.add(this.menuModifier).add(this.menuView);
      };

      AppView.prototype._setListeners = function() {
        return this.pageView.on('menuToggle', this.toggleMenu.bind(this));
      };

      AppView.prototype._handleSwipe = function() {
        var sync;
        sync = new GenericSync(['mouse', 'touch'], {
          direction: GenericSync.DIRECTION_X
        });
        this.pageView.pipe(sync);
        sync.on('update', (function(_this) {
          return function(data) {
            var currentPosition;
            currentPosition = _this.pageViewPos.get();
            if (currentPosition === 0 && data.velocity > 0) {
              _this.menuView.animateStrips();
            }
            return _this.pageViewPos.set(Math.min(_this.options.openPosition, Math.max(0, currentPosition + data.delta)));
          };
        })(this));
        return sync.on('end', (function(_this) {
          return function(data) {
            var position, velocity;
            velocity = data.velocity;
            position = _this.pageViewPos.get();
            if (position > _this.options.posThreshold) {
              if (velocity < -_this.options.velThreshold) {
                return _this.slideLeft();
              } else {
                return _this.slideRight();
              }
            } else {
              if (velocity > _this.options.velThreshold) {
                return _this.slideRight();
              } else {
                return _this.slideLeft();
              }
            }
          };
        })(this));
      };

      AppView.prototype.toggleMenu = function() {
        if (this.menuToggle) {
          this.slideLeft();
        } else {
          this.slideRight();
          this.menuView.animateStrips();
        }
        return this.menuToggle = !this.menuToggle;
      };

      AppView.prototype.slideRight = function() {
        this.pageViewPos.set(this.options.openPosition, this.options.transition, (function(_this) {
          return function() {
            return _this.menuToggle = true;
          };
        })(this));
        return this.pageView._eventOutput.emit('slideRight');
      };

      AppView.prototype.slideLeft = function() {
        this.pageViewPos.set(0, this.options.transition, (function(_this) {
          return function() {
            return _this.menuToggle = false;
          };
        })(this));
        return this.pageView._eventOutput.emit('slideLeft');
      };

      return AppView;

    })(View);
    return module.exports = AppView;
  });

}).call(this);
