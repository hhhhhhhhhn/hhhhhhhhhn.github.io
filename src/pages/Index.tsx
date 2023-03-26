import Page from "../comps/Page"

export default function Index() {
	return <Page
			title="hhhhhhhhhn"
			description="Jose Ugarte, fullstack developer - Personal website / Javascriptless hut"
			stylesheets={["./index.css"]}
		>
			<div id="main-container">
				<div id="main">
					<div id="github-container">
						<a id="github" href="https://github.com/hhhhhhhhhn">github</a>
					</div>
					<h1>hhhhhhhhhn</h1>
					<a id="projects" href="./projects">projects</a>
				</div>
			</div>
			<div id="bottom-corner">
				<a href="mailto:hhhhhhhhhn@protonmail.com">contact</a>
				<a>•</a>
				<a href="./writings" id="writings-link">
			  writings
			  <div id="invert-circle"></div>
			</a>
			</div>
			<img src="http://analytics-hhhhhhhhhn-com.up.railway.app/landing/unknown/image.svg"
				 srcset="http://analytics-hhhhhhhhhn-com.up.railway.app/landing/desktop/image.svg 1w, https://analytics-hhhhhhhhhn-com.up.railway.app/landing/mobile/image.svg 2w"
				 sizes="(orientation: portrait) 2px, 1px"
				 style="display: fixed; width: 0; height: 0;"/>
	</Page>
}
