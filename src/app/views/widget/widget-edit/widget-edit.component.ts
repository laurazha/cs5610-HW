import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  widgetId: string;
  widget: Widget;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.widgetId = params['wgid'];
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    });
  }

  updateWidget() {
    this.widget = this.widgetService.updateWidget(this.widgetId, this.widget);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
