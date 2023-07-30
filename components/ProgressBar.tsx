'use client'

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => prevProgress >= 100 ? 0 : prevProgress + 0.1)
    }, 10)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <Progress value={progress} className={"fixed top-0 left-0 w-full h-1"} />
}

export default ProgressBar
