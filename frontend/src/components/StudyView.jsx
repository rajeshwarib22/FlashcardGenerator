import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import Flashcard from './Flashcard'
import StudyStats from './StudyStats'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function StudyView({ documentId, onBack }) {
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, skipped: 0 })
  const [docInfo, setDocInfo] = useState(null)
  const [answeredCards, setAnsweredCards] = useState(new Set())
  const navigate = useNavigate()

  useEffect(() => {
    fetchCards()
    fetchInfo()
  }, [documentId])

  const fetchCards = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}api/documents/${documentId}/cards`
      )
      setCards(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(`${API_URL}api/documents/${documentId}`)
      setDocInfo(data)
    } catch (err) {
      console.error(err)
    }
  }

  const saveProgress = async (cardId, isCorrect) => {
    try {
      await axios.post(`${API_URL}api/progress`, {
        cardId,
        isCorrect,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const isCardAnswered = answeredCards.has(cards[index]?.id)

  const handleCorrect = () => {
    if (isCardAnswered) {
      nextCard()
      return
    }
    const cardId = cards[index].id
    saveProgress(cardId, true)
    const newAnswered = new Set(answeredCards)
    newAnswered.add(cardId)
    setAnsweredCards(newAnswered)
    setStats(s => ({ ...s, correct: s.correct + 1 }))
    nextCard()
  }

  const handleIncorrect = () => {
    if (isCardAnswered) {
      nextCard()
      return
    }
    const cardId = cards[index].id
    saveProgress(cardId, false)
    const newAnswered = new Set(answeredCards)
    newAnswered.add(cardId)
    setAnsweredCards(newAnswered)
    setStats(s => ({ ...s, incorrect: s.incorrect + 1 }))
    nextCard()
  }

  const handleSkip = () => {
    if (isCardAnswered) {
      nextCard()
      return
    }
    const cardId = cards[index].id
    const newAnswered = new Set(answeredCards)
    newAnswered.add(cardId)
    setAnsweredCards(newAnswered)
    setStats(s => ({ ...s, skipped: s.skipped + 1 }))
    nextCard()
  }

  const nextCard = () => {
    if (index < cards.length - 1) setIndex(index + 1)
  }

  const prevCard = () => {
    if (index > 0) setIndex(index - 1)
  }

  const totalAnswered = Math.min(stats.correct + stats.incorrect + stats.skipped, cards.length)
  const totalCards = cards.length
  const cappedAnswered = Math.min(totalAnswered, totalCards)
  const accuracy = totalCards > 0 ? Math.round((stats.correct / cappedAnswered) * 100) : 0
  const isComplete = index >= cards.length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="h-12 w-12 border-b-2 border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No flashcards found</p>
          <motion.button
            onClick={onBack}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <motion.button
                onClick={onBack}
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span>
                <span>Back</span>
              </motion.button>

              <motion.button
                onClick={() => navigate('/')}
                className="text-gray-600 font-semibold hover:text-gray-800 flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Go to Home"
              >
                <span>🏠</span>
                <span>Home</span>
              </motion.button>
            </div>

            <div className="text-center">
              <h2 className="font-semibold">{docInfo?.name}</h2>
              <p className="text-sm text-gray-600">
                Card {index + 1} of {cards.length}
              </p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!isComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <Flashcard card={cards[index]} />

                <motion.div
                  className="bg-white p-6 rounded-lg shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((index / cards.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(index / cards.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white p-4 rounded-lg shadow text-center text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Answered: {cappedAnswered} of {totalCards}
                </motion.div>

                {isCardAnswered && (
                  <motion.div
                    className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-center text-sm text-amber-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓ Card already answered. Click Next to continue.
                  </motion.div>
                )}

                <motion.div
                  className="bg-white p-6 rounded-lg shadow flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <button
                    onClick={prevCard}
                    disabled={index === 0}
                    className="flex-1 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleSkip}
                    disabled={isCardAnswered}
                    className="flex-1 py-2 border border-yellow-300 text-yellow-700 rounded hover:bg-yellow-50 transition disabled:opacity-50"
                  >
                    ⊘ Skip
                  </button>
                  <button
                    onClick={handleIncorrect}
                    disabled={isCardAnswered}
                    className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                  >
                    ✗ Wrong
                  </button>
                  <button
                    onClick={handleCorrect}
                    disabled={isCardAnswered}
                    className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                  >
                    ✓ Right
                  </button>
                  <button
                    onClick={nextCard}
                    disabled={index === cards.length - 1}
                    className="flex-1 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    Next →
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-12 rounded-lg shadow text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-2">Complete!</h2>
                <p className="text-gray-600 mb-8">All flashcards studied</p>
                
                <motion.div
                  className="mb-8 space-y-2 text-left max-w-md mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-gray-700"><strong>Total Cards:</strong> {totalCards}</p>
                  <p className="text-green-600"><strong>Correct:</strong> {stats.correct}</p>
                  <p className="text-red-600"><strong>Incorrect:</strong> {stats.incorrect}</p>
                  <p className="text-yellow-600"><strong>Skipped:</strong> {stats.skipped}</p>
                  <p className="text-blue-600"><strong>Accuracy:</strong> {accuracy}%</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => {
                      setIndex(0)
                      setStats({ correct: 0, incorrect: 0, skipped: 0 })
                      setAnsweredCards(new Set())
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Study Again
                  </motion.button>
                  <motion.button
                    onClick={onBack}
                    className="flex-1 bg-gray-200 py-3 rounded hover:bg-gray-300 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go Back
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go Home
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <StudyStats stats={stats} total={totalCards} answered={cappedAnswered} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}