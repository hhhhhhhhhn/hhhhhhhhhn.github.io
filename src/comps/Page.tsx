import {ComponentChildren} from "preact"

type props = {
	children: ComponentChildren,
	title?: string,
	description?: string,
	stylesheets?: string[],
}

export default function Page({children, title = "hhhhhhhhhn", description = title, stylesheets = []}: props) {
	return <html>
		<head>
			<meta charSet="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 style=%22background-color:white%22><text y=%221em%22 x=%220.3em%22 font-size=%2280%22 font-family=%22sans%22>  h</text></svg>"/>
			<meta name="description" content={description}/>
			<title>{title}</title>
			<link rel="stylesheet" href="./main.css"/>
			{stylesheets.map(x => <link rel="stylesheet" href={x}/>)}
		</head>
		<body>
			{children}
		</body>
	</html>
}
