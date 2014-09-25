(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var ContainerView, FastClick, HamburgerView, HeaderFooter, LogoView, PageView, StateModifier, Surface, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    StateModifier = require('famous/modifiers/StateModifier');
    HeaderFooter = require('famous/views/HeaderFooterLayout');
    FastClick = require('famous/inputs/FastClick');
    HamburgerView = require('views/HamburgerView');
    LogoView = require('views/LogoView');
    ContainerView = require('views/ContainerView');
    PageView = (function(_super) {
      __extends(PageView, _super);

      PageView.prototype.defaults = {
        headerSize: 100
      };

      function PageView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createLayout();
        this._createHeader();
        this._createBody();
        this._setListeners();
      }

      PageView.prototype._createLayout = function() {
        var layoutModifier;
        this.layout = new HeaderFooter({
          headerSize: this.options.headerSize
        });
        layoutModifier = new StateModifier({
          transform: Transform.translate(0, 0, 0.1)
        });
        return this.add(layoutModifier).add(this.layout);
      };

      PageView.prototype._createHeader = function() {
        var backgroundModifier, backgroundSurface, hamburgerModifier;
        this.color = Math.random() * 360;
        backgroundSurface = new Surface({
          size: [void 0, this.options.headerSize],
          properties: {
            backgroundColor: "hsl(" + this.color + ", 100%, 50%)"
          }
        });
        backgroundModifier = new StateModifier({
          transform: Transform.behind
        });
        this.hamburgerView = new HamburgerView();
        hamburgerModifier = new StateModifier({
          size: [30, 30],
          align: [0, 0.5],
          origin: [-0.5, 0.5]
        });
        this.logoView = new LogoView({
          color: this.color
        });
        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerView);
        return this.layout.header.add(this.logoView);
      };

      PageView.prototype._createBody = function() {
        this.bodySurface = new Surface({
          size: [void 0, void 0],
          properties: {
            backgroundColor: 'white'
          }
        });
        this.containerView = new ContainerView();
        this.layout.content.add(this.bodySurface);
        return this.layout.content.add(this.containerView);
      };

      PageView.prototype._setListeners = function() {
        this.hamburgerView._eventInput.on('click', (function(_this) {
          return function() {
            return _this._eventOutput.emit('menuToggle');
          };
        })(this));
        this.on('slideRight', (function(_this) {
          return function() {
            return _this.hamburgerView.setOpenStatus();
          };
        })(this));
        this.on('slideLeft', (function(_this) {
          return function() {
            return _this.hamburgerView.setCloseStatus();
          };
        })(this));
        return this.bodySurface.pipe(this._eventOutput);
      };

      return PageView;

    })(View);
    return module.exports = PageView;
  });

}).call(this);
