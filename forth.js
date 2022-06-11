function forth(hljs) {
	return {
		name: "forth",
		case_insensitive: true,
		aliases: ["forth", "fth"],
		keywords: ": ; swap dup over rot -rot nip include",
		contains: [
			hljs.COMMENT(
				"\\(", // begin
				"\\)", // end
			),
			hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null }),
			{
				scope: "number",
				variants: [
					{match: /[-+]?[0-9]+/}
				]
			}
		]
	}
}

module.exports = forth
