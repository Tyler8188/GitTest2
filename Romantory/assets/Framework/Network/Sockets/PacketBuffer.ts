/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-19 17:26:35
 * @FilePath: \RomantoryApp\assets\Framework\Network\Sockets\PacketBuffer.ts
 */

export class PacketBuffer {
    public static ClassName: string = "PacketBuffer";
    protected bytes: Array<number>;
    public constructor() {
        this.bytes = [];
    }

    public push(data: ArrayBuffer): void {
        for (let i: number = 0; i < data.byteLength; i++)
            this.bytes.push(data[i]);
    }

    public clear(): void {
        this.bytes.length = 0;
    }

    public get packetBytes(): Array<number> { return this.bytes; }
    public set packetBytes(value: Array<number>) { this.bytes = value; }

    public dispose(): void {
        this.clear();
    }
}
