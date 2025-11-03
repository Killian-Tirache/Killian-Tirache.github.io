import { motion, TargetAndTransition, Transition, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeInWhenVisible({ children, className, initial, animate, transition }: { children: React.ReactNode, className?: string, initial?: TargetAndTransition, animate?: TargetAndTransition, transition?: Transition }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={initial ? initial : { opacity: 0, y: 40 }}
            animate={animate ? animate : isInView ? { opacity: 1, y: 0 } : {}}
            transition={transition ? transition : { duration: 0.5, ease: "easeOut" }}
            className={className ? className : ""}
        >
            {children}
        </motion.div>
    );
};