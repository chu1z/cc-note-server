import Router from '@koa/router'
import { sign } from 'jsonwebtoken'
import defaultConfig from '../config/default'
import { getUserByEmail } from '../models/user'

const router = new Router()

router.get('/', (context, next) => {
    context.response.status = 200
    context.body = {
        code: 1,
        message: '注册成功',
        data: {

        }
    }
})

router.post('/', async (context, next) => {
    const body = context.request.body
    if (body) {
        context.response.status = 200
        await getUserByEmail(body).then((doc) => {
            if (doc) {
                if (doc.password === body.password) {
                    const token = sign({ name: body.username, email: body.email }, defaultConfig.secret, {
                        expiresIn: '12h'
                    })
                    context.body = {
                        code: 1,
                        message: '登录成功!',
                        data: {
                            token,
                            name: body.username,
                            email: body.email
                        }
                    }
                } else {
                    context.body = {
                        code: 0,
                        message: '当前输入登录密码错误!'
                    }
                }
            } else {
                context.body = {
                    code: 0,
                    message: '当前输入邮箱不存在!'
                }
            }
        }).catch((err) => {
            console.error(err)
            context.body = {
                code: 0,
                message: '未知错误,登录失败'
            }
        })
    }
    next()
})

export default router
