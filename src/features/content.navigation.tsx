"use client";

import { usePathname } from "next/navigation";
import Navbar from "./content.animation";

export function ContentNavigation() {
	const pathname = usePathname();
	const page = pathname.split("/").slice(0, 2).join("/");

	return (
		<div className="flex gap-4 font-bold">
			<Navbar page={page} />
		</div>
	);
}
