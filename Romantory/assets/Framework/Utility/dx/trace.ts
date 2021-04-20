/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:40:42
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\trace.ts
 */

import { formatDate } from "./formatDate";

export function trace(...msg): void {
    let str: string = formatDate(new Date(), "hh:MM:ss ms");
    str = "[" + str + "]";
    msg.unshift(str);

    if (CC_EDITOR) {
        cc.log.apply(null, msg);
    }
    else {
        console.log.apply(null, msg);
    }
}