const { readFileSync, writeFileSync } = require("fs")
const ls = require("ls")
const md = require("markdown-it")()
const { copySync } = require("fs-extra")
const { Template } = require("nunjucks")

const nunjucks = new (require('nunjucks')).Environment()

async function main() {
	copySync("src/", "docs/")
	let projects = getProjects()
	let tags = getTags(projects)
	renderProjectsIndex(projects)
	await renderTagIndex(tags, projects)
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

function nodesFromTags(tags) {
	let nodes = []
	for (let [tagName, titles] of Object.entries(tags)) {
		nodes.push({tagName, titles, id:tagName})
	}
	return nodes
}

function getTagLinks(projects) {
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

function normalizeNodes(nodes) {
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

async function generateGraph(tags, projects) {
	let nodes = nodesFromTags(tags)
	d3 = await import("d3-force")
	let links = getTagLinks(projects)
	let simulation = d3.forceSimulation(nodes)
		.force("link", d3.forceLink(links).id(d => d.id).distance(l => l.distance).strength(3))
		.force("radius", d3.forceCollide(40))
		.force("force", d3.forceManyBody().strength(-10))
		.force("center", d3.forceCenter())
	simulation.tick(500)
	nodes = normalizeNodes(simulation.nodes())
	return [normalizeNodes(simulation.nodes()), links]
}

async function renderTagIndex(tags, projects) {
	let [nodes, links] = await generateGraph(tags, projects)
	renderTemplate("src/projects/tags.html", "docs/projects/tags.html", {nodes, links, Math})
}

main()
