export class Page {
  _id: String;
  name: String;
  websiteId: String;
  title: String;

  constructor(id: String, name: String, websiteId: String, title: String) {
    this._id = id;
    this.name = name;
    this.websiteId = websiteId;
    this.title = title;
  }
}
