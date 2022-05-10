import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class WatchSocket extends Socket {
    constructor(private authService: AuthService) {
        super({ url: '/watch', options: { extraHeaders: {
            Authorization: authService.getSessionToken(),
        } } });
    }
}
