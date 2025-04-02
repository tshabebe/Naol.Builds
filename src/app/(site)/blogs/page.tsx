import { getBlogPosts } from "@/lib/mdx";
import Button from "@/primitives/button";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPage() {
	const posts = await getBlogPosts();

	// TODO: once we have more than one post, we can use this to show the latest post
	const latestPost = posts[0];

	if (!latestPost) {
		notFound();
	}

	return (
		<main className="py-12 md:py-16 lg:py-24">
			<h1 className="mb-8 lg:mb-12 font-medium text-3xl md:text-4xl">
				Latest post
			</h1>
			<h3 className="inline-block mb-4 font-medium text-xl md:text-2xl">
				{latestPost.metadata.title}
			</h3>
			<span>{latestPost.metadata.role}</span>
			<div className="relative w-10 h-10">
				<Image
					src={latestPost.metadata.image}
					fill
					objectFit="cover"
					alt="nice Image"
					className="rounded-md"
				/>
			</div>
			<div key={latestPost.slug}>
				<p className="mb-4 text-foreground-muted text-sm">
					{latestPost.metadata.publishedAt}
				</p>
				<p className="max-w-prose text-foreground-muted text-sm md:text-base text-balance leading-relaxed">
					{latestPost.metadata.summary}
				</p>
				<Button>
					<a href={`/blog/${latestPost.slug}`}>
						Read post <MoveRightIcon size={16} strokeWidth={3} />
					</a>
				</Button>
			</div>
			<h2 className="pt-12 md:pt-16 lg:pt-24 font-medium text-2xl md:text-3xl">
				More posts
			</h2>
			<p className="mt-6 md:mt-12 lg:mt-16 text-foreground-muted text-left md:text-center text-balance">
				🤪 Waiting on the Noodle team (Ahmed) to write more...
			</p>
		</main>
	);
}
