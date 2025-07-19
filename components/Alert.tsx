"use client"

import { FC, useEffect, useState } from "react"
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

type AlertVariant = "info" | "success" | "warning" | "error"

interface AlertProps {
  message: string
  variant?: AlertVariant
  duration?: number
  onClose?: () => void
}

const variantStyles: Record<
  AlertVariant,
  { icon: React.ReactElement; bg: string; ring: string; text: string }
> = {
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    bg: "bg-blue-100/60",
    ring: "ring-1 ring-blue-300/50",
    text: "text-blue-900",
  },
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    bg: "bg-green-100/60",
    ring: "ring-1 ring-green-300/50",
    text: "text-green-900",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    bg: "bg-yellow-100/60",
    ring: "ring-1 ring-yellow-300/50",
    text: "text-yellow-900",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    bg: "bg-red-100/60",
    ring: "ring-1 ring-red-300/50",
    text: "text-red-900",
  },
}

export const Alert: FC<AlertProps> = ({
  message,
  variant = "info",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  const { icon, bg, ring, text } = variantStyles[variant]

  return (
    <div className="fixed top-5 right-5 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={clsx(
              "flex items-start gap-4 max-w-sm w-full px-5 py-4 rounded-xl backdrop-blur-lg shadow-xl border bg-opacity-70",
              bg,
              ring,
              text
            )}
          >
            <div className="mt-1">{icon}</div>
            <div className="flex-1 text-sm font-medium">{message}</div>
            <button onClick={handleClose} className="mt-1">
              <X className="w-4 h-4 opacity-50 hover:opacity-100 transition" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
