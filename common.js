let fs = require("fs")

module.exports = {
	aberration: fs.readFileSync("chromatic_aberration.svg", "utf8")
}
