import Koa from 'koa'
import Router from '@koa/router'

import note from './note'
import login from './login'
import register from './register'
import userInfo from './userInfo'

const router = new Router()

router.use('/', note.routes(), note.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())
router.use('/userinfo', userInfo.routes(), userInfo.allowedMethods())

function use (app: Koa) {
    app.use(router.routes())
}

export default use
