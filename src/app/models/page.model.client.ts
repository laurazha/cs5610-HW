export class Page {
  _id: String;
  name: String;
  websiteId: String;
  description: String;

  constructor(id: String, name: String, websiteId: String, description: String) {
    this._id = id;
    this.name = name;
    this.websiteId = websiteId;
    this.description = description;
  }
}
