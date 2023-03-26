"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ronto_1 = require("ronto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function builder() {
    (0, ronto_1.copy)("src/CNAME", "docs/CNAME");
    (0, ronto_1.renderComponent)("pages/Index.tsx", {}, "docs/index.html");
    for (let file of fs_1.default.readdirSync("css")) {
        let src = path_1.default.resolve("css", file);
        let dest = path_1.default.resolve("docs", file);
        (0, ronto_1.copy)(src, dest);
    }
    (0, ronto_1.renderComponent)("pages/Projects.tsx", {}, "docs/projects/index.html");
}
(0, ronto_1.watch)(builder);
