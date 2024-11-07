import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaExclamationCircle, FaCalendarAlt, FaPaperclip, FaSearch } from 'react-icons/fa';

const OngoingTasks = () => {
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOngoingTasks();
  }, []);

  const fetchOngoingTasks = () => {
    axios
      .get('/api/v4/user/get-data')
      .then((response) => {
        const tasks = response.data;
        const filteredOngoingTasks = tasks.filter((task) => task.currentStatus === 'ongoing');
        setOngoingTasks(filteredOngoingTasks);
      })
      .catch((error) => {
        console.error('Error fetching ongoing tasks:', error);
      });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTasks = ongoingTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Ongoing Tasks</h1>
      
      {/* Search Bar */}
    

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-yellow-800">{task.title || "Untitled Task"}</h2>
                
                {/* Priority Badge */}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(task.priority)}`}>
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'No Priority'}
                </span>
              </div>
              
              <p className="text-gray-700 mt-2">
                {task.detail || "No details available."}
              </p>

              {/* Due Date */}
              <div className="flex items-center mt-2 text-gray-600">
                <FaCalendarAlt className="mr-2" />
                <span>Due Date: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>

              {/* Attachments */}
              {task.attachments && task.attachments.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-blue-800 font-semibold flex items-center">
                    <FaPaperclip className="mr-2" /> Attachments:
                  </h3>
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

              {/* Status */}
              <div className="flex flex-col gap-4 justify-between mt-4">
                <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-200 rounded-full">
                  <FaExclamationCircle className="mr-1" /> Status: {task.currentStatus.charAt(0).toUpperCase() + task.currentStatus.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 text-center text-gray-700">
          <h2 className="text-2xl font-bold mb-4">No Ongoing Tasks Found</h2>
          <p className="text-lg">
            You currently have no ongoing tasks. Consider adding new tasks to your list.
          </p>
        </div>
      )}
    </div>
  );
};

export default OngoingTasks;
