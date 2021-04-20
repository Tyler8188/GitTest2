/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-19 17:26:19
 * @FilePath: \RomantoryApp\assets\Framework\Network\Sockets\ClientDealer.ts
 */

import { IClientMessage } from "../../Interfaces/Network/IClientMessage";
import { IReceiveHandler } from "../../Interfaces/Network/IReceiveHandler";
import { trace } from "../../Utility/dx/trace";

export class ClientDealer {
    public static ClassName: string = "ClientDealer";
    protected handlers: { [key: number]: IReceiveHandler } = {};

    public addHandler(key: number, handler: IReceiveHandler, isForce: boolean = false): void {
        if (isForce) this.handlers[key] = handler;
        else {
            if (this.handlers[key] == undefined) this.handlers[key] = handler;
            else trace("重复设置Handler====>0x", key.toString(16));
        }
    }

    public removeHandler(key: number): void {
        if (this.handlers[key] != undefined)
            delete this.handlers[key];
    }

    public getKey(msg: IClientMessage): any { return msg.packetID; }
    public getHandler(key: number): IReceiveHandler { return this.handlers[key]; }

    public clear(): void {
        this.handlers = {};
    }

    public dispose(): void {
        this.handlers = null;
    }
}
