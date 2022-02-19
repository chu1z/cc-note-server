import mongoose from 'mongoose'
import { note } from '../lib/mongoose'

const create = (data: any) => {
    return note.create(data)
}

const getNotes = (author: mongoose.Types.ObjectId) => {
    return note.find({ author: author }).exec()
}

export {
    create,
    getNotes
}
