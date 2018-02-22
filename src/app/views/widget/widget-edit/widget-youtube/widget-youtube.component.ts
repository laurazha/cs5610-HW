import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  widgetId: string;
  widget: Widget;

  constructor(
    private route: ActivatedRoute,
    private widgetService: WidgetService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.widgetId = params['wgid'];
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    });
  }
}
