import {
	InstagramIcon,
	LinkedInIcon,
	TelegramIcon,
	ToolsUsedCircleIcon,
	TwitterIcon,
} from "@/Icons";
import { checkLoggedIn } from "@/auth/auth";
import { paths } from "@/config/paths";
import Button from "@/primitives/button";
import { Icon } from "@/primitives/icon";
import Image from "next/image";
import { redirect } from "next/navigation";

async function LandingPage() {
	const isLoggedIn = await checkLoggedIn();
	if (isLoggedIn) {
		redirect(paths.app.dashboard.getHref());
	}
	return (
		<main className="flex w-full container">
			<HeroText />
			<div className="py-14">
				<ToolsUsedCircleIcon />
			</div>
		</main>
	);
}

export default LandingPage;

function HeroText() {
	return (
		<div className="flex flex-col gap-6 py-14 pl-36">
			<h1 className="flex flex-col font-bold text-4xl md:text-5xl lg:text-6xl text-left">
				<span className="flex items-center gap-2">
					<span>HI👋, I’m </span>
					<AvatarImage />
					<span className="font-black text-gray-text-primary-hover">Naol</span>
				</span>
				<span className="font-black text-green-text-primary">Mobile Dev</span>{" "}
				<span>
					from{" "}
					<span className="font-black text-gray-text-primary-hover">
						Ethiopia
					</span>
				</span>
			</h1>
			<div className="flex flex-col gap-4">
				<p className="max-w-[48ch]">
					I’m <span className="font-bold text-green-text-primary">Flutter</span>{" "}
					developer and big{" "}
					<span className="font-bold text-green-text-primary">UI/UX</span>{" "}
					enthusiastic I think apps should tell a story like a painting. People
					deserve great experiences, so I make awesome apps for awesome people.
				</p>
				<p className="max-w-[48ch]">
					My dream?{" "}
					<span className="font-bold text-green-text-primary">Design</span>,{" "}
					<span className="font-bold text-green-text-primary">Build</span>,{" "}
					<span className="font-bold text-green-text-primary">Make</span>, say
					something that can change our stories for the better.
				</p>
			</div>
			<HeroButtons />
		</div>
	);
}

function HeroButtons() {
	return (
		<div className="flex flex-col gap-4 py-4">
			<SocialMediaLinks />
			<ContentNavigation />
		</div>
	);
}

function ContentNavigation() {
	return (
		<div className="flex gap-4 font-bold">
			<span className="text-gray-text-secondary">Projects</span>
			<span className="text-gray-text-secondary">Blog</span>
			<span>BucketList</span>
		</div>
	);
}

function SocialMediaLinks() {
	return (
		<div className="flex gap-3">
			<Button
				className={
					"px-6 py-1.5 gap-2 bg-green rounded-full text-gray-elevation-2 flex items-center justify-center font-bold"
				}
			>
				<span>Leave message</span> <Icon name="Send" />
			</Button>
			<Button
				className={
					"rounded-lg flex items-center justify-center px-2 py-1.5 border-2 hover:text-green-text-primary hover:border-green-elevation-2-border hover:bg-green-elevation-2"
				}
			>
				<TelegramIcon />
			</Button>
			<Button
				className={
					"rounded-lg flex items-center justify-center px-2 py-1.5 border-2 hover:text-green-text-primary hover:border-green-elevation-2-border hover:bg-green-elevation-2"
				}
			>
				<TwitterIcon />
			</Button>
			<Button
				className={
					"rounded-lg flex items-center justify-center px-2 py-1.5 border-2 hover:text-green-text-primary hover:border-green-elevation-2-border hover:bg-green-elevation-2"
				}
			>
				<InstagramIcon />
			</Button>
			<Button
				className={
					"rounded-lg flex items-center justify-center px-2 py-1.5 border-2 hover:text-green-text-primary hover:border-green-elevation-2-border hover:bg-green-elevation-2"
				}
			>
				<LinkedInIcon />
			</Button>
		</div>
	);
}

function AvatarImage() {
	return (
		<div>
			<Image
				src="/naol.png"
				alt={"Naol: mobile dev based in ethiopia"}
				width={40}
				height={40}
				className="rounded-md"
			/>
		</div>
	);
}
