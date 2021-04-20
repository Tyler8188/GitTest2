/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 16:12:48
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\integer.ts
 */

export function integer(num: number) {
    if (num < 0) {
        return Math.ceil(num);
    }
    else {
        return Math.floor(num);
    }
}
