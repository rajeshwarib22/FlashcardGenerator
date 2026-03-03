import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

const dodoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.8, delay: 0.2 }
  },
}

export default function Landing() {
  const navigate = useNavigate()
  const [showGuide, setShowGuide] = useState(false)

  const guideSteps = [
    {
      step: 1,
      title: 'Upload Your PDF',
      description: 'Select any PDF file from your device. No size limits, no sign-up required.',
      icon: '📄',
      color: 'from-blue-400 to-blue-600',
    },
    {
      step: 2,
      title: 'AI Generates Cards',
      description: 'Our AI analyzes your PDF and automatically creates relevant flashcards with questions, answers, and explanations.',
      icon: '⚡',
      color: 'from-purple-400 to-purple-600',
    },
    {
      step: 3,
      title: 'Study & Learn',
      description: 'Flip through cards, track your progress, and see your accuracy in real-time with detailed statistics.',
      icon: '🎯',
      color: 'from-green-400 to-green-600',
    },
    {
      step: 4,
      title: 'Master the Topic',
      description: 'Review your answers, skip difficult questions, and study again until you achieve 100% accuracy.',
      icon: '🏆',
      color: 'from-yellow-400 to-yellow-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 overflow-hidden">
      <motion.div
        className="fixed top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={floatingVariants.float}
      />
      <motion.div
        className="fixed -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      />

      <div className="min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          className="text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-8 inline-block"
            variants={itemVariants}
            animate={pulseVariants.pulse}
          >
            <div className="text-7xl">📚</div>
          </motion.div>

          {/* DODO STICKER ADDED HERE */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
              variants={itemVariants}
            >
              DummyDodo
            </motion.h1>
            
            <motion.div
              variants={dodoVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 md:w-28 md:h-28"
            >
              <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-lg">
                {/* Body */}
                <ellipse cx="100" cy="130" rx="45" ry="55" fill="#8B7355" />
                
                {/* Head */}
                <circle cx="100" cy="60" r="35" fill="#A0826D" />
                
                {/* Eye */}
                <circle cx="110" cy="55" r="6" fill="black" />
                <circle cx="112" cy="53" r="2" fill="white" />
                
                {/* Beak */}
                <path d="M 125 60 Q 145 58 150 65 Q 145 68 125 65 Z" fill="#D4A574" />
                
                {/* Legs */}
                <line x1="85" y1="180" x2="85" y2="220" stroke="#5D4E37" strokeWidth="5" strokeLinecap="round" />
                <line x1="115" y1="180" x2="115" y2="220" stroke="#5D4E37" strokeWidth="5" strokeLinecap="round" />
                
                {/* Feet */}
                <ellipse cx="85" cy="225" rx="8" ry="6" fill="#5D4E37" />
                <ellipse cx="115" cy="225" rx="8" ry="6" fill="#5D4E37" />
                
                {/* Wing detail */}
                <path d="M 60 120 Q 55 140 60 160" stroke="#9B8B7E" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          <motion.p
            className="text-xl md:text-2xl text-blue-100 mb-8 drop-shadow-md max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Transform your PDFs into interactive study cards powered by AI
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            <motion.div
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-semibold mb-2">AI Powered</h3>
              <p className="text-blue-100 text-sm">Intelligent flashcard generation from any PDF</p>
            </motion.div>

            <motion.div
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">Track Progress</h3>
              <p className="text-blue-100 text-sm">Monitor your learning with detailed statistics</p>
            </motion.div>

            <motion.div
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-white font-semibold mb-2">Fast & Free</h3>
              <p className="text-blue-100 text-sm">No sign up required, instant results</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.button
              onClick={() => navigate('/app')}
              className="bg-white text-blue-600 font-bold py-4 px-10 rounded-lg text-lg shadow-2xl"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Get Started →
            </motion.button>

            <motion.button
              onClick={() => setShowGuide(!showGuide)}
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-lg text-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {showGuide ? '↑ Hide Guide' : '↓ How It Works'}
            </motion.button>
          </motion.div>

          <motion.p
            className="text-blue-100 text-sm"
            variants={itemVariants}
          >
            &copy; 2026 DummyDodo
          </motion.p>
        </motion.div>
      </div>

      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 px-4 py-16 bg-gradient-to-b from-transparent to-blue-900"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
            >
              How It Works 📖
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {guideSteps.map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-8 text-white shadow-2xl relative overflow-hidden`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, translateY: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 right-0 opacity-10">
                    <div className="text-9xl">{item.icon}</div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="text-5xl mr-4">{item.icon}</div>
                      <div className="text-5xl font-bold opacity-20">0{item.step}</div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-lg opacity-90">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 border border-white border-opacity-20 mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Use FlashCard Generator?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold mb-2">Save Time</h4>
                    <p className="text-blue-100">AI automatically generates flashcards in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold mb-2">Better Retention</h4>
                    <p className="text-blue-100">Interactive study method improves memory</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold mb-2">100% Free</h4>
                    <p className="text-blue-100">No subscriptions, no hidden fees ever</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold mb-2">Track Progress</h4>
                    <p className="text-blue-100">See detailed statistics and accuracy metrics</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white bg-opacity-5 backdrop-blur-md rounded-lg p-8 border border-white border-opacity-10"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">FAQ</h3>
              <div className="space-y-6 text-white">
                <div>
                  <h4 className="font-semibold mb-2 text-lg">❓ What file formats do you support?</h4>
                  <p className="text-blue-100">Currently we support PDF files. Upload any PDF and we'll extract the text.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">❓ How many flashcards will be generated?</h4>
                  <p className="text-blue-100">We generate 8-12 flashcards per document based on the content and key concepts.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">❓ Is my data saved?</h4>
                  <p className="text-blue-100">Yes, your documents and flashcards are saved in our secure database for future access.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">❓ Can I download my flashcards?</h4>
                  <p className="text-blue-100">Currently you can study online. Download feature coming soon!</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={() => navigate('/app')}
              className="bg-white text-blue-600 font-bold py-4 px-12 rounded-lg text-lg shadow-2xl"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Now →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}