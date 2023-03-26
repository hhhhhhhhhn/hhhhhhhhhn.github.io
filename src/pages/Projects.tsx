import Page from "../comps/Page"

export default function Projects({tag = "all"}) {
	return <Page title={tag == "all" ? "Projects" : tag} stylesheets={["./projects.css"]}>
		<div id="projects">
			{
				tag == "all"
				? <h1>Projects <a href="./tags.html">(By technology)</a></h1>
				: <h1>Projects with {tag}</h1>
			}
		</div>

		<div id="cube-container">
			<div id="cube">
				<div id="cube-face-container">
					<div class="cube-face" id="front"></div>
					<div class="cube-face" id="back"></div>
					<div class="cube-face" id="right"></div>
					<div class="cube-face" id="left"></div>
					<div class="cube-face" id="top"></div>
					<div class="cube-face" id="bottom"></div>
				</div>
			</div>
		</div>
	</Page>
}
