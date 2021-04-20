/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:49:03
 * @FilePath: \RomantoryApp\assets\Framework\Managers\WebManager.ts
 */
import { WebClient } from "../Network/Web/WebClient";
import { HttpRequest } from "../Network/Web/HttpRequest";
import { IHttpRequest } from "../Interfaces/Network/IHttpRequest";
import { trace } from "../Utility/dx/trace";
import { StoreManager } from "./StoreManager";
import PopupManager from "../../Scripts/Stary/Common/Window/PopupManager";

export class WebManager {
    private static clientClass: any = WebClient;
    private static clientDict: { [key: string]: object } = {};

    /**设置默认使用的Client类型 */
    public static SetDefaultClass(clientClass: typeof HttpRequest | IHttpRequest): void {
        this.clientClass = clientClass;
    }

    public static GetWebData(url: string, data: object, onComplete: Function, onFail: Function = null): void {
        if (this.clientDict[url] != undefined) return;// 不允许重复调用接口
        this.clientDict[url] = { onComplete: onComplete, onFail: onFail };
        let client = this.GetClient();
        if ("timeOut" in client) (client as any)["timeOut"] = 10000;
        client.open(url);
        client.api = url;
        client.send(data ? JSON.stringify(data) : null);
    }

    /**
     * 
     * @param type GET or POST
     * @param url 
     * @param data 
     */
    public static async GetWebDataAsync(type: string, url: string, data?: object, isShowMaks: boolean = true) {
        return new Promise((resolve, reject) => {
            if (isShowMaks) {
                PopupManager.showRequestMask();
            }
            let client = this.GetClient(false);
            if ("timeOut" in client) (client as any)["timeOut"] = 5000;
            client.setRequestHeader("Access-Control-Allow-Origin", "*")
            client.addCallBacks(this, (c, d) => {
                resolve(d);
                if (isShowMaks) {
                    PopupManager.hideRequestMask();
                }
            }, null, (c) => {
                resolve("");
                if (isShowMaks) {
                    PopupManager.hideRequestMask();
                }
            });
            client.open(url, type);
            client.send(data ? JSON.stringify(data) : null);
        });
    }

    private static onWebClientGetData(client: HttpRequest, data: any): void {
        if (this.clientDict[client.api] != undefined) {
            let o: any = this.clientDict[client.api];
            if (o.onComplete != null) o.onComplete(data);//.//call(o.obj,data);
            o.onComplete = null;
        }
        this.storeClient(client);
    }

    private static onWebClientFail(client: HttpRequest): void {
        trace("[WebManager] 无法获取Web接口===>", client.api, " 的数据!!!");
        if (this.clientDict[client.api] != undefined) {
            let o: any = this.clientDict[client.api];
            if (o.onFail != null) o.onFail();//.call(o.obj);
        }
        this.storeClient(client);
    }

    private static onWebClientTimeOut(client: HttpRequest): void {
        trace("[WebManager]调用Web接口===>", client.api, " 超时!!!");
        if (this.clientDict[client.api] != undefined) {
            let o: any = this.clientDict[client.api];
            if (o.onFail != null) o.onFail();//.call(o.obj);
        }
        this.storeClient(client);
    }

    private static storeClient(client: HttpRequest): void {
        if (this.clientDict[client.api] != undefined)
            delete this.clientDict[client.api];
        client.dispose();
    }

    public static GetClient(isSetCallback: boolean = true): HttpRequest {
        var client: HttpRequest = StoreManager.New(this.clientClass);
        if (isSetCallback) {
            if (client instanceof WebClient)
                (client as WebClient).addCallBacks(this, this.onWebClientGetData, null, this.onWebClientFail, this.onWebClientTimeOut);
            else client.addCallBacks(this, this.onWebClientGetData, null, this.onWebClientFail);
        }
        return client;
    }
}
