'use client'
import { motion } from 'framer-motion'

export const Description = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2, duration: 0.8 }}
      variants={{
        hidden: {
          opacity: 0.6,
          y: 10,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      className="font-serif text-sm mb-8 text-neutral-800 dark:text-gray-300"
    >
      {children}
    </motion.div>
  )
}

export default Description
