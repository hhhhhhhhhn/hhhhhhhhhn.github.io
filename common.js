let fs = require("fs")

module.exports = {
	aberration: fs.readFileSync("chromatic_aberration.svg", "utf8"),
	regex: (str) => new RegExp(str, "g")
}
