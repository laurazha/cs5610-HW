import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  widgets: Widget[];
  pageId: string;

  constructor(
    private route: ActivatedRoute,
    private widgetService: WidgetService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageId = params['pid'];
      this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
        },
        (error: any) => console.log(error)
      );
    });
  }

  reorderWidgets(indexes) {
    this.widgetService.reorderWidgetsInServer(this.pageId, indexes).subscribe(
      () => {},
      (error: any) => console.log(error)
    );
  }
}
