import { user } from '../lib/mongoose'

const create = (data: any) => {
    return user.create(data)
}

const getUserByEmail = (data: any) => {
    return user.findOne({ email: data.email }).exec()
}

export {
    create,
    getUserByEmail
}
