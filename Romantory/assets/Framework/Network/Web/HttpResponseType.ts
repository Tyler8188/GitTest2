/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 类提供了一些用于指定如何接收已下载数据的值。
 * @LastEditTime : 2021-02-19 16:56:36
 * @FilePath: \RomantoryApp\assets\Framework\Network\Web\HttpResponseType.ts
 */

export class HttpResponseType {
	public static ClassName: string = "HttpResponseType";
	/**
	 * 返回字符串。HttpRequest.responseType属性的默认值。
	 */
	public static TEXT: any = "text";
	/**
	 * 返回二进制的ArrayBuffer对象。
	 */
	public static ARRAY_BUFFER: any = "arraybuffer";
}