/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 取消资源延时释放
 * @param asset 资源全路径
 * @LastEditTime : 2021-02-19 16:57:51
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\cancelDelayReleaseRes.ts
 */
import { ResourceReleaseManager } from "../../Managers/ResourceReleaseManager";

export function cancelDelayReleaseRes(asset: string | string[]): void {
    if (asset == null) return;

    if (typeof asset === "string") {
        ResourceReleaseManager.ClearReleaseDelay(asset);
    }
    else {
        for (let i = 0; i < asset.length; i++) {
            ResourceReleaseManager.ClearReleaseDelay(asset[i]);
        }
    }
} 
