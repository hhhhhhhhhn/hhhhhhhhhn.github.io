const { readFileSync, writeFileSync } = require("fs")
const ls = require("ls")
const md = require("markdown-it")()
const { copySync } = require("fs-extra")
const { Template } = require("nunjucks")

const nunjucks = new (require('nunjucks')).Environment()

function main() {
	copySync("src/", "docs/")
	let projects = getProjects()
	let tags = getTags(projects)
	renderProjectsIndex(projects)
	renderTagIndex(tags)
	renderTags(tags, projects)
}

function getProjects() {
	let projects = {}
	for(let file of ls("projects/*")) {
		let project = readFileSync(file.full, "utf-8")
		let [title, data] = parseProject(project)
		projects[title] = data
	}
	return projects
}

function parseProject(project) {
	let lines = project.split(/\r?\n/)
	return [
		lines[0].replace("# ", ""),
		{
			filename: simplify(lines[0].replace("# ", "").toLowerCase()),
			html:     md.render(lines.slice(0, -1).join("\n")),
			tags:     lines.slice(-1)[0].replace("Tags: ", "").split(", ")
		}
	]
}

function simplify(string) {
	return string.replace(/[^\w]/g, "-").toLowerCase()
}

nunjucks.addFilter("simplify", simplify)

function getTags(projects) {
	let tags = {}
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

function renderTemplate(template, output, context={}) {
	let temp = new Template(readFileSync(template, "utf-8"), nunjucks)
	let rendered = temp.render(context)
	writeFileSync(output, rendered, "utf-8")
}

function renderTags(tags, projects) {
	for(let [tagName, titles] of Object.entries(tags)) {
		renderTemplate(
			"src/projects/tag.temp.html",
			`docs/projects/${simplify(tagName)}.html`,
			{tagName, titles, projects}
		)
	}
}

function renderProjectsIndex(projects) {
	renderTemplate(
		"src/projects/tag.temp.html",
		`docs/projects/index.html`,
		{tagName: "", titles: Object.keys(projects), projects}
	)
}

function renderTagIndex(tags) {
	renderTemplate("src/projects/tags.html", "docs/projects/tags.html", {tags})
}

main()