import mongoose from 'mongoose'
import config from '../config/default'

mongoose.connect(config.mongodb, {
  maxPoolSize: 10
})

const db = mongoose.connection

db.on('error', err => {
  console.error(err)
})

db.on('open', () => {
  console.log('mongodb connected')
})
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  }
})

const NoteSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  time: String,
  tag: String,
  content: String
})

NoteSchema.index({ author: 1, _id: -1 })

export const user = mongoose.model('User', UserSchema)

export const note = mongoose.model('Note', NoteSchema)
