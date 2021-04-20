/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:41:17
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\formatString.ts
 */

export function formatString(str: string, args: any[]): string {
	for (var i = 0; i < args.length; i++) {
		str = str.replace("{" + i + "}", args[i]);
	}
	return str;
}
