var mongoose = require("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("Widget", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return WidgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId})
    .sort({position: 1}).exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return WidgetModel.findByIdAndUpdate(widgetId, widget);
}

function deleteWidget(widgetId) {
  return WidgetModel.remove({_id: widgetId});
}

function reassignPosition(pageId) {
  var n = 0;
  return findAllWidgetsForPage(pageId).then(
    function (widgets) {
      widgets.forEach(function (widget) {
        widget.position = n++;
        widget.save();
      });
    }
  )
}

function reorderWidget(pageId, start, end) {
  return WidgetModel.find({_page: pageId}, function (err, widgets) {
    widgets.forEach(function (widget) {
      if (start < end) {
        if (widget.position === start) {
          widget.position = end;
          widget.save();
        } else if (widget.position > start
          && widget.position <= end) {
          widget.position--;
          widget.save();
        }
      } else {
        if (widget.position === start) {
          widget.position = end;
          widget.save();
        } else if (widget.position < start
          && widget.position >= end) {
          widget.position++;
          widget.save();
        }
      }
    });
  });

}

