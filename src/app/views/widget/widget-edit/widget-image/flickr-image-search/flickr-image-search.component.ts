import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  searchText: string;
  photos: [any];
  widgetId: string;
  widget: Widget;
  errorFlag = false;
  errorMsg = 'Search text cannot be empty!';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flickrService: FlickrService,
              private widgetService: WidgetService) {
    this.widget = new Widget('', '', '',
      1, '', '', '', '', false, null);
    this.photos = [null];
  }

  searchPhotos() {
    if (!this.searchText) {
      this.errorFlag = true;
      return;
    }
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    this.widget.url = url;
    this.widgetService
      .updateWidgetInServer(this.widgetId, this.widget)
      .subscribe(
        (data: Widget) => {
          this.widget = data;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error: any) => console.log(error)
      );
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

}
