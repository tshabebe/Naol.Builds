import { GlobeIcon } from "@/Icons";
import Image from "next/image";

export default function WhereSection() {
	return (
		<section className="flex flex-col gap-6 container">
			<div className="flex gap-2">
				<h1 className="font-black text-gray-text-secondary text-2xl md:text-3xl lg:text-4xl uppercase">
					where
				</h1>
				<GlobeIcon />
			</div>
			<div className="relative h-80">
				<Image
					src="/location.png"
					alt={"Naol: mobile dev based in ethiopia"}
					fill
					className="rounded-4xl object-cover"
				/>
			</div>
		</section>
	);
}
