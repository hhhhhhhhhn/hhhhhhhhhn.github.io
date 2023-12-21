import mjApi from "mathjax-node"
mjApi.start()

function escapeHTML(str: string) {
	return str.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\//g, "&#47;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/[*]/g, "&#42;")
		.replace(/\n/g, " ")
}

export async function renderAsciimath(input: string) {
	let result = await mjApi.typeset({
		format: "AsciiMath",
		svg: true,
		math: input
	})
	let svg: string = result.svg

	// Adds invisible text on top of the result, for copying and screen readers
	svg = svg.replace(/<defs[^>]*>/, '<text text-length="100%" fill="transparent">' + escapeHTML(input) + "</text><defs>")
	return svg
}

renderAsciimath("1+1")

export async function mathPreprocess(input: string): Promise<string> {
	let output = await replaceAsync(input, /\n```math\n([\S\s]*?)```/g,
		async (_: any, math: string) =>
			`<div class="math-block">
				${await renderAsciimath(math)}
			</div>`
		)
	output = await replaceAsync(output, /`math ([\S\s]*?)`/g,
			async (_: any, math: string) => `<span class="math-inline"> ${await renderAsciimath(math)} </span>`
		)
	return output
}

// TODO: Move elsewhere
export async function replaceAsync(str: string, regex: RegExp, asyncFn: Function): Promise<string> {
	let promises: Promise<string>[] = []
	// @ts-ignore
	str.replace(regex, (match, ...args) => {
		const promise = asyncFn(match, ...args)
		promises.push(promise)
	})
	let data = await Promise.all(promises)
	return str.replace(regex, () => data.shift() || "")
}
