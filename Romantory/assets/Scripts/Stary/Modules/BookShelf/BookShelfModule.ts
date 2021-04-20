/*
 * @Author: 
 * @Date: 2021-02-24 11:56:32
 * @Description: 
 * @LastEditTime : 2021-02-24 12:02:31
 * @FilePath: \Romantory\assets\Scripts\Stary\Modules\BookShelf\BookShelfModule.ts
 */
import { FModule } from "../../../../Framework/Core/FModule";
import BookShelfBinder from "./BookShelfBinder";

export class BookShelfModule extends FModule {
    public static ClassName: string = "BookShelfModule";
    public get assets(): any[] { return ["BookShelf/BookShelfBinder"] };

    public constructor() {
        super();
        this.isNeedPreload = false;// 默认不需要预加载资源，只有使用了Mediator管理模块时才起作用
        this.isReleaseAsset = false;// true:销毁模块时释放资源   false:销毁模块时不释放资源
        this.delayReleaseAssetTime = 0;// 销毁模块时延时释放资源，单位ms
    }

    protected createViews(): void {
        super.createViews();

        this.binder = new BookShelfBinder();
    }

    protected showViews(): void {
        super.showViews();
    }
    protected hideViews(): void {
        super.hideViews();
    }
}