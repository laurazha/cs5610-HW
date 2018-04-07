import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  websiteId: string;
  website: Website;
  websites: Website[];
  errorFlag = false;
  errorMsg = 'Website name cannot be empty!';

  constructor(private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) {
    this.website = new Website('', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.websiteService.findWebsiteById(this.websiteId).subscribe(
        (website: Website) => {
          this.website = website;
        },
        (error: any) => console.log(error)
      );
      this.websiteService.findWebsitesByUser(this.sharedService.user._id).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        },
        (error: any) => console.log(error)
      );
    });
  }

  updateWebsite() {
    if (!this.website.name) {
      this.errorFlag = true;
      return;
    }
    this.websiteService.updateWebsiteInServer(this.websiteId, this.website).subscribe(
      (website: Website) => {
        this.website = website;
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error: any) => console.log(error)
    );
  }

  deleteWebsite() {
    this.websiteService.deleteWebsiteInServer(this.websiteId).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error: any) => console.log(error)
    );
  }
}
