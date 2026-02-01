import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import fallbackLogo from "./assets/react.svg"

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [logoSrc, setLogoSrc] = useState("/LOGO.png")

  useEffect(() => {
    // Show loader only once per tab/session
    const alreadyShown = sessionStorage.getItem("portfolio_loader_shown")
    const MIN_MS = 850
    const start = performance.now()

    function done() {
      const elapsed = performance.now() - start
      const remaining = Math.max(0, MIN_MS - elapsed)
      window.setTimeout(() => {
        setShowLoader(false)
        sessionStorage.setItem("portfolio_loader_shown", "1")
      }, remaining)
    }

    if (alreadyShown) {
      setShowLoader(false)
      return
    }

    if (document.readyState === "complete") {
      done()
      return
    }

    window.addEventListener("load", done, { once: true })
    return () => window.removeEventListener("load", done)
  }, [])

  return (
    <>
      {showLoader ? (
        <div className="loaderOverlay" aria-label="Loading">
          <div className="loaderCard">
            <div className="loaderLogoWrap">
              <img
                className="loaderLogo"
                src={logoSrc}
                alt="Omer Tech Dude"
                onError={() => setLogoSrc(fallbackLogo)}
              />
            </div>

            <div className="loaderText">
              <div className="loaderTitle">OMER TECH DUDE</div>
              <div className="loaderSub">Loading portfolio…</div>
            </div>

            <div className="loaderBar">
              <span />
            </div>
          </div>
        </div>
      ) : null}

      <Outlet />
    </>
  )
}
