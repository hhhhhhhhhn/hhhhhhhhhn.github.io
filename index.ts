import { readFileSync, writeFileSync } from "fs"
import ls from "ls"
const mdIt = require("markdown-it")({
    html: true,
  })
	.use(require("markdown-it-highlightjs"), {register: {"forth": require("./forth")}})
	.use(require("markdown-it-attrs"))
	.use(require("markdown-it-block-image"))
	.use(require("markdown-it-multimd-table"))
import { copySync } from "fs-extra"
import { Template } from "nunjucks"
import common from "./common"
import { mathPreprocess } from "./math"
import { shellPreprocess } from "./shell"
import d3 from "d3-force"

const nunjucks = new (require('nunjucks')).Environment()

const md = {
	render: async function(input: string): Promise<string> {
		let math = await mathPreprocess(input)
		let shell = await shellPreprocess(math)
		return mdIt.render(shell)
	}
}

async function main() {
	copySync("src/", "docs/")
	copySync("writings/assets/", "docs/writings/assets/")
	copySync("writings/assets/", "docs/md/writings/assets/")
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

/////////////////////////// Projects Section //////////////////////////////////
async function getProjects(): Promise<Record<string, Project>> {
	let projects: {[title: string]: Project} = {}
	for(let file of ls("projects/*")) {
		let unparsed = readFileSync(file.full, "utf-8")
		let project = await parseProject(unparsed)
		projects[project.title] = project
	}
	return projects
}

type Project = {
	filename: string,
	html: string,
	md: string,
	tags: string[],
	score: number,
	title: string,
}

async function parseProject(project: string): Promise<Project> {
	let lines = project.split(/\r?\n/)
	return {
			title: lines[0].replace("# ", ""),
			filename: simplify(lines[0].replace("# ", "").toLowerCase()),
			html:     await md.render(lines.slice(0, -3).join("\n")),
			md:       lines.slice(0, -3).join("\n"),
			tags:     lines.slice(-3)[0].replace("Tags: ", "").split(", "),
			score:    Number(lines.slice(-2)[0])
		}
}

function sortTitlesByScore(titles: string[], projects: Record<string, Project>): string[] {
	return titles.sort((title1, title2) => {
		if (projects[title1].score > projects[title2].score)
			return -1
		return 1
	})
}

function simplify(string: string): string {
	return string.replace(/[^\w]/g, "-").toLowerCase()
}

function removeTags(string: string): string {
	return string.replace( /(<([^>]+)>)/g, "");
}

nunjucks.addFilter("simplify", simplify)
nunjucks.addFilter("removeTags", removeTags)

function getTags(projects: Record<string, Project>): Record<string, string[]> {
	let tags: Record<string, string[]> = {}
	for(let [title, project] of Object.entries(projects)) {
		for(let tag of project.tags) {
			if(tags[tag])
				tags[tag].push(title)
			else
				tags[tag] = [title]
		}
	}
	return tags
}

function renderTemplate(templateFilename: string, outputFilename: string, context: Record<string, any> = {}) {
	context.common = common
	let temp = new Template(readFileSync(templateFilename, "utf-8"), nunjucks)
	let rendered = temp.render(context)
	writeFileSync(outputFilename, rendered, "utf-8")
}

function renderTags(tags: Record<string, string[]>, projects: Record<string, Project>) {
	for(let [tagName, titles] of Object.entries(tags)) {
		renderTemplate(
			"src/projects/tag.temp.html",
			`docs/projects/${simplify(tagName)}.html`,
			{
				tagName,
				titles: sortTitlesByScore(titles, projects),
				projects
			}
		)
	}
}

function renderProjectsIndex(projects: Record<string, Project>) {
	renderTemplate(
		"src/projects/tag.temp.html",
		`docs/projects/index.html`,
		{
			tagName: "",
			titles: sortTitlesByScore(Object.keys(projects), projects),
			projects
		}
	)
}

function nodesFromTags(tags: Record<string, string[]>) {
	let nodes = []
	for (let [tagName, titles] of Object.entries(tags)) {
		nodes.push({tagName, titles, id:tagName})
	}
	return nodes
}

function getTagLinks(projects: Record<string, Project>) {
	let links = []
	for (let [, project] of Object.entries(projects)) {
		for (let i = 0; i < project.tags.length - 1; i++) {
			for (let j = i + 1; j < project.tags.length; j++) {
				let isNewLink = true
				for (let link of links) {
					if (
						(link.source == project.tags[i] && link.target == project.tags[j])
						|| (link.source == project.tags[j] && link.target == project.tags[i])
					) {
						isNewLink = false
						link.distance *= 0.95
					}
				}
				if (isNewLink) {
					links.push({
						"source": project.tags[i],
						"target": project.tags[j],
						"distance": 100
					})
				}
			}
		}
	}
	return links
}

function normalizeNodes(nodes: any[]) {
	let leftBound = Infinity
	let topBound = Infinity
	let rightBound = -Infinity
	let bottomBound = -Infinity

	for (let node of nodes) {
		if (node.x < leftBound)
			leftBound = node.x
		if (node.y < topBound)
			topBound = node.y
		if (node.x > rightBound)
			rightBound = node.x
		if (node.y > bottomBound)
			bottomBound = node.y
	}

	let xScalingFactor = 1 / (rightBound - leftBound)
	let yScalingFactor = 1 / (bottomBound - topBound)
	let xOffset = -(leftBound * xScalingFactor)
	let yOffset = -(topBound * yScalingFactor)

	for (let node of nodes) {
		node.x = node.x * xScalingFactor + xOffset
		node.y = node.y * yScalingFactor + yOffset
	}

	return nodes
}

async function generateGraph(tags: Record<string, string[]>, projects: Record<string, Project>) {
	let nodes = nodesFromTags(tags)
	let links = getTagLinks(projects)
	// @ts-ignore
	let simulation = d3.forceSimulation(nodes)
		// @ts-ignore
		.force("link", d3.forceLink(links).id(d => d.id).distance(l => l.distance).strength(3))
		.force("radius", d3.forceCollide(40))
		.force("force", d3.forceManyBody().strength(-10))
		.force("center", d3.forceCenter())
	simulation.tick(500)
	nodes = normalizeNodes(simulation.nodes())
	return normalizeNodes(simulation.nodes())
}

async function renderTagIndex(tags: Record<string, string[]>, projects: Record<string, Project>) {
	let [nodes, links] = await generateGraph(tags, projects)
	renderTemplate("src/projects/tags.html", "docs/projects/tags.html", {nodes, links, Math})
}

////////////////////////////// Writings section ///////////////////////////////
async function getWritings(): Promise<Writing[]> {
	let writings = []
	for(let file of ls("writings/*")) {
		if (file.full.slice(-3) == ".md") {
			let writingText = readFileSync(file.full, "utf-8")
			writings.push(await parseWriting(writingText))
		}
	}
	writings.sort((a, b) => (b.date.getTime() - a.date.getTime()))
	return writings
}

type Writing = {
	title: string,
	filename: string,
	html: string,
	md: string,
	tags: string[],
	date: Date,
}

async function parseWriting(text: string): Promise<Writing> {
	let lines = text.split("\n")
	return {
		title:    lines[0].replace("# ", ""),
		filename: simplify(lines[0].replace("# ", "").toLowerCase()),
		html:     await md.render(lines.slice(0, -3).join("\n")),
		md:       lines.slice(0, -3).join("\n"),
		tags:     lines.slice(-3)[0].replace("Tags: ", "").split(", "),
		date:     new Date(lines.slice(-2)[0])
	}
}

function renderWritings(writings: Writing[]) {
	for(let writing of writings) {
		renderTemplate(
			"src/writings/writing.temp.html",
			`docs/writings/${simplify(writing.title)}.html`,
			{
				writing
			}
		)
	}
}

function renderWritingIndex(writings: Writing[]) {
	renderTemplate("src/writings/index.html", "docs/writings/index.html", {writings})
}

function renderXML(writings: Writing[], date: Date) {
	renderTemplate("src/writings/feed.xml", "docs/writings/feed.xml", {writings, date})
}

main()
