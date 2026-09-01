import "./FollowPointer.css"
import { frame, motion, useReducedMotion, useSpring } from "framer-motion"
import { RefObject, useEffect, useRef, useState } from "react"

export default function FollowPointer() {
    const ref = useRef<HTMLDivElement>(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const isDisabled = isTouchDevice || Boolean(shouldReduceMotion)
    const { x, y } = useFollowPointer(ref, isDisabled)

    useEffect(() => {
        const checkTouchDevice = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.innerWidth <= 1024
            )
        }

        setIsTouchDevice(checkTouchDevice())

        const handleResize = () => {
            setIsTouchDevice(checkTouchDevice())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (isDisabled) return null

    return <motion.div className="follow-pointer" ref={ref} style={{ x, y }} aria-hidden="true" />
}

const spring = { damping: 10, stiffness: 70, restDelta: 0.001 }

function useFollowPointer(ref: RefObject<HTMLDivElement | null>, disabled = false) {
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    useEffect(() => {
        if (disabled || !ref.current) return

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current
            if (!element) return

            frame.read(() => {
                x.set(clientX + window.scrollX - element.offsetLeft - element.offsetWidth / 2)
                y.set(clientY + window.scrollY - element.offsetTop - element.offsetHeight / 2)
            })
        }

        window.addEventListener("pointermove", handlePointerMove)

        return () =>
            window.removeEventListener("pointermove", handlePointerMove)
    }, [disabled, ref, x, y])

    return { x, y }
}
