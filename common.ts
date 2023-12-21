let fs = require("fs")

let ANALYTICS = "analytics-hhhhhhhhhn-com.up.railway.app"

const data = {
	aberration: fs.readFileSync("chromatic_aberration.svg", "utf8"),
	regex: (str: string) => new RegExp(str, "g"),
	analytics: (page: string) => `
<img src="http://${ANALYTICS}/${page}/unknown/image.svg"
     srcset="http://${ANALYTICS}/${page}/desktop/image.svg 1w, http://${ANALYTICS}/${page}/mobile/image.svg 2w"
     sizes="(orientation: portrait) 2px, 1px"
     style="display: fixed; width: 0; height: 0;">`,
	analyticsEnd: (page: string) => `
<img src="http://${ANALYTICS}/${page}-end/unknown/image.svg"
     srcset="http://${ANALYTICS}/${page}-end/desktop/image.svg 1w, http://${ANALYTICS}/${page}-end/mobile/image.svg 2w"
     sizes="(orientation: portrait) 2px, 1px"
     style="width: 1px; height: 1px; margin: 0"
     loading="lazy">
`
}

export default data;
