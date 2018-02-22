import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  pageId: string;
  page: Page;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageId = params['pid'];
      this.page = this.pageService.findPageById(this.pageId);
    });
  }

  updatePage() {
    this.page = this.pageService.updatePage(this.pageId, this.page);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
