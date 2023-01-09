'use client'
import { motion } from 'framer-motion'
export const MotionDiv = ({
  children,
  delay = 0.2,
  duration = 1
}: {
  children: React.ReactNode,
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ delay, duration }}
      variants={{
        hidden: {
          opacity: 0,
          y: 100,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      className="font-serif text-sm text-neutral-800 dark:text-gray-300"
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv
