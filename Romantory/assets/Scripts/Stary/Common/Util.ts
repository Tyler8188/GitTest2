export default class Util {

    /**保留几位小数 */
    public static getKeepNum(oldNum: number, n: number): number {
        let beishu = Math.pow(10, n);
        let newNum = oldNum * Math.pow(10, n);
        newNum = Math.floor(newNum);
        newNum = newNum / beishu;
        return newNum
    }

    /**数字转带单位字符 */
    public static changeNum2StrSymbol(num: number) {
        if (num > 10000) {
            let newNum = num / 1000;
            newNum = this.getKeepNum(newNum, 1);
            return newNum + "k";
        } else {
            return num;
        }
    }



}