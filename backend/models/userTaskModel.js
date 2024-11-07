import mongoose from 'mongoose'

const { Schema } = mongoose

const userTaskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    title: {
      type: String,
      required:true
    },
    detail: {
      type: String,
      required:true
    },
    dueDate: {
      type: Date,
      default: new Date(),
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    attachments: [
      {
        type: String,
        required:true
      },
    ],
    status: {
      pending: [
        {
          type: Schema.Types.ObjectId,
          ref: 'usertask',
        },
      ],
      ongoing: [
        {
          type: Schema.Types.ObjectId,
          ref: 'usertask',
        },
      ],
      completed: [
        {
          type: Schema.Types.ObjectId,
          ref: 'usertask',
        },
      ],
    },
    currentStatus: {
      type: String,
      enum: ['pending', 'ongoing', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('usertask', userTaskSchema)
