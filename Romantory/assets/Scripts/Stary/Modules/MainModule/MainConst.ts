export enum BlockId {
    mybook,
    recommended
}

export enum BlockType {
    sort = 1,
    rank,
}

export enum MainPageType {
    /**发现 */
    discover,
    /**分类 */
    category
}

export enum ResType {
    img = 1,
    spine
}

export interface CoverJumpData {
    targetClassName: string
    params: { key: string, value: string }
}

export interface Story {
    storyId: number,
    name: string,
    cover: string
}

export interface BlockData {
    blockId: number,
    title: string,
    storyList: Story[],
    hasMore: boolean,
    type: number
}

export interface MainNeedLoadRes {
    type: number
    url: string
}

export interface BannerCover {
    type: number
    url: string
}

export interface BannerData {
    id: number,
    cover: BannerCover
    jumpParams: CoverJumpData
}


/**分类选项 */
export interface CategoryOption {
    id: number
    name: string
}

export interface ReqCategoryStoryListParm {
    categoryId: number
    page: number
}

export interface CategoryStoryData {
    id: number
    name: string
    redCount: number
    cover: string
    intro: string
}
