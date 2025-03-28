"use client";
import { paths } from "@/config/paths";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export const navigationItems = [
	{
		name: "Home",
		href: paths.home.getHref(),
	},
	{
		name: "Blog",
		href: paths.app.blogs.getHref(),
	},
	{
		name: "Project",
		href: paths.app.projects.getHref(),
	},
	{
		name: "BucketList",
		href: paths.app.bucketList.getHref(),
	},
];

export default function Navbar({ page }: { page: string }) {
	return (
		<>
			<div className="hidden sm:flex justify-center col-span-2 mt-0.5 h-14">
				<ul className="hidden sm:flex justify-center items-center bg-gray-elevation-2/50 px-2 py-1 rounded-full text-green-text-primary-hover">
					{navigationItems.map((item) => {
						const isSelected = page === item.href;
						return (
							<motion.li key={item.name} className="relative">
								{isSelected && (
									<>
										<motion.div
											className="left-1/4 absolute shadow-[0_20px_100px_8px_#6BF599] mx-auto border-green border-t-[3px] rounded-full w-1/2"
											layoutId="selected"
										/>
										<motion.div
											className="top-0.5 bottom-0.5 absolute bg-gray-elevation-3/0 rounded-full w-full"
											layoutId="selected-div"
										/>
									</>
								)}
								<Link href={item.href}>
									<motion.div
										className={cn(
											`px-4 hover:text-green-text-primary-hover py-3 rounded-full ${item.name !== "Home" && item.name !== "Blog" && item.name !== "About" ? "tracking-tight" : "tracking-widest"} font-bold text-sm text-gray-text-primary`,
											isSelected &&
												"text-green-text-primary-hover border bg-green-elevation-1",
										)}
									>
										{item.name}
									</motion.div>
								</Link>
							</motion.li>
						);
					})}
				</ul>
			</div>
		</>
	);
}
