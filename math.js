let MathJax = require("mathjax").init({
	loader: {
		load: ["input/asciimath", "output/svg", "output/chtml"]
	},
})


async function renderAsciimath(input) {
	let mj = await MathJax
	const adaptor = mj.startup.adaptor

	let node = await mj.asciimath2svg(input).children[0]
	return adaptor.outerHTML(node)
}

async function mathPreprocess(input) {
	let output = await replaceAsync(input, /\n```math\n([\S\s]*?)```/g, 
		async (_, math) =>
			`<div class="math-block">
				${await renderAsciimath(math)}
			</div>`
		)
	output = await replaceAsync(output, /`math ([\S\s]*?)`/g, 
		async (_, math) => `<span class="math-inline"> ${await renderAsciimath(math)} </span>`
		)
	return output
}

async function replaceAsync(str, regex, asyncFn) {
	const promises = []
	str.replace(regex, (match, ...args) => {
		const promise = asyncFn(match, ...args)
		promises.push(promise)
	})
	const data = await Promise.all(promises)
	return str.replace(regex, () => data.shift())
}

module.exports = {
	renderAsciimath,
	mathPreprocess,
	replaceAsync,
}
