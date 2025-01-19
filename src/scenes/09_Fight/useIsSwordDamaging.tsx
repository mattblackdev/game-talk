import { useGame } from 'ecctrl'
import { useState, useEffect } from 'react'
import { animationSet } from '../../coms/Knight'

export function useIsSwordDamaging() {
  const [isDamaging, setIsDamaging] = useState(false)

  useEffect(() => {
    let damageStartTimeout: NodeJS.Timeout
    let damageEndTimeout: NodeJS.Timeout

    const activeDuration = 100
    const animationDelay = 700

    const unsub = useGame.subscribe(
      (s) => s.curAnimation,
      (curAnimation) => {
        if (curAnimation !== animationSet.action4) return

        clearTimeout(damageStartTimeout)

        damageStartTimeout = setTimeout(() => {
          setIsDamaging(true)

          damageEndTimeout = setTimeout(() => {
            setIsDamaging(false)
          }, activeDuration)
        }, animationDelay)
      }
    )

    return () => {
      clearTimeout(damageStartTimeout)
      clearTimeout(damageEndTimeout)
      unsub()
    }
  }, [setIsDamaging])

  return isDamaging
}
