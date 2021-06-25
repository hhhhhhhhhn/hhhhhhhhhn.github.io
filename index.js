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
			html:     md.render(lines.slice(0, -3).join("\n")),
			tags:     lines.slice(-3)[0].replace("Tags: ", "").split(", "),
			score:    Number(lines.slice(-2)[0])
		}
	]
}

function sortTitlesByScore(titles, projects) {
	return titles.sort((title1, title2) => {
		if (projects[title1].score > projects[title2].score)
			return -1
		return 1
	})
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
			{
				tagName,
				titles: sortTitlesByScore(titles, projects),
				projects
			}
		)
	}
}

function renderProjectsIndex(projects) {
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

function renderTagIndex(tags) {
	renderTemplate("src/projects/tags.html", "docs/projects/tags.html", {tags})
}

main()
