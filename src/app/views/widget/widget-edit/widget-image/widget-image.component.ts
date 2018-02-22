import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
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
