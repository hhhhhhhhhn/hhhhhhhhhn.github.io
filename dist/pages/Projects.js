"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("preact/jsx-runtime");
const Page_1 = __importDefault(require("../comps/Page"));
function Projects({ tag = "all" }) {
    return (0, jsx_runtime_1.jsxs)(Page_1.default, Object.assign({ title: tag == "all" ? "Projects" : tag, stylesheets: ["./projects.css"] }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "projects" }, { children: tag == "all"
                    ? (0, jsx_runtime_1.jsxs)("h1", { children: ["Projects ", (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "./tags.html" }, { children: "(By technology)" }))] })
                    : (0, jsx_runtime_1.jsxs)("h1", { children: ["Projects with ", tag] }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "cube-container" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "cube" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "cube-face-container" }, { children: [(0, jsx_runtime_1.jsx)("div", { class: "cube-face", id: "front" }), (0, jsx_runtime_1.jsx)("div", { class: "cube-face", id: "back" }), (0, jsx_runtime_1.jsx)("div", { class: "cube-face", id: "right" }), (0, jsx_runtime_1.jsx)("div", { class: "cube-face", id: "left" }), (0, jsx_runtime_1.jsx)("div", { class: "cube-face", id: "top" }), (0, jsx_runtime_1.jsx)("div", { class: "cube-face", id: "bottom" })] })) })) }))] }));
}
exports.default = Projects;
