"use client";

import { type MotionProps, motion } from "framer-motion";
interface MotionDivWrapperProps extends MotionProps {
	className?: string;
}
export default function MotionDivWrapper(props: MotionDivWrapperProps) {
	return <motion.div {...props}>{props.children}</motion.div>;
}
