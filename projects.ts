import { readFileSync } from "fs"
import ls from "ls"

import {simplify, renderTemplate, md} from "./template"

export async function getProjects(): Promise<Record<string, Project>> {
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

export function getTags(projects: Record<string, Project>): Record<string, string[]> {
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

export function renderTags(tags: Record<string, string[]>, projects: Record<string, Project>) {
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

export function renderProjectsIndex(projects: Record<string, Project>) {
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
	let module = "d3-force"
	const d3import = import(module) // Must be dynamic import, or node breaks
	let d3 = await d3import

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

export async function renderTagIndex(tags: Record<string, string[]>, projects: Record<string, Project>) {
	let nodes = await generateGraph(tags, projects)
	renderTemplate("src/projects/tags.html", "docs/projects/tags.html", {nodes, Math})
}
