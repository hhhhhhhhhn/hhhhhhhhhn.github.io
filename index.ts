import { copySync } from "fs-extra"

import {renderWritings, renderWritingIndex, getWritings, renderXML} from "./writing"
import {getProjects, renderProjectsIndex, getTags, renderTags, renderTagIndex} from "./projects"

async function main() {
	copySync("src/", "docs/")
	copySync("writing/assets/", "docs/writing/assets/")
	copySync("writing/assets/", "docs/md/writing/assets/")
	let projects = await getProjects()
	let tags = getTags(projects)
	let writings = await getWritings()
	let writingTests = writings.filter((writing) => writing.tags.includes("Test") || writing.tags.includes("Draft"))
	writings = writings.filter((writing) => !writing.tags.includes("Test") && !writing.tags.includes("Draft"))
	renderProjectsIndex(projects)
	await renderTagIndex(tags, projects)
	renderTags(tags, projects)
	renderWritingIndex(writings)
	renderWritings(writings)
	renderWritings(writingTests)
	renderXML(writings, new Date())
}
main()
