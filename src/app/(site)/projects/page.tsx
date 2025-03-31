import MotionDivWrapper from "@/features/motion.div.wrapper";

export const metadata = {
	title: "Projects",
};

function ProjectsPage() {
	return (
		<MotionDivWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2 }}
			className="flex flex-col gap-10"
		>
			<div className="bg-gray-elevation-2 h-60">Projects</div>
		</MotionDivWrapper>
	);
}

export default ProjectsPage;
