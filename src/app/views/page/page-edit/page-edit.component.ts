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
  errorFlag = false;
  errorMsg = 'Page name cannot be empty!';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService) {
    this.page = new Page('', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageId = params['pid'];
      this.pageService.findPageById(this.pageId).subscribe(
        (page: Page) => {
          this.page = page;
        },
        (error: any) => console.log(error)
      );
    });
  }

  updatePage() {
    if (!this.page.name) {
      this.errorFlag = true;
      return;
    }
    this.pageService.updatePage(this.pageId, this.page).subscribe(
      (page: Page) => {
        this.page = page;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe(
      () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }
}
