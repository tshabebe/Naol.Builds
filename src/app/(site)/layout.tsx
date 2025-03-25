import type { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<header className="container">
				<div>{}</div>
			</header>
			{children}
		</div>
	);
}

export default layout;
