import {watch, renderComponent, copy} from "ronto"
import fs from "fs"
import path from "path"

function builder() {
	copy("src/CNAME", "docs/CNAME")
	renderComponent("pages/Index.tsx", {}, "docs/index.html")
	for (let file of fs.readdirSync("css")) {
		let src = path.resolve("css", file)
		let dest = path.resolve("docs", file)
		copy(src, dest)
	}
	renderComponent("pages/Projects.tsx", {}, "docs/projects/index.html")
}

watch(builder)
