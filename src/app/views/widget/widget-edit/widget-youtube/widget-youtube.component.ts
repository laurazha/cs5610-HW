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
  errorFlag = false;
  errorMsg = 'Widget name cannot be empty!';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private widgetService: WidgetService) {
    this.widget = new Widget('', '', '',
      1, '', '', '', '', false, null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        },
        (error: any) => console.log(error)
      );
    });
  }

  updateWidget() {
    if (!this.widget.name) {
      this.errorFlag = true;
      return;
    }
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
