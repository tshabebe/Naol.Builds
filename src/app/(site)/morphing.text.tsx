"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const morphTime = 0.6;
const coolDownTime = 3.5;

const useMorphingText = (texts: string[]) => {
	const textIndexRef = useRef(0);
	const morphRef = useRef(0);
	const coolDownRef = useRef(0);
	const timeRef = useRef(new Date());

	const text1Ref = useRef<HTMLSpanElement>(null);
	const text2Ref = useRef<HTMLSpanElement>(null);

	const setStyles = useCallback(
		(fraction: number) => {
			const [current1, current2] = [text1Ref.current, text2Ref.current];
			if (!current1 || !current2) return;

			current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
			current2.style.opacity = `${fraction ** 0.4 * 100}%`;

			const invertedFraction = 1 - fraction;
			current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
			current1.style.opacity = `${invertedFraction ** 0.4 * 100}%`;

			current1.textContent = texts[
				textIndexRef.current % texts.length
			] as string;
			current2.textContent = texts[
				(textIndexRef.current + 1) % texts.length
			] as string;
		},
		[texts],
	);

	const doMorph = useCallback(() => {
		morphRef.current -= coolDownRef.current;
		coolDownRef.current = 0;

		let fraction = morphRef.current / morphTime;

		if (fraction > 1) {
			coolDownRef.current = coolDownTime;
			fraction = 1;
		}

		setStyles(fraction);

		if (fraction === 1) {
			textIndexRef.current++;
		}
	}, [setStyles]);

	const doCoolDown = useCallback(() => {
		morphRef.current = 0;
		const [current1, current2] = [text1Ref.current, text2Ref.current];
		if (current1 && current2) {
			current2.style.filter = "none";
			current2.style.opacity = "100%";
			current1.style.filter = "none";
			current1.style.opacity = "0%";
		}
	}, []);

	useEffect(() => {
		let animationFrameId: number;

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);

			const newTime = new Date();
			const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
			timeRef.current = newTime;

			coolDownRef.current -= dt;

			if (coolDownRef.current <= 0) doMorph();
			else doCoolDown();
		};

		animate();
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [doMorph, doCoolDown]);

	return { text1Ref, text2Ref };
};

interface MorphingTextProps {
	className?: string;
	texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
	const { text1Ref, text2Ref } = useMorphingText(texts);
	return (
		<>
			<span
				className="inline-block top-0 absolute inset-x-0 m-auto w-full"
				ref={text1Ref}
			/>
			<span
				className="inline-block top-0 absolute inset-x-0 m-auto w-full"
				ref={text2Ref}
			/>
		</>
	);
};

const SvgFilters: React.FC = () => (
	<svg
		id="filters"
		className="fixed w-0 h-0"
		preserveAspectRatio="xMidYMid slice"
	>
		<title>filters</title>
		<defs>
			<filter id="threshold">
				<feColorMatrix
					in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
				/>
			</filter>
		</defs>
	</svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
	texts,
	className,
}) => (
	<div
		className={cn(
			"relative h-14 [filter:url(#threshold)_blur(0.6px)]",
			className,
		)}
	>
		<Texts texts={texts} />
		<SvgFilters />
	</div>
);
