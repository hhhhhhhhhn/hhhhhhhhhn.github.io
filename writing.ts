import { readFileSync } from "fs"
import ls from "ls"

import {simplify, renderTemplate, md} from "./template"

export type Writing = {
	title: string,
	filename: string,
	html: string,
	md: string,
	tags: string[],
	date: Date,
}

export async function getWritings(): Promise<Writing[]> {
	let writings = []
	for(let file of ls("writing/*")) {
		if (file.full.slice(-3) == ".md") {
			let writingText = readFileSync(file.full, "utf-8")
			writings.push(await parseWriting(writingText))
		}
	}
	writings.sort((a, b) => (b.date.getTime() - a.date.getTime()))
	return writings
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

export function renderWritings(writings: Writing[]) {
	for(let writing of writings) {
		renderTemplate(
			"src/writing/writing.temp.html",
			`docs/writing/${simplify(writing.title)}.html`,
			{
				writing
			}
		)
	}
}

export function renderWritingIndex(writings: Writing[]) {
	renderTemplate("src/writing/index.html", "docs/writing/index.html", {writings})
}

export function renderXML(writings: Writing[], date: Date) {
	renderTemplate("src/writing/feed.xml", "docs/writing/feed.xml", {writings, date})
}

