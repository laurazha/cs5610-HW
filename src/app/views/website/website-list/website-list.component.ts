import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  developerId: string;
  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.developerId = params['userId'];
      this.websites = this.websiteService.findWebsitesByUser(this.developerId);
    });
  }

}
