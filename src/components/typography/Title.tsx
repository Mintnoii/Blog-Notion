'use client'
import { motion } from 'framer-motion'

export const Title = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1, duration: 0.9 }}
      variants={{
        hidden: {
          opacity: 0.6,
          y: 5,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      className="font-bold mt-20 mb-10 text-4xl text-gray-800 dark:text-white xs:text-2xl"
    >
      {children}
    </motion.div>
  )
}

export default Title
