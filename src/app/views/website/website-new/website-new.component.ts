import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('w') webForm: NgForm;
  developerId: string;
  websiteName: string;
  websiteDescription: string;
  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.developerId = params['userId'];
      this.websites = this.websiteService.findWebsitesByUser(this.developerId);
    });
  }

  createWebsite() {
    this.websiteName = this.webForm.value.websiteName;
    this.websiteDescription = this.webForm.value.websiteDescription;
    let website = new Website('', this.websiteName, this.developerId, this.websiteDescription);
    website = this.websiteService.createWebsite(this.developerId, website);
    if (website) {
      this.router.navigate(['/profile', this.developerId, 'website']);
    }
  }

}
