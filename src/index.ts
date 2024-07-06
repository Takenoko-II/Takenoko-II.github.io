import { TextComponent } from "./TextComponent.js";

import { MojangBlocks, BlockProperty, DataItem } from "./data.js";

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

    private addPropertyCell(row: HTMLTableRowElement, property: BlockProperty) {
        const cell: HTMLTableCellElement = row.insertCell(-1);

        const name: HTMLButtonElement = document.createElement("button");
        name.className = "propertyId";
        name.textContent = property.name;

        const c: HTMLSpanElement = document.createElement("span");
        c.textContent = ": ";

        const type: HTMLSpanElement = document.createElement("span");
        type.className = "propertyType";
        type.textContent = property.type;

        cell.append(name, c, type);

        name.addEventListener("click", () => {
            type.textContent = property.values.map(({ value }) => value).toString();

            if (property.type === "int" || property.type === "bool") {
                type.style.color = "#b9ff98";
            }
            else {
                type.style.color = "#e49764";
            }
        });
    }

    public addBlock(id: string, properties: BlockProperty[]) {
        const row: HTMLTableRowElement = this.table.insertRow(-1);

        row.insertCell(-1).textContent = id;

        for (const property of properties) {
            this.addPropertyCell(row, property);
        }

        return this;
    }

    public get(): HTMLTableElement {
        return this.table;
    }

    public isEmpty(): boolean {
        return this.table.rows.length === 1;
    }
}

const loading: HTMLElement = document.createElement("p");
loading.textContent = "LOADING...";
loading.style.fontSize = "64px";
loading.style.color = "white";
loading.id = "LOADING";

const noHit: HTMLElement = document.createElement("p");
noHit.textContent = "何も見つかりませんでした；；";
noHit.style.fontSize = "64px";
noHit.style.color = "white";
 noHit.id = "NOHIT";

function search(): void {
    const foo = document.getElementById("foo");

    if (foo === null) return;

    const input = document.getElementById("input");
    if (input instanceof HTMLInputElement) {
        const tags = input.value.split(/\s+/g).filter(_ => _ !== "");

        const table: BlockStateSearchResultTable = new BlockStateSearchResultTable();

        fetch("../data/mojang-blocks.json").then(async response => {
            const data: MojangBlocks = await response.json();

            const map: Map<string, BlockProperty[]> = new Map();

            for (const dataItem of data.data_items) {
                if (dataItem.properties.length === 0) continue;

                if (tags.every(tag => dataItem.name.includes(tag) || dataItem.properties.some(_ => _.name.includes(tag)))) {
                    const block: BlockProperty[] = dataItem.properties
                    .map(({ name }) => {
                        return data.block_properties.find(property => property.name === name);
                    })
                    .filter(_ => _ !== undefined);

                    map.set(dataItem.name, block);
                }
            }

            map.forEach((blockProperties, id) => {
                table.addBlock(id, blockProperties);
            });

            const oldTable: HTMLElement | null = document.getElementById("table");
            if (oldTable !== null) {
                oldTable.remove();
            }

            foo.after(loading);
            noHit.remove();

            setTimeout(() => {
                loading.remove();

                if (table.isEmpty()) {
                    foo.after(noHit);
                }
                else {
                    foo.after(table.get());
                }
            }, 10);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const foo = document.getElementById("foo");

    if (foo === null) return;
    
    foo.addEventListener("click", search);
    search();
});
