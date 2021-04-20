/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description:延时释放资源
 * @param asset 资源全路径
 * @param delay 延时时长，单位ms
 * @LastEditTime : 2021-02-19 16:58:10
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\delayReleaseRes.ts
 */
import { ResourceReleaseManager } from "../../Managers/ResourceReleaseManager";

export function delayReleaseRes(asset: string | string[], delay: number): void {
    if (typeof asset === "string") ResourceReleaseManager.ReleaseAsset(asset, delay);
    else {
        for (let i = 0; i < asset.length; i++) {
            ResourceReleaseManager.ReleaseAsset(asset[i], delay);
        }
    }
} 
