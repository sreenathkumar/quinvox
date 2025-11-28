import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Avoid SSR issues
    if (typeof window === "undefined") return

    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const update = (e?: MediaQueryListEvent) => {
      setIsMobile(e ? e.matches : mq.matches)
    }

    // Set initial value
    update()

    // Listen for changes
    mq.addEventListener("change", update)

    // Cleanup
    return () => mq.removeEventListener("change", update)
  }, [])

  return isMobile
}
