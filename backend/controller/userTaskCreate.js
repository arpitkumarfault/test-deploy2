import userModel from "../models/userModel.js";
import userTaskModel from "../models/userTaskModel.js";
const userTaskCreate = async (req, res) => {
  let { title, detail, dueDate, priority, attachments } = req.body;

  // Ensure priority is lowercase to match the enum values
  priority = priority ? priority.toLowerCase() : 'low'; 

  try {
    // Find the user based on the email from req.user
    let user = await userModel.findOne({ email: req.user.email }).populate('tasks');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create a new task with additional fields
    const newTask = await userTaskModel.create({
      user: user._id,
      title,
      detail,
      dueDate,               
      priority,              
      attachments,           
    });

    // Add the new task to the user's task list and save
    user.tasks.push(newTask._id);
    await user.save();

    // Respond with success message and task data
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the task 🚨🚨🚨',
      error: error.errors || error.message // Provide specific error details
    });
  }
};

export default userTaskCreate;
