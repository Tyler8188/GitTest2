import { FModule } from "../../../../Framework/Core/FModule";
import { BookCoverBinder } from "./BookCoverBinder";
import { BookCoverData } from "./BookCoverData";

export class BookCoverModule extends FModule {

    public static ClassName: string = "BookCoverModule";

    public get assets(): any[] {
        return ["BookCover/BookCoverBinder"]
    }

    protected createViews(): void {
        super.createViews();
        this.binder = new BookCoverBinder();
    }

    public show(p: cc.Node, data?: object): void {
        BookCoverData.setData(data);
        super.show(p, data)
    }









}