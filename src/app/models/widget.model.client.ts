export class Widget {
  _id: string;
  widgetType: string;
  pageId: string;
  size: number;
  text: string;
  width: string;
  url: string;

  constructor(id: string,
              widgetType: string,
              pageId: string,
              size: number,
              text: string,
              width: string,
              url: string) {
    this._id = id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
  }
}
