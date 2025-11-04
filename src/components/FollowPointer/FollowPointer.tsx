import "./FollowPointer.css"
import { frame, motion, useSpring } from "framer-motion"
import { RefObject, useEffect, useRef, useState } from "react"

export default function FollowPointer() {
    const ref = useRef<HTMLDivElement>(null)
    const { x, y } = useFollowPointer(ref)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

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

    if (isTouchDevice) return null

    return <motion.div className="follow-pointer" ref={ref} style={{ x, y }} />
}

const spring = { damping: 10, stiffness: 70, restDelta: 0.001 }

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    useEffect(() => {
        if (!ref.current) return

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current!

            frame.read(() => {
                x.set(clientX + window.scrollX - element.offsetLeft - element.offsetWidth / 2)
                y.set(clientY + window.scrollY - element.offsetTop - element.offsetHeight / 2)
            })
        }

        window.addEventListener("pointermove", handlePointerMove)

        return () =>
            window.removeEventListener("pointermove", handlePointerMove)
    }, [])

    return { x, y }
}