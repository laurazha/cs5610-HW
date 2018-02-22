import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';


@Injectable()
export class WebsiteService {

  websites: Website[] = [
    new Website('123', 'Facebook', '456', 'test' ),
    new Website('234', 'Gizmodo', '123', 'test' ),
    new Website('345', 'Chess', '123', 'test' ),
    new Website('456', 'Tic Tac Toe', '123', 'test' ),
    new Website('567', 'Twitter', '456', 'test' ),
    new Website('678', 'Amazon', '789', 'test' ),
    new Website('789', 'Go', '456', 'test' )
  ];

  createWebsite(userId: string, website: Website) {
    const new_website = {
      _id: (new Date()).getTime() + '',
      name: website.name,
      developerId: userId,
      description: website.description
    };

    this.websites.push(new_website);
    return new_website;
  }

  findWebsitesByUser(userId: string) {
    return this.websites.filter(function (website) {
      return website.developerId === userId;
    });
  }

  findWebsitesById(websiteId: string) {
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }

  updateWebsite(websiteId: string, website: Website) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i].name = website.name;
        this.websites[i].developerId = website.developerId;
        this.websites[i].description = website.description;
        return this.websites[i];
      }
    }
  }

  deleteWebsite(websiteId: string) {
    this.websites.splice(this.websites.findIndex(function(website) {
      return website._id === websiteId;
    }), 1);
  }
}
