var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BlockStateSearchResultTable = /** @class */ (function () {
    function BlockStateSearchResultTable() {
        this.table = document.createElement("table");
        this.table.id = "table";
        var row = this.table.insertRow(-1);
        row.insertCell(-1).textContent = "ブロックID";
        var stateCell = row.insertCell(-1);
        stateCell.textContent = "ブロックステート";
        stateCell.colSpan = Math.pow(2, 31) - 1;
    }
    BlockStateSearchResultTable.prototype.addBlock = function (id, properties) {
        var row = this.table.insertRow(-1);
        row.insertCell(-1).textContent = id;
        var _loop_1 = function (property) {
            var cell = row.insertCell(-1);
            var name_1 = document.createElement("button");
            name_1.className = "propertyId";
            name_1.textContent = property.name;
            var c = document.createElement("span");
            c.textContent = ": ";
            var type = document.createElement("span");
            type.className = "propertyType";
            type.textContent = property.type;
            cell.append(name_1, c, type);
            name_1.addEventListener("click", function () {
                type.textContent = property.values.map(function (_a) {
                    var value = _a.value;
                    return value;
                }).toString();
                if (property.type === "int" || property.type === "bool") {
                    type.style.color = "#b9ff98";
                }
                else {
                    type.style.color = "#e49764";
                }
            });
        };
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            _loop_1(property);
        }
        return this;
    };
    BlockStateSearchResultTable.prototype.get = function () {
        return this.table;
    };
    BlockStateSearchResultTable.prototype.isEmpty = function () {
        return this.table.rows.length === 1;
    };
    return BlockStateSearchResultTable;
}());
var loading = document.createElement("p");
loading.textContent = "LOADING...";
loading.style.fontSize = "64px";
loading.style.color = "white";
loading.id = "LOADING";
var noHit = document.createElement("p");
noHit.textContent = "何も見つかりませんでした；；";
noHit.style.fontSize = "64px";
noHit.style.color = "white";
noHit.id = "NOHIT";
function search() {
    var _this = this;
    var foo = document.getElementById("foo");
    if (foo === null)
        return;
    var input = document.getElementById("input");
    if (input instanceof HTMLInputElement) {
        var tags_1 = input.value.split(/\s+/g);
        var table_1 = new BlockStateSearchResultTable();
        fetch("mojang-blocks.json").then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var data, map, _loop_2, _i, _a, dataItem, _loop_3, _b, _c, blockProperty, oldTable;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        data = _d.sent();
                        map = new Map();
                        _loop_2 = function (dataItem) {
                            if (dataItem.properties.length === 0)
                                return "continue";
                            if (tags_1.some(function (tag) { return dataItem.name.includes(tag); })) {
                                var block = dataItem.properties.map(function (_a) {
                                    var name = _a.name;
                                    return data.block_properties.find(function (property) { return property.name === name; });
                                });
                                map.set(dataItem.name, block);
                            }
                        };
                        for (_i = 0, _a = data.data_items; _i < _a.length; _i++) {
                            dataItem = _a[_i];
                            _loop_2(dataItem);
                        }
                        _loop_3 = function (blockProperty) {
                            if (tags_1.some(function (tag) { return blockProperty.name.includes(tag) || blockProperty.type === tag; })) {
                                for (var _e = 0, _f = data.data_items; _e < _f.length; _e++) {
                                    var dataItem = _f[_e];
                                    if (dataItem.properties.some(function (property) { return property.name !== blockProperty.name; }))
                                        continue;
                                    map.set(dataItem.name, [blockProperty]);
                                }
                            }
                        };
                        for (_b = 0, _c = data.block_properties; _b < _c.length; _b++) {
                            blockProperty = _c[_b];
                            _loop_3(blockProperty);
                        }
                        map.forEach(function (blockProperties, id) {
                            table_1.addBlock(id, blockProperties);
                        });
                        oldTable = document.getElementById("table");
                        if (oldTable !== null) {
                            oldTable.remove();
                        }
                        foo.after(loading);
                        noHit.remove();
                        setTimeout(function () {
                            loading.remove();
                            if (table_1.isEmpty()) {
                                foo.after(noHit);
                            }
                            else {
                                foo.after(table_1.get());
                            }
                        }, 300);
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("foo").addEventListener("click", search);
    search();
});
