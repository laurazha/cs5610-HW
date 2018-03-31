import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  widgetId: string;
  widget: Widget;
  userId: string;
  websiteId: string;
  pageId: string;
  baseUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private widgetService: WidgetService) {
    this.widget = new Widget('', '', '',
      1, '', '', '', '', false);
  }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.route.params.subscribe(params => {
      this.widgetId = params['wgid'];
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        },
        (error: any) => console.log(error)
      );
    });
  }

  updateWidget() {
    this.widgetService.updateWidgetInServer(this.widgetId, this.widget).subscribe(
      (widget: Widget) => {
        this.widget = widget;
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error: any) => console.log(error)
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidgetInServer(this.widgetId).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error: any) => console.log(error)
    );
  }
}
