/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 16:11:53
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\getFileName.ts
 */

export function getFileName(url: string): string {
    let sindex = url.lastIndexOf("/");
    if (sindex == -1) sindex = url.lastIndexOf("\\");
    if (sindex > -1) {
        url = url.substring(sindex + 1);
        sindex = url.indexOf(".");
        if (sindex > -1) {
            url = url.substring(0, sindex);
        }
    }
    return url;
}
