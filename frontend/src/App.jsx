import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import './App.css'
import Landing from './pages/Landing'
import Uploader from './components/Uploader'
import DocumentList from './components/DocumentList'
import StudyView from './components/StudyView'

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

function MainApp() {
  const [documents, setDocuments] = useState([])
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchDocs = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_URL}/api/documents`)
      setDocuments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  if (selectedDoc) {
    return (
      <StudyView 
        documentId={selectedDoc}
        onBack={() => setSelectedDoc(null)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold">📚 FlashCard Generator</h1>
              <p className="text-gray-600">AI-powered flashcards from PDFs</p>
            </motion.div>

            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Back to Home"
            >
              <span>🏠</span>
              <span>Home</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Uploader onSuccess={fetchDocs} />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Documents</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <motion.div
                    className="h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              ) : documents.length > 0 ? (
                <DocumentList 
                  docs={documents}
                  onSelect={setSelectedDoc}
                />
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-600 text-center py-8"
                >
                  No documents yet. Upload a PDF to get started!
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  )
}