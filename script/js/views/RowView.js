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
        size: [void 0, 100],
        space: 10,
        images: []
      };

      function RowView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createContent();
        this.sequentialLayout.rowView = this;
      }

      RowView.prototype._createContent = function() {
        var Xoffset, Yoffset, i, item, modifier, surface, view, views, _i, _len, _ref;
        views = [];
        this.sequentialLayout = new SequentialLayout({
          itemSpacing: 0,
          direction: 0
        });
        this.modifiers = [];
        console.log(this.options.row);
        _ref = this.options.images;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          item = _ref[i];
          surface = new Surface({
            size: this.options.size,
            content: "<img width=" + this.options.size[0] + "px height=" + this.options.size[1] + "px src=" + item.pic + " />"
          });
          Xoffset = this.options.space * (i + 1);
          Yoffset = this.options.space * this.options.row;
          modifier = new Modifier({
            transform: Transform.translate(Xoffset, Yoffset, 0),
            opacity: 1
          });
          modifier.offset = Xoffset;
          this.modifiers.push(modifier);
          view = new View({
            size: this.options.size
          });
          view._add(modifier).add(surface);
          views.push(view);
        }

        /*
        			contentSurface = new Surface
        				size: @options.size
        				properties: 
        					backgroundColor: "hsl("+Math.random()*360+", 100%, 50%)"
        			view = new View()
        			view.add contentSurface
        			views.push view
         */
        return this.sequentialLayout.sequenceFrom(views);
      };

      RowView.prototype.animateIn = function() {};

      return RowView;

    })(View);
    return module.exports = RowView;
  });

}).call(this);
