class BlockStateSearchResultTable {
    constructor() {
        this.table = document.createElement("table");
        this.table.id = "table";
        const row = this.table.insertRow(-1);
        row.insertCell(-1).textContent = "ブロックID";
        const stateCell = row.insertCell(-1);
        stateCell.textContent = "ブロックステート";
        stateCell.colSpan = 2 ** 31 - 1;
    }
    addPropertyCell(row, property) {
        const cell = row.insertCell(-1);
        const name = document.createElement("button");
        name.className = "propertyId";
        name.textContent = property.name;
        const c = document.createElement("span");
        c.textContent = ": ";
        const type = document.createElement("span");
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
    addBlock(id, properties) {
        const row = this.table.insertRow(-1);
        row.insertCell(-1).textContent = id;
        for (const property of properties) {
            this.addPropertyCell(row, property);
        }
        return this;
    }
    get() {
        return this.table;
    }
    isEmpty() {
        return this.table.rows.length === 1;
    }
}
const loading = document.createElement("p");
loading.textContent = "LOADING...";
loading.style.fontSize = "64px";
loading.style.color = "white";
loading.id = "LOADING";
const noHit = document.createElement("p");
noHit.textContent = "何も見つかりませんでした；；";
noHit.style.fontSize = "64px";
noHit.style.color = "white";
noHit.id = "NOHIT";
function search() {
    const foo = document.getElementById("foo");
    if (foo === null)
        return;
    const input = document.getElementById("input");
    if (input instanceof HTMLInputElement) {
        const tags = input.value.split(/\s+/g).filter(_ => _ !== "");
        const table = new BlockStateSearchResultTable();
        fetch("../data/mojang-blocks.json").then(async (response) => {
            const data = await response.json();
            const map = new Map();
            for (const dataItem of data.data_items) {
                if (dataItem.properties.length === 0)
                    continue;
                if (tags.every(tag => dataItem.name.includes(tag) || dataItem.properties.some(_ => _.name.includes(tag)))) {
                    const block = dataItem.properties
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
            const oldTable = document.getElementById("table");
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
    if (foo === null)
        return;
    foo.addEventListener("click", search);
    search();
});
export {};
