/*
 * @Author: 
 * @Date: 2021-02-22 19:42:48
 * @Description: 
 * @LastEditTime : 2021-02-22 19:43:42
 * @FilePath: \RomantoryApp\assets\Scripts\Stary\Modules\MainModule\MainBinder.ts
 */

import { Assets } from "../../../../Framework/Core/Assets";
import { FBinder } from "../../../../Framework/Core/FBinder";
import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { StoreManager } from "../../../../Framework/Managers/StoreManager";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { BookShelfInfo } from "./BookShelfInfo";
import { BookShelfItem } from "./BookShelfItem";
import { BookShelfManager } from "./BookShelfManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BookShelfBinder extends FBinder {

    private bookShelfItem: cc.Node = null;

    protected initViews(): void {
        super.initViews();
        this.bookShelfItem = getNodeChildByName(this.asset, "BookShelfItem");
        this.initShow();
    }

    public initShow(): void {
        let bookList: Array<BookShelfInfo> = BookShelfManager.getBookShelfList();
        let listLen: number = bookList.length;

        ResourceManager.LoadPrefab('BookShelf/BookShelfItem', Fun((res: string) => {
            for (let i = 0; i < listLen; i++) {
                let bookItem: cc.Node = StoreManager.NewNode(CacheManager.GetCache(Assets.GetPrefab(res)));
                bookItem.getComponent(BookShelfItem).initShow(bookList[i]);
                this.bookShelfItem.addChild(bookItem);
                bookItem.x = 340 * i - 350;
            }
        }, this));
    }


}
