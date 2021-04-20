/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:55:16
 * @FilePath: \RomantoryApp\assets\Framework\Managers\ProxyManager.ts
 */
import { IProxy } from "../Interfaces/IProxy";
import { getQualifiedClassName } from "../Utility/dx/getQualifiedClassName";

export class ProxyManager {
    private static proxys: { [key: string]: IProxy } = {};
    public static AddProxy(p: IProxy, proxyName?: string): void {
        if (proxyName == null) proxyName = getQualifiedClassName(p);
        this.proxys[proxyName] = p;
    }

    public static RemoveProxy(p: IProxy | string): void {
        let proxyName = "";
        if (typeof p === "string") proxyName = p;
        else proxyName = getQualifiedClassName(p);
        delete this.proxys[proxyName];
    }

    public static GetProxy(proxyName: string): IProxy {
        return this.proxys[proxyName];
    }

    public static ProxyDispose(proxyName: string) {
        let p = this.GetProxy(proxyName);
        if (p == null) return;
        p.dispose();
    }
}
