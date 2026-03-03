import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false)

  // Reset flip state when card changes
  useEffect(() => {
    setFlipped(false)
  }, [card.id])

  const getDiffColor = (diff) => {
    if (diff === 'easy') return 'bg-green-50 border-green-200'
    if (diff === 'hard') return 'bg-red-50 border-red-200'
    return 'bg-yellow-50 border-yellow-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Difficulty Badge */}
      <div className="mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
          card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
          card.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {card.difficulty || 'Medium'}
        </span>
      </div>

      {/* Flashcard - Only shows QUESTION by default */}
      <motion.button
        onClick={() => setFlipped(!flipped)}
        className={`w-full h-96 rounded-lg shadow-lg p-8 cursor-pointer transition border-2 ${getDiffColor(card.difficulty)}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-4">
              {flipped ? 'ANSWER' : 'QUESTION'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-left">
              {flipped ? card.answer : card.question}
            </h2>
          </div>

          <div className="text-center text-gray-500 text-sm">
            Click to {flipped ? 'see question' : 'reveal answer'}
          </div>
        </div>
      </motion.button>

      {/* Explanation - ONLY shows when FLIPPED */}
      {flipped && card.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg p-4 border-l-4 border-blue-500 mt-4"
        >
          <p className="text-sm text-gray-700">
            <strong>Explanation:</strong> {card.explanation}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}