import { FigmaIcon, FlutterIcon, ToolsWrenchIcon } from "@/Icons";
import { Icon } from "@/primitives/icon";

export default function SkillsSection() {
	return (
		<section className="flex flex-col gap-6 container">
			<div className="flex gap-2">
				<h1 className="font-black text-gray-text-secondary text-2xl md:text-3xl lg:text-4xl uppercase">
					skills
				</h1>
				<ToolsWrenchIcon />
			</div>
			<Skills />
		</section>
	);
}

function Skills() {
	return (
		<div className="flex justify-center gap-40">
			<div className="flex flex-col gap-6">
				<div className="flex gap-2">
					<FlutterIcon />
					<div className="flex flex-col gap-6 pt-2.5">
						<h3 className="font-black text-xl md:text-2xl lg:text-3xl">
							Development
						</h3>
						<ul className="flex flex-col gap-4">
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>bloc</li>
							</div>
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>Api Integration</li>
							</div>
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>LocalStorage</li>
							</div>
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>hive</li>
							</div>
						</ul>
					</div>
				</div>
			</div>
			<div className="self-stretch bg-gray-elevation-4 w-4">{}</div>
			<div className="flex flex-col">
				<div className="flex gap-2">
					<FigmaIcon />
					<div className="flex flex-col gap-6 pt-2.5">
						<h3 className="font-black text-xl md:text-2xl lg:text-3xl">
							Design
						</h3>
						<ul className="flex flex-col gap-4">
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>UI/UX</li>
							</div>
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>Prototyping</li>
							</div>
							<div className="flex gap-2">
								<Icon
									name="Circle"
									className="stroke-[10] stroke-green rounded-full"
								/>
								<li>Animation</li>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
