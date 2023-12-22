import {writeFileSync, readFileSync} from "fs"
import { mathPreprocess } from "./math"
import { shellPreprocess } from "./shell"
import common from "./common"
import { Environment } from "nunjucks"

const mdIt = require("markdown-it")({
    html: true,
  })
	.use(require("markdown-it-highlightjs"), {register: {"forth": require("./forth")}})
	.use(require("markdown-it-attrs"))
	.use(require("markdown-it-block-image"))
	.use(require("markdown-it-multimd-table"))

export const md = {
	render: async function(input: string): Promise<string> {
		let math = await mathPreprocess(input)
		let shell = await shellPreprocess(math)
		return mdIt.render(shell)
	}
}

function removeTags(string: string): string {
	return string.replace( /(<([^>]+)>)/g, "");
}

let env = new Environment()
env.addFilter("simplify", simplify)
env.addFilter("removeTags", removeTags)

export function renderTemplate(templateFilename: string, outputFilename: string, context: Record<string, any> = {}) {
	context.common = common

	let rendered = env.renderString(readFileSync(templateFilename, "utf-8"), context)
	writeFileSync(outputFilename, rendered, "utf-8")
}

export function simplify(string: string): string {
	return string.replace(/[^\w]/g, "-").toLowerCase()
}
