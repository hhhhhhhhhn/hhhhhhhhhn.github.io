"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("preact/jsx-runtime");
function Page({ children, title = "hhhhhhhhhn", description = title, stylesheets = [] }) {
    return (0, jsx_runtime_1.jsxs)("html", { children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("meta", { charSet: "UTF-8" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), (0, jsx_runtime_1.jsx)("link", { rel: "icon", href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 style=%22background-color:white%22><text y=%221em%22 x=%220.3em%22 font-size=%2280%22 font-family=%22sans%22>  h</text></svg>" }), (0, jsx_runtime_1.jsx)("meta", { name: "description", content: description }), (0, jsx_runtime_1.jsx)("title", { children: title }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "./main.css" }), stylesheets.map(x => (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: x }))] }), (0, jsx_runtime_1.jsx)("body", { children: children })] });
}
exports.default = Page;
