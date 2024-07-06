interface BlockProperty {
    readonly name: string;
    readonly type: string;
    readonly values: { readonly value: string | number | boolean }[];
}

interface DataItem {
    readonly name: string;
    readonly properties: { readonly name: string }[];
}

interface MojangBlocks {
    readonly block_properties: BlockProperty[];
    readonly data_items: DataItem[];
}

class BlockStateSearchResultTable {
    private readonly table: HTMLTableElement = document.createElement("table");

    public constructor() {
        this.table.id = "table";
        const row: HTMLTableRowElement = this.table.insertRow(-1);
        row.insertCell(-1).textContent = "ブロックID";
        const stateCell: HTMLTableCellElement = row.insertCell(-1);
        stateCell.textContent = "ブロックステート";
        stateCell.colSpan = 2 ** 31 - 1;
    }

    public addBlock(id: string, properties: BlockProperty[]) {
        const row: HTMLTableRowElement = this.table.insertRow(-1);

        row.insertCell(-1).textContent = id;

        for (const property of properties) {
            const cell: HTMLTableCellElement = row.insertCell(-1);

            const name: HTMLButtonElement = document.createElement("button");
            name.className = "propertyId";
            name.textContent = property.name;
            name.addEventListener("click", () => {
                console.log("Hello World!");
            });

            const c: HTMLSpanElement = document.createElement("span");
            c.textContent = ": ";

            const type: HTMLSpanElement = document.createElement("span");
            type.className = "propertyType"
            type.textContent = property.type;

            cell.append(name, c, type);
        }

        return this;
    }

    public get(): HTMLTableElement {
        return this.table;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const foo = document.getElementById("foo");

    if (foo === null) return;

    foo.addEventListener("click", () => {
        const input = document.getElementById("input");
        if (input instanceof HTMLInputElement) {
            const tags = input.value.split(/\s+/g);

            const table: BlockStateSearchResultTable = new BlockStateSearchResultTable();

            fetch("mojang-blocks.json").then(async response => {
                const data: MojangBlocks = await response.json();

                for (const dataItem of data.data_items) {
                    if (dataItem.properties.length === 0) continue;

                    if (tags.some(tag => dataItem.name.includes(tag))) {
                        const block: BlockProperty[] = dataItem.properties.map(({ name }) => {
                            return data.block_properties.find(property => property.name === name);
                        });

                        table.addBlock(dataItem.name, block);
                    }
                }

                const oldTable: HTMLElement = document.getElementById("table");
                if (oldTable !== null) {
                    oldTable.remove();
                }

                const oldBigP: HTMLElement = document.getElementById("LOADING");
                if (oldBigP !== null) {
                    oldBigP.remove();
                }

                const bigP: HTMLElement = document.createElement("p");
                bigP.textContent = "LOADING...";
                bigP.style.fontSize = "64px";
                bigP.style.color = "white";
                bigP.id = "LOADING";

                foo.after(bigP);

                setTimeout(() => {
                    foo.after(table.get());
                    bigP.remove();
                }, 300);
            });
        }
    });

    foo.click();
});
