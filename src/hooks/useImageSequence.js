import { useEffect, useRef, useState } from 'react'

/**
 * Preloads a numbered image sequence and returns a drawFrame() function
 * for rendering any frame onto a canvas with object-fit:cover behaviour.
 *
 * Frame URLs are built as: `${basePath}${zeroPadded(index)}.${ext}`
 */
export function useImageSequence({ basePath, ext = 'png', total, digits = 5 }) {
  const imgs    = useRef([])
  const [loaded, setLoaded]  = useState(0)
  const [ready,  setReady]   = useState(false)

  useEffect(() => {
    imgs.current = new Array(total)
    let done = 0

    for (let i = 0; i < total; i++) {
      const img = new Image()
      img.src   = `${basePath}${String(i).padStart(digits, '0')}.${ext}`
      img.onload = img.onerror = () => {
        imgs.current[i] = img
        done++
        setLoaded(done)
        if (done === total) setReady(true)
      }
    }
  }, [basePath, ext, total, digits])

  function drawFrame(ctx, frameIndex, cw, ch) {
    const img = imgs.current[frameIndex]
    if (!img || !img.naturalWidth) return
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const dw = img.naturalWidth  * scale
    const dh = img.naturalHeight * scale
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }

  return { drawFrame, loaded, ready, total }
}
