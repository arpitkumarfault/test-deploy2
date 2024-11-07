import axios from 'axios'
import { useState, useEffect } from 'react'

const PendingTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([])

  useEffect(() => {
    fetchPendingTasks() // Fetch pending tasks on component mount
  }, [])

  const fetchPendingTasks = () => {
    axios
      .get('/api/v4/user/get-data') // Fetch all tasks from backend
      .then((response) => {
        const tasks = response.data
        // Filter tasks to get only those that are pending
        const filteredPendingTasks = tasks.filter((task) => task.currentStatus === 'pending')
        setPendingTasks(filteredPendingTasks)
        console.log('Fetched pending tasks:', filteredPendingTasks)
      })
      .catch((error) => {
        console.error('Error fetching pending tasks:', error)
      })
  }

  // Get background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'low':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pending Tasks</h1>
      {pendingTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {pendingTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-blue-500"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-800">{task.title || "Untitled Task"}</h2>
                {/* Priority Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(task.priority)}`}
                >
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'No Priority'}
                </span>
              </div>
              
              <p className="text-gray-700 mt-2">
                {task.detail || "No details available."}
              </p>

              {/* Due Date */}
              <p className="text-gray-600 mt-2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

              {/* Attachments */}
              {task.attachments && task.attachments.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-blue-800 font-semibold">Attachments:</h3>
                  <ul className="list-disc list-inside">
                    {task.attachments.map((attachment, index) => (
                      <li key={index} className="text-blue-500 hover:underline">
                        <a href={attachment} target="_blank" rel="noopener noreferrer">
                          {attachment}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Status and Complete Button */}
              <div className="flex justify-between items-center mt-4">
                <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-green-700 bg-green-200 rounded-full">
                  Status: {task.currentStatus.charAt(0).toUpperCase() + task.currentStatus.slice(1)}
                </span>
                
                {/* Mock Complete Button */}
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  Complete Task
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 text-center text-gray-700">
          <h2 className="text-2xl font-bold mb-4">No Pending Tasks Found</h2>
          <p className="text-lg">
            You have no tasks pending. Add new tasks to keep track of your work.
          </p>
        </div>
      )}
    </div>
  )
}

export default PendingTasks
