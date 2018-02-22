import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class WidgetService {
  widgets: Widget[] = [
    WidgetService.newHeader('123', 'HEADING', '321', 2, 'Super Bowl 2018'),
    WidgetService.newHeader('234', 'HEADING', '321', 4, 'GIZMODE'),
    WidgetService.newImage('345', 'IMAGE', '321', '100%',
      'https://goo.gl/VZeQUf'),
    WidgetService.newHtml('456', 'HTML', '321', 'Lorem ipsum'),
    WidgetService.newHeader('567', 'HEADING', '321', 4, 'GIZMODE'),
    WidgetService.newYoutube('678', 'YOUTUBE', '321', '100%',
      'https://www.youtube.com/embed/qW1xbhW2PEE'),
    WidgetService.newHtml('789', 'HTML', '321', 'Lorem ipsum')
  ];

  static newHeader(id: string, widgetType: string, pageId: string, size: number, text: string) {
    return new Widget(id, widgetType, pageId, size, text, null, null);
  }

  static newHtml(id: string, widgetType: string, pageId: string, text: string) {
    return new Widget(id, widgetType, pageId, null, text, null, null);
  }

  static newImage(id: string, widgetType: string, pageId: string, width: string, url: string) {
    return new Widget(id, widgetType, pageId, null, null, width, url);
  }

  static newYoutube(id: string, widgetType: string, pageId: string, width: string, url: string) {
    return new Widget(id, widgetType, pageId, null, null, width, url);
  }

  createWidget(pageId: string, widget: Widget) {
    this.widgets.push(widget);
    return widget;
  }

  findWidgetsByPageId(pageId: string) {
    return this.widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
  }

  findWidgetById(widgetId: string) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId: string, widget: Widget) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        this.widgets[i].widgetType = widget.widgetType;
        this.widgets[i].pageId = widget.pageId;
        this.widgets[i].size = widget.size;
        this.widgets[i].text = widget.text;
        this.widgets[i].width = widget.width;
        this.widgets[i].url = widget.url;
        return this.widgets[i];
      }
    }
  }

  deleteWidget(widgetId) {
    this.widgets.splice(this.widgets.findIndex(function (widget) {
      return widget._id === widgetId;
    }), 1);
  }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
