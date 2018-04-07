import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class WidgetService {

  constructor(private _http: Http) {}
  baseUrl = environment.baseUrl;

  createWidget(pageId: string, widget: Widget) {
    return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetsByPageId(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetById(widgetId: string) {
    return this._http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWidgetInServer(widgetId: string, widget: Widget) {
    return this._http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWidgetInServer(widgetId: string) {
    return this._http.delete(this.baseUrl + '/api/widget/' + widgetId)
      .map((response: Response) => {
        return response.json();
      });
  }

  reorderWidgetsInServer(pageId: string, indexes) {
    return this._http.put(this.baseUrl + '/api/page/' + pageId +
      '/widget?initial=' + indexes.startIndex + '&final=' + indexes.endIndex, '')
      .map((response: Response) => {
        return response.json();
    });
  }
}
