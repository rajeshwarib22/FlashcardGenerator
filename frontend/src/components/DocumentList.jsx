import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

export default function DocumentList({ docs, onSelect }) {
  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {docs.map((doc) => (
        <motion.button
          key={doc.id}
          onClick={() => onSelect(doc.id)}
          className="w-full text-left bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 transition"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            backgroundColor: '#dbeafe',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="font-semibold text-gray-900">{doc.name}</h3>
          <p className="text-sm text-gray-600 mt-1">📇 {doc.cardCount} cards</p>
        </motion.button>
      ))}
    </motion.div>
  )
}