import { useEffect, useState } from 'react'

const isLowEndRuntime = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const reducedMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const nav = window.navigator || {}
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection

  const saveData = Boolean(connection?.saveData)
  const effectiveType = connection?.effectiveType || ''
  const verySlowNetwork = ['slow-2g', '2g'].includes(effectiveType)

  const cores = Number(nav.hardwareConcurrency || 8)
  const memory = Number(nav.deviceMemory || 8)

  return reducedMotion || saveData || verySlowNetwork || cores <= 4 || memory <= 4
}

function useLowEndDevice() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(isLowEndRuntime)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const update = () => setIsLowEndDevice(isLowEndRuntime())
    update()

    const reducedMotionQuery = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null

    reducedMotionQuery?.addEventListener?.('change', update)

    const nav = window.navigator || {}
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection
    connection?.addEventListener?.('change', update)

    return () => {
      reducedMotionQuery?.removeEventListener?.('change', update)
      connection?.removeEventListener?.('change', update)
    }
  }, [])

  return isLowEndDevice
}

export default useLowEndDevice
