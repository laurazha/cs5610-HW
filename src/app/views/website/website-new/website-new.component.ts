import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('w') webForm: NgForm;
  websiteName: string;
  websiteDescription: string;
  websites: Website[];
  user: User;

  constructor(private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.route.params.subscribe(params => {
      this.websiteService.findWebsitesByUser(this.user._id).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        },
        (error: any) => console.log(error)
      );
    });
  }

  createWebsite() {
    this.websiteName = this.webForm.value.websiteName;
    this.websiteDescription = this.webForm.value.websiteDescription;
    const website = new Website('', this.websiteName, this.user._id, this.websiteDescription);
    this.websiteService.createWebsite(this.user._id, website).subscribe(
      (data: any) => {
        this.router.navigate(['/profile/website']);
      },
      (error: any) => console.log(error)
    );
  }

}
