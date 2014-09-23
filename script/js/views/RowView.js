(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var Modifier, RowView, SequentialLayout, Surface, Transform, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Transform = require('famous/core/Transform');
    Modifier = require('famous/core/Modifier');
    SequentialLayout = require('famous/views/SequentialLayout');
    RowView = (function(_super) {
      __extends(RowView, _super);

      RowView.prototype.defaults = {
        size: [void 0, 100]
      };

      function RowView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createContent();
        this.sequentialLayout.rowView = this;
      }

      RowView.prototype._createContent = function() {
        var contentSurface, view, views;
        views = [];
        this.sequentialLayout = new SequentialLayout({
          direction: 0
        });
        contentSurface = new Surface({
          size: this.options.size,
          properties: {
            backgroundColor: "hsl(" + Math.random() * 360 + ", 100%, 50%)"
          }
        });
        view = new View();
        view.add(contentSurface);
        views.push(view);
        return this.sequentialLayout.sequenceFrom(views);
      };

      RowView.prototype.animateIn = function() {};

      return RowView;

    })(View);
    return module.exports = RowView;
  });

}).call(this);
