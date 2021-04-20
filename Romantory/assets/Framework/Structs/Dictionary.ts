/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 字典数据结构类
 * @LastEditTime : 2021-02-23 15:46:30
 * @FilePath: \RomantoryApp\assets\Framework\Structs\Dictionary.ts
 */
export class Dictionary<KT, VT>
{
	public static ClassName: string = "Dictionary";
	private keys: KT[] = [];
	private values: VT[] = [];
	public setValue(key: KT, value: VT): void {
		let index = this.keys.indexOf(key);
		if (index == -1) {
			this.keys.push(key);
			this.values.push(value);
		} else this.values[index] = value;
	}

	public getValue(key: KT): VT {
		let index = this.keys.indexOf(key);
		return index == -1 ? null : this.values[index];
	}

	public remove(key: KT) {
		var index = this.keys.indexOf(key, 0);
		if (index > -1) {
			this.keys.splice(index, 1);
			this.values.splice(index, 1);
		}
	}

	public hasKey(key: KT): boolean { return this.keys.indexOf(key) != -1; }
	public getKeys(): KT[] { return this.keys; }
	public getValues(): VT[] { return this.values; }
	public get count(): number { return this.keys.length; }
}