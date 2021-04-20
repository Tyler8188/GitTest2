export class BookCoverData {

    private static data: any = null;

    public static setData(data: any) {
        this.data = data;
    }

    public static getData(): any {
        return this.data;
    }

}