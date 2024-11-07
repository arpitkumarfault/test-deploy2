import axios from 'axios'
import { useState } from 'react'
import { FiClipboard, FiEdit, FiPlusCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

const HomePage = () => {
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('')
  const [attachments, setAttachments] = useState([])
  const [link, setLink] = useState('') // New state for link input

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name); // Store only the file names
    setAttachments(fileNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Include link in attachments if provided
      const allAttachments = [...attachments];
      if (link) {
        allAttachments.push(link);
      }

      const { data } = await axios.post(
        '/api/v4/user/create-task',
        { title, detail, dueDate, priority, attachments: allAttachments },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log('Task created:', data)
      setTitle('')
      setDetail('')
      setDueDate('')
      setPriority('')
      setAttachments([])
      setLink('') // Reset link input after submission
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-300">
      <main className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg space-y-8"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <FiClipboard className="text-blue-500 text-4xl animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-700">Task Management</h2>
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <div className="text-center space-y-2">
              <FiPlusCircle className="text-blue-600 text-3xl mx-auto animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800">Create a New Task</h3>
              <p className="text-gray-500 text-sm">Organize your tasks and manage them effectively.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition-transform transform hover:scale-105"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Description</label>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition-transform transform hover:scale-105"
                  placeholder="Enter task description"
                  rows="4"
                />
              </div>

              {/* Due Date and Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date & Time</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition-transform transform hover:scale-105"
                />
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value.toLowerCase())} // Convert to lowercase
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition-transform transform hover:scale-105"
                >
                  <option value="">Select Priority</option>
                  <option value="low" className="text-green-600">Low</option>
                  <option value="medium" className="text-yellow-600">Medium</option>
                  <option value="high" className="text-red-600">High</option>
                </select>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <input
                  type="file"
                  multiple
                  onChange={handleAttachmentChange}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition-transform transform hover:scale-105"
                />
                <p className="text-gray-500 text-xs mt-1">Attach images, files, or links (optional)</p>
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Link Attachment</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-sm transition-transform transform hover:scale-105"
                  placeholder="Enter a link (e.g., https://example.com)"
                />
                <p className="text-gray-500 text-xs mt-1">Add a URL link to the task (optional)</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-md flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
              >
                <FiEdit className="text-lg" />
                <span>Create Task</span>
              </button>
            </form>
          </div>
        </motion.div>

       
      </main>
    </div>
  )
}

export default HomePage
