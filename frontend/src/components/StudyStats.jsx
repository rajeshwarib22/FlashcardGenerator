import { motion } from 'framer-motion'

export default function StudyStats({ stats, total, answered }) {
  // Cap accuracy at 100%
  const safeAnswered = Math.min(answered, total)
  const percent = safeAnswered > 0 
    ? Math.round((stats.correct / safeAnswered) * 100) 
    : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 space-y-4"
    >
      {/* Accuracy */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 text-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-3xl font-bold text-green-600">{percent}%</div>
        <div className="text-sm text-gray-600">Accuracy</div>
      </motion.div>

      {/* Correct */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-sm text-gray-600">Correct</div>
        <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
      </motion.div>

      {/* Incorrect */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-sm text-gray-600">Incorrect</div>
        <div className="text-2xl font-bold text-red-600">{stats.incorrect}</div>
      </motion.div>

      {/* Skipped */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-sm text-gray-600">Skipped</div>
        <div className="text-2xl font-bold text-yellow-600">{stats.skipped}</div>
      </motion.div>

      {/* Total Cards */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-sm text-gray-600">Total Cards</div>
        <div className="text-2xl font-bold text-blue-600">{total}</div>
      </motion.div>

      {/* Answered Progress */}
      <motion.div
        className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-sm text-gray-600 mb-2">Progress</div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-indigo-600">{answered}/{total}</span>
          <span className="text-xs text-gray-500">{Math.round((answered / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <motion.div
            className="bg-indigo-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(answered / total) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}