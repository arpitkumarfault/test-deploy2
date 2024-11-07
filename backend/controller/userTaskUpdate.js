import userModel from '../models/userModel.js'
import userTaskModel from '../models/userTaskModel.js'

const userTaskUpdate = async (req, res) => {
  try {
    const { id } = req.params; // User's ID
    const { taskId, title, detail } = req.body; // Task's ID and updated fields

    // Validate taskId, title, and detail
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }
    if (!title || !detail) {
      return res.status(400).json({ message: 'Title and detail are required' });
    }

    // Find the user and check if they have the specified task
    const user = await userModel.findById(id);
    if (!user || !user.tasks.includes(taskId)) {
      return res.status(404).json({ message: 'User or task not found' });
    }

    // Update the task document itself in the userTaskModel
    const updatedTask = await userTaskModel.findByIdAndUpdate(
      taskId,
      { title, detail },
      { new: true } // Return the updated task document after modification
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    console.error('Error updating task:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating the task', error: error.message });
  }
};

export default userTaskUpdate;
