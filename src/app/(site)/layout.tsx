import HeroSection from "@/features/hero.section";
import type { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-[url(/background.png)] bg-repeat bg-center">
			<header className="container">
				<div>{}</div>
			</header>
			<HeroSection />
			{children}
		</div>
	);
}

export default layout;
