import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  websiteId: string;
  website: Website;
  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.website = this.websiteService.findWebsitesById(this.websiteId);
      this.websites = this.websiteService.findWebsitesByUser(this.website.developerId);
    });
  }

  updateWebsite() {
    this.website = this.websiteService.updateWebsite(this.websiteId, this.website);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
