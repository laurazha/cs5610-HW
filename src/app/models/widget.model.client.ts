export class Widget {
  _id: string;
  type: string;
  pageId: string;
  size: number;
  text: string;
  width: string;
  url: string;
  placeholder: string;
  formatted: boolean;
  position: number;

  constructor(id: string,
              type: string,
              pageId: string,
              size: number,
              text: string,
              width: string,
              url: string,
              placeholder: string,
              formatted: boolean,
              position: number) {
    this._id = id;
    this.type = type;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
    this.placeholder = placeholder;
    this.formatted = formatted;
    this.position = position;
  }
}
