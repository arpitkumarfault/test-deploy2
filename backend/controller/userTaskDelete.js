// userTaskDelete.js
import userModel from '../models/userModel.js'
import userTaskModel from '../models/userTaskModel.js'

const userDelete = async (req, res) => {
  try {
    const { id } = req.params; // User's ID
    const { taskId } = req.body; // Task's ID
  console.log(req.params);
  
    // Validate taskId
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }

    // Find the user and remove the task from the tasks array
    const user = await userModel.findByIdAndUpdate(
      id,
      { $pull: { tasks: taskId } }, // Remove the task from user's tasks array
      { new: true } // Return the updated user document after modification
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, remove the task document itself if tasks are stored in a separate collection
    const deletedTask = await userTaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found for deletion' });
    }

    res.status(200).json({ message: 'Task deleted successfully', tasks: user.tasks });
  } catch (error) {
    console.error('Error deleting task:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

export default userDelete;
