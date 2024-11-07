import UserTask from '../models/userTaskModel.js'; // Adjust path as necessary

export const userTaskStatusUpdate = async (req, res) => {
  const { id } = req.params; // Get task ID from URL
  const { status } = req.body; // Get new status from request body

  // Validate status
  if (!['pending', 'ongoing', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Update the task status
    await UserTask.updateOne(
      { _id: id },
      { 
        $set: { currentStatus: status },
        $push: { [`status.${status}`]: id } // Push to the corresponding status array
      }
    );

    return res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task status', error });
  }
};
