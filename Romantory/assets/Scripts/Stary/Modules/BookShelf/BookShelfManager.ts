/*
 * @Author: 
 * @Date: 2021-02-24 10:14:40
 * @Description: 
 * @LastEditTime : 2021-02-24 10:18:19
 * @FilePath: \Romantory\assets\Scripts\Stary\Modules\MainModule\BookShelfManager.ts
 */

import { Dictionary } from "../../../../Framework/Structs/Dictionary";
import { Singleton } from "../../Common/Singleton";
import { BookShelfInfo } from "./BookShelfInfo";

export class BookShelfManager extends Singleton {

    public static bookShelfDic: Dictionary<number, BookShelfInfo> = new Dictionary<number, BookShelfInfo>();

    public static initConfig() {
        let json_url = 'Config/Scene';
        cc.resources.load(json_url, function (err, data: cc.JsonAsset) {
            if (err) {
                console.log("err:", err);
                return;
            } else {
                BookShelfManager.setupConfigData(data.json.bookShelf);
            }
        });
    }

    public static setupConfigData(data: any): void {
        let len: number = data.length;
        let bookInfo: BookShelfInfo = null;
        for (let i = 0; i < len; ++i) {
            bookInfo = new BookShelfInfo();
            bookInfo.id = data[i].id;
            bookInfo.type = data[i].type;
            bookInfo.name = data[i].name;
            bookInfo.price = data[i].price;

            this.bookShelfDic.setValue(bookInfo.id, bookInfo);
        }
    }

    public static getBookShelfList(): Array<BookShelfInfo> {
        return this.bookShelfDic.getValues();
    }

    public static getBookShilfInfoById(bookId: number): BookShelfInfo {
        return this.bookShelfDic.getValue(bookId);
    }
}
