import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  pages: Page[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageService.findPageByWebsiteId(params['wid']).subscribe(
        (pages: Page[]) => {
          this.pages = pages;
        },
        (error: any) => console.log(error)
      );
    });
  }

}
