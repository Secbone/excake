(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var CakesData, ContainerSurface, ContainerView, GenericSync, Modifier, RowView, ScrollView, ScrollViewExtension, SequentialLayout, Surface, Transform, Transitionable, View;
    View = require('famous/core/View');
    Surface = require('famous/core/Surface');
    Modifier = require('famous/core/Modifier');
    Transform = require('famous/core/Transform');
    ScrollView = require('famous/views/Scrollview');
    SequentialLayout = require('famous/views/SequentialLayout');
    Transitionable = require('famous/transitions/Transitionable');
    GenericSync = require('famous/inputs/GenericSync');
    ContainerSurface = require('famous/surfaces/ContainerSurface');
    CakesData = require('data/CakesData');
    ScrollViewExtension = require('views/ScrollViewExtension');
    RowView = require('views/RowView');
    ContainerView = (function(_super) {
      __extends(ContainerView, _super);

      ContainerView.prototype.defaults = {
        height: void 0,
        width: void 0
      };

      function ContainerView() {
        View.apply(this, arguments);
        this.options = _.extend(this.defaults, this.options);
        this._createContent();
      }

      ContainerView.prototype._createContent = function() {
        var count, row, rowView, testView, views, _i;
        this.scrollView = new ScrollViewExtension({
          margin: 1000000
        });
        views = [];
        this.scrollView.sequenceFrom(views);
        this.rowViews = [];
        count = 0;
        for (row = _i = 0; _i < 13; row = ++_i) {
          rowView = new RowView({
            size: [0, 100],
            scrollView: this.scrollView,
            count: count,
            img: CakesData.getRowData(row)
          });
          this.rowViews.push(rowView);
          console.log(rowView.sequentialLayout);
          views.push(rowView.sequentialLayout);
          count += 3;
        }
        this.container = new ContainerSurface({
          classes: ['scrollContainer'],
          size: [this.options.width, this.options.height],
          properties: {
            overflow: 'hidden'
          }
        });
        this.container.add(this.scrollView);
        testView = new RowView();
        this.container.add(testView);
        return this._add(this.container);
      };

      ContainerView.prototype.render = function() {
        return this._node.render.apply(this._node, arguments);
      };

      return ContainerView;

    })(View);
    return module.exports = ContainerView;
  });

}).call(this);
