import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';

@Injectable()
export class PageService {
  pages: Page[] = [
    new Page('321', 'Post 1', '234', 'page desc'),
    new Page('432', 'Post 2', '234', 'page desc'),
    new Page('543', 'Post 1', '345', 'page desc'),
    new Page('654', 'Post 1', '456', 'page desc'),
    new Page('765', 'Post 2', '456', 'page desc'),
    new Page('876', 'Post 3', '456', 'page desc')
  ];

  createPage(websiteId: String, page: Page) {
    const new_page = {
      _id: (new Date()).getTime() + '',
      name: page.name,
      websiteId: websiteId,
      description: page.description
    };

    this.pages.push(new_page);
    return new_page;
  }

  findPageByWebsiteId(websiteId: String) {
    return this.pages.filter(function(page) {
      return page.websiteId === websiteId;
    });
  }

  findPageById(pageId: String) {
    return this.pages.find(function(page) {
      return page._id === pageId;
    });
  }

  updatePage(pageId: String, page: Page) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        this.pages[i].name = page.name;
        this.pages[i].websiteId = page.websiteId;
        this.pages[i].description = page.description;
        return this.pages[i];
      }
    }
  }

  deletePage(pageId: String) {
    this.pages.splice(this.pages.findIndex(function(page) {
      return page._id === pageId;
    }), 1);
  }
}
