"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("preact/jsx-runtime");
const Page_1 = __importDefault(require("../comps/Page"));
function Index() {
    return (0, jsx_runtime_1.jsxs)(Page_1.default, Object.assign({ title: "hhhhhhhhhn", description: "Jose Ugarte, fullstack developer - Personal website / Javascriptless hut", stylesheets: ["./index.css"] }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "main-container" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "main" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "github-container" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ id: "github", href: "https://github.com/hhhhhhhhhn" }, { children: "github" })) })), (0, jsx_runtime_1.jsx)("h1", { children: "hhhhhhhhhn" }), (0, jsx_runtime_1.jsx)("a", Object.assign({ id: "projects", href: "./projects" }, { children: "projects" }))] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "bottom-corner" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "mailto:hhhhhhhhhn@protonmail.com" }, { children: "contact" })), (0, jsx_runtime_1.jsx)("a", { children: "\u2022" }), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: "./writings", id: "writings-link" }, { children: ["writings", (0, jsx_runtime_1.jsx)("div", { id: "invert-circle" })] }))] })), (0, jsx_runtime_1.jsx)("img", { src: "http://analytics-hhhhhhhhhn-com.up.railway.app/landing/unknown/image.svg", srcset: "http://analytics-hhhhhhhhhn-com.up.railway.app/landing/desktop/image.svg 1w, https://analytics-hhhhhhhhhn-com.up.railway.app/landing/mobile/image.svg 2w", sizes: "(orientation: portrait) 2px, 1px", style: "display: fixed; width: 0; height: 0;" })] }));
}
exports.default = Index;
