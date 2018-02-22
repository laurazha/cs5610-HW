import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  websiteId: string;
  developerId: string;
  pages: Page[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.developerId = params['userId'];
      this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
    });
  }

}
