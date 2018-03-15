export class Widget {
  _id: string;
  widgetType: string;
  pageId: string;
  size: number;
  text: string;
  width: string;
  url: string;
  placeholder: string;
  formatted: boolean;

  constructor(id: string,
              widgetType: string,
              pageId: string,
              size: number,
              text: string,
              width: string,
              url: string,
              placeholder: string,
              formatted: boolean) {
    this._id = id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
    this.placeholder = placeholder;
    this.formatted = formatted;
  }
}
