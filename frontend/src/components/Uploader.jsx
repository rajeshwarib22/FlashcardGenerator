import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Uploader({ onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const inputRef = useRef(null)

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.pdf')) {
      setError('Only PDF files allowed')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', file.name.replace('.pdf', ''))

      const { data } = await axios.post(
        `${API_URL}api/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      setSuccess(`✓ ${data.flashcardsCount} cards generated!`)
      setTimeout(() => onSuccess(), 1500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        disabled={loading}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
        {loading && <p className="text-blue-600 mt-2 text-sm">Generating...</p>}
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
      </motion.div>
    </motion.div>
  )
}