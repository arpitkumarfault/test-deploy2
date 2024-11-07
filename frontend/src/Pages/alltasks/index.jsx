import axios from 'axios';
import { useState, useEffect } from 'react';
import EditTaskModal from '../../Components/EditTaskModel';

const AllTasks = () => {
  const [userTask, setUserTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null); // State to manage expanded task

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  const fetchTasks = () => {
    axios
      .get('/api/v4/user/get-data')
      .then((response) => {
        setUserTask(response.data);
        console.log('Fetched tasks:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const userTaskDelete = (userId, taskId) => {
    axios
      .post(
        `/api/v4/user/delete-task/${userId}`,
        { taskId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log('Task deleted from backend:', response.data);
        fetchTasks(); // Refetch tasks after deletion
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    axios
      .put(`/api/v4/user/update-task-status/${taskId}`, { status: newStatus })
      .then((response) => {
        console.log('Task status updated:', response.data);
        fetchTasks(); // Refetch tasks after updating status
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  // Get background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-300 hover:bg-red-200';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200';
      case 'low':
        return 'bg-green-100 border-green-300 hover:bg-green-200';
      default:
        return 'bg-gray-100 border-gray-300 hover:bg-gray-200';
    }
  };

  // Function to truncate task details
  const truncateDetails = (detail) => {
    if (!detail) return "No details available.";
    const words = detail.split(' ');
    return (words.length > 12 || detail.length > 25) ? `${detail.slice(0, 25)}...` : detail;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your All Tasks</h1>
      {userTask.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {userTask.map((task) => (
            <div
              key={task._id}
              className={`${getPriorityColor(task.priority)} border rounded-lg p-6 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-800">
                  {task.title || "Untitled Task"}
                </h2>
                <span
                  className={`text-sm font-semibold py-1 px-2 rounded-full ${
                    task.priority === 'high'
                      ? 'bg-red-500 text-white'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'No Priority'}
                </span>
              </div>

              <p className="text-gray-700 mt-2">
                {expandedTaskId === task._id ? task.detail || "No details available." : truncateDetails(task.detail || "No details available.")}
                {task.detail && (task.detail.split(' ').length > 12 || task.detail.length > 30) && expandedTaskId !== task._id && (
                  <button
                    className="text-blue-500 hover:underline ml-2"
                    onClick={() => setExpandedTaskId(task._id)}
                  >
                    Read more
                  </button>
                )}
                {expandedTaskId === task._id && (
                  <button
                    className="text-blue-500 hover:underline ml-2"
                    onClick={() => setExpandedTaskId(null)} // Collapse
                  >
                    Collapse
                  </button>
                )}
              </p>

              <p className="text-gray-600 mt-2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
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

              <div className="flex flex-col gap-4 justify-between mt-4">
                {/* Radio Buttons for Task Status */}
                <div className="flex justify-between mt-4">
                  {['pending', 'ongoing', 'completed'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name={`status-${task._id}`}
                        value={status}
                        checked={task.currentStatus === status}
                        onChange={() => handleStatusChange(task._id, status)}
                        className={`form-radio h-4 w-4 text-${
                          status === 'pending' ? 'yellow' : status === 'ongoing' ? 'blue' : 'green'
                        }-500`}
                      />
                      <span
                        className={`ml-2 text-${
                          status === 'pending' ? 'yellow' : status === 'ongoing' ? 'blue' : 'green'
                        }-700`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => handleEditClick(task)}
                  className="px-4 py-2 bg-blue-500 flex justify-center text-white rounded-lg shadow-sm hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => userTaskDelete(task.user, task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 text-center text-gray-700">
          <h2 className="text-2xl font-bold mb-4">No Tasks Found</h2>
          <p className="text-lg">
            Looks like you’re all caught up! Enjoy your free time or add new tasks to keep track of your work.
          </p>
        </div>
      )}

      {/* Edit Task Modal */}
      {isModalOpen && <EditTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task={selectedTask} />}
    </div>
  );
};

export default AllTasks;
