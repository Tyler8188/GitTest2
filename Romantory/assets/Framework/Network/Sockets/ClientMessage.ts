/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:48:21
 * @FilePath: \RomantoryApp\assets\Framework\Network\Sockets\ClientMessage.ts
 */
import { IStore } from "../../Interfaces/IStore";
import { IClientMessage } from "../../Interfaces/Network/IClientMessage";
import { StoreManager } from "../../Managers/StoreManager";


export class ClientMessage implements IClientMessage, IStore {
    public static ClassName: string = "ClientMessage";

    public packetID: number = 0;
    protected _bytes: ArrayBuffer;
    protected _content: any = null;

    public write(value: any, writePacketID: boolean = false): void {
        if (typeof value !== "string") value = JSON.stringify(value);
    }

    public parser(value: any): void {
        if (typeof value === "string") this._content = JSON.parse(value);
        else this._content = value;
    }

    public clear(): void {
        this._content = null;
        this.packetID = 0;
    }

    public get bytes(): ArrayBuffer { return this._bytes; }
    public get content(): any { return this._content; }

    public dispose(): void {
        this.clear();
        StoreManager.Store(this);
    }

    public setMessage(packetID: any = null, data: any = null, writePacketID: boolean = false): void {
        if (packetID != null) this.packetID = packetID;
        if (data != null) this.write(data, writePacketID);
    }

    public static Get(packetID: any = null, data: any = null, writePacketID: boolean = false): ClientMessage {
        let msg: ClientMessage = StoreManager.New(ClientMessage);
        msg.setMessage(packetID, data, writePacketID);
        return msg;
    }
}
