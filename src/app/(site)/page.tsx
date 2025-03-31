import MotionDivWrapper from "@/features/motion.div.wrapper";
import ProjectsSection from "@/features/projects.section";
import SkillsSection from "@/features/skills.section";

export default function LandingPage() {
	return (
		<MotionDivWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2 }}
			className="flex flex-col gap-10"
		>
			<div className="bg-gray-elevation-2">
				<div className="bg-[url(/background.png)] bg-repeat bg-center pt-6 pb-10">
					<SkillsSection />
				</div>
			</div>
			<ProjectsSection />
		</MotionDivWrapper>
	);
}
