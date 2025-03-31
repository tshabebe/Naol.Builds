import { CarpenterIcon, RuminateProjectSvg } from "@/Icons";
import Button from "@/primitives/button";
import { Icon } from "@/primitives/icon";

function ProjectsSection() {
	return (
		<section className="flex flex-col gap-5 container">
			<div className="flex gap-2">
				<h1 className="font-black text-gray-text-secondary text-2xl md:text-3xl lg:text-4xl uppercase">
					Projects
				</h1>
				<CarpenterIcon />
			</div>
			<div className="flex gap-6 overflow-x-auto scroll-m-4">
				<Projects />
				<Projects />
				<Projects />
			</div>
		</section>
	);
}

export default ProjectsSection;

function Projects() {
	return (
		<div className="flex gap-10 bg-[url(/background.png)] bg-repeat bg-center p-6 pt-14 border-4 rounded-3xl">
			<ProjectsDescription />
			<RuminateProjectSvg />
		</div>
	);
}

function ProjectsDescription() {
	return (
		<div className="flex flex-col gap-14">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg md:text-xl lg:text-2xl whitespace-nowrap">
						Ruminate Journal
					</h3>
					<p className="max-w-[30ch] text-gray-text-secondary">
						Ruminate is a minimalist journaling app that lets you capture your
						memories in imeline-based format.
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<h4 className="font-bold text-gray-text-secondary md:text-1xl text-lg lg:text-2xl">
						Technologies
					</h4>
					<div className="flex gap-2">
						<span className="flex justify-center items-center bg-green-elevation-3 px-1.5 py-0.5 border border-green-border rounded-md font-bold text-green-text-primary text-xs">
							flutter
						</span>
						<span className="flex justify-center items-center bg-green-elevation-3 px-1.5 py-0.5 border border-green-border rounded-md font-bold text-green-text-primary text-xs">
							firebase
						</span>
						<span className="flex justify-center items-center bg-green-elevation-3 px-1.5 py-0.5 border border-green-border rounded-md font-bold text-green-text-primary text-xs">
							Blog
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Button
					className={
						"flex items-center justify-center rounded-full px-4 py-2 bg-green text-background"
					}
				>
					Download
				</Button>
				<Icon name="Github" />
			</div>
		</div>
	);
}
