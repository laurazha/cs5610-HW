import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  @ViewChild('p') pageForm: NgForm;
  pageDescription: string;
  pageName: string;
  websiteId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
    });
  }

  createPage() {
    this.pageName = this.pageForm.value.pageName;
    this.pageDescription = this.pageForm.value.pageDescription;
    const page = new Page('', this.pageName, this.websiteId, this.pageDescription);
    this.pageService.createPage(this.websiteId, page).subscribe(
      (data: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }

}
