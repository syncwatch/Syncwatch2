import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class WatchSocket extends Socket {
  constructor() {
    super({ url: '/watch', options: {} });
  }
}
