export interface MojangBlocks {
    readonly block_properties: BlockProperty[];
    readonly data_items: DataItem[];
}

export interface BlockProperty {
    readonly name: string;
    readonly type: string;
    readonly values: {
        readonly value: string | number | boolean;
    }[];
}

export interface DataItem {
    readonly name: string;
    readonly properties: {
        readonly name: string;
    }[];
}
