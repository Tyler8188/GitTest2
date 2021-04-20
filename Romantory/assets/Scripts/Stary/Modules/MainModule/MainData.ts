import { BannerData, BlockData, BlockType, CategoryOption, CategoryStoryData, MainNeedLoadRes, ResType, Story } from "../MainModule/MainConst";

export default class MainData {
    private static blockData: BlockData[] = [];

    private static bannerData: BannerData[] = [];

    private static needLoadRes: MainNeedLoadRes[] = [];

    private static categoryOptions: CategoryOption[] = [];

    private static categoryStoryDatas: { [key: number]: CategoryStoryData } = {};

    public static setBannerData(data: BannerData[]): void {
        this.needLoadRes = [];
        this.bannerData = data;
    }

    public static setBlockData(data: BlockData[]): void {
        this.needLoadRes = [];
        this.blockData = data;
    }

    public static setCategoryOptions(categoryOptions: CategoryOption[]): void {
        this.categoryOptions = categoryOptions
    }

    /**主页各块数据 */
    public static getBlockData(): BlockData[] {
        return this.blockData;
    }

    /**主页banner位数据 */
    public static getBannerData(): BannerData[] {
        return this.bannerData;
    }

    /**分类选项按钮列表 */
    public static getCategoryOptions(): CategoryOption[] {
        return this.categoryOptions;
    }

    /**需要加载的资源 */
    public static getNeedLoadRes() {
        if (this.needLoadRes.length > 0) {
            return this.needLoadRes
        }
        let loadRes: MainNeedLoadRes[] = [];
        for (let i = 0; i < this.blockData.length; i++) {
            const storyDataList = this.blockData[i].storyList || [];
            for (let index = 0; index < storyDataList.length; index++) {
                const storyData: Story = storyDataList[index];
                loadRes.push({ url: storyData.cover, type: ResType.img });
            }
        }
        for (let index = 0; index < this.bannerData.length; index++) {
            const bannerData = this.bannerData[index];
            loadRes.push({ url: bannerData.cover.url, type: bannerData.cover.type });
        }
        this.needLoadRes = loadRes;
        return loadRes;
    }

}