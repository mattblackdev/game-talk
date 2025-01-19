import { useGame } from 'ecctrl'
import { useState, useEffect } from 'react'
import { animationSet } from '../../coms/Knight'

export function useIsSwordDamaging() {
  const [isDamaging, setIsDamaging] = useState(false)

  useEffect(() => {
    let damageStart: NodeJS.Timeout
    let damageEnd: NodeJS.Timeout

    const activeDuration = 100
    const animationDelay = 700

    const unsub = useGame.subscribe(
      (s) => s.curAnimation,
      (curAnimation) => {
        if (curAnimation !== animationSet.action4) return

        clearTimeout(damageStart)

        damageStart = setTimeout(() => {
          setIsDamaging(true)

          damageEnd = setTimeout(() => {
            setIsDamaging(false)
          }, activeDuration)
        }, animationDelay)
      }
    )

    return () => {
      clearTimeout(damageStart)
      clearTimeout(damageEnd)
      unsub()
    }
  }, [setIsDamaging])

  return isDamaging
}
