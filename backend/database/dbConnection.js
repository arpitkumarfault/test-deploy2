import mongoose from 'mongoose'

const databaseConnection =() =>  mongoose
  .connect(process.env.MONGO_URI, { dbName: 'task-tracker' })
  .then(() => {
    console.log('Database connection successful 👍')
  })
  .catch((error) => {
    console.log(`Database connection failed ${error.message}`)
  })

export default databaseConnection
