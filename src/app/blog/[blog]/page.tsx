import { getBlogPosts } from "@/lib/mdx";
import { getBaseUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX, MDXComponents } from "../custom.mdx";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ blog: string }>;
}): Promise<Metadata | undefined> {
	const posts = await getBlogPosts();

	const urlParams = (await params).blog;
	const post = posts.find((p) => p.slug === urlParams);

	if (!post) {
		return;
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;

	return {
		title: `${title} - Naol.Builds`,
		description,
		openGraph: {
			title: `${title} - Naol.Builds`,
			description,
			publishedTime,
			type: "article",
			url: `${getBaseUrl()}/blog/${urlParams}`,
			...(image && {
				images: [
					{
						url: image,
					},
				],
			}),
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string; blog: string }>;
}) {
	const urlParams = (await params).blog;
	const posts = await getBlogPosts();

	const post = posts.find((p) => p.slug === urlParams);

	if (!post) {
		notFound();
	}
	return (
		<main className="mx-auto py-8 max-w-prose font-medium container">
			<MDXComponents.h1>{post.metadata.title}</MDXComponents.h1>
			<MDXComponents.p className="my-4">
				{post.metadata.publishedAt}
			</MDXComponents.p>
			<MDXComponents.p className="my-4">
				{post.metadata.summary}
			</MDXComponents.p>
			<CustomMDX source={post.content} />
		</main>
	);
}
