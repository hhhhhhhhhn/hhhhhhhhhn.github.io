const { spawn } = require("child_process")
const { replaceAsync } = require("./math")

async function execAsync(command, stdin) {
	let process = spawn(command, {shell: true})
	process.stdin.setDefaultEncoding("utf8")
	process.stdin.write(stdin)
	process.stdin.end()
	let output = ""
	process.stdout.on("data", (data) => {
		output += data.toString()
	})
	return new Promise((resolve, _reject) => {
		process.on("close", () => {
			resolve(output)
		})
	})
}

async function shellPreprocess(input) {
	let output = await replaceAsync(
		input,
		/\n!!!(.*?)\n([\s\S]*?)\n!!!(.*)\n/g,
		async (_, command, stdin, format) => {
			let output = await execAsync(command, stdin)
			return "\n" + format.replace("{}", output) + "\n"
		})
	return output
}

module.exports = {
	shellPreprocess
}

//let test = `# This is a test
//
//!!!tr '"' "'" | cat
//These are some "quotes"
//!!!<p>{}</p>
//`
//
//async function main() {
//	console.log(await preprocessShell(test))
//}

