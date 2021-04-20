/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:41:08
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\getFileExtension.ts
 */

export function getFileExtension(url: string): string {
    let sindex = url.lastIndexOf(".");
    if (sindex > -1) return url.substring(sindex + 1);
    return url;
}
