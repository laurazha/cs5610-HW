import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  pageId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageId = params['pid'];
    });
  }

  createWidget(type: string) {
    let widget = new Widget(null, type, this.pageId,
      null, null, null, null, null, null, null);
    this.widgetService.createWidget(this.pageId, widget).subscribe(
      (data: Widget) => {
        widget = data;
        this.router.navigate(['../', widget._id], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }

}
