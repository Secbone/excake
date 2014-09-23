(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require, exports, module) {
    var Engine, GenericSync, MouseSync, ScrollView, ScrollViewExtension;
    Engine = require('famous/core/Engine');
    ScrollView = require('famous/views/Scrollview');
    GenericSync = require('famous/inputs/GenericSync');
    MouseSync = require('famous/inputs/MouseSync');
    GenericSync.register({
      mouse: MouseSync
    });
    ScrollViewExtension = (function(_super) {
      __extends(ScrollViewExtension, _super);

      ScrollViewExtension.prototype.defaults = {};

      function ScrollViewExtension() {
        ScrollView.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this.displayed = {};
        this.sync = new GenericSync(['mouse', 'touch', 'scroll'], {
          direction: GenericSync.DIRECTION_Y
        });
        this._eventInput.pipe(this.sync);
        this.sync.pipe(this._eventInput);
        this._monitorOffsets();
      }

      ScrollViewExtension.prototype._monitorOffsets = function() {
        return Engine.on('prerender', (function(_this) {
          return function() {
            var i, newDisplay, node, row, _i, _j, _len, _ref, _ref1, _ref2;
            newDisplay = {};
            node = _this._node.getPrevious() || _this._node;
            for (i = _i = _ref = node.index, _ref1 = node.index + 7; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
              newDisplay[i] = true;
              if (!_this.displayed[i] && node._.array[i]) {
                node._.array[i].rowView.animateIn();
              }
            }
            _ref2 = _this.displayed;
            for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
              row = _ref2[_j];
              if (!(__indexOf.call(newDisplay, row) >= 0) && node._.array[row]) {
                node._.array[row].rowView.reset();
              }
            }
            return _this.displayed = newDisplay;
          };
        })(this));
      };

      return ScrollViewExtension;

    })(ScrollView);
    return module.exports = ScrollViewExtension;
  });

}).call(this);
