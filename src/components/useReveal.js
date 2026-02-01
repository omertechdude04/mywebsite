import { useEffect, useRef, useState } from "react"

export default function useReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, isVisible }
}
