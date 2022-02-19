import Router from '@koa/router'
import { create } from '../models/user'
import { sign } from 'jsonwebtoken'
import defaultConfig from '../config/default'
const router = new Router()

router.post('/', async (context, next) => {
    context.response.status = 200
    const body = context.request.body
    if (body) {
        await create(body).then((info: any) => {
            const token = sign({ email: body.email }, defaultConfig.secret, {
                expiresIn: '12h'
            })
            context.body = {
                code: 1,
                message: '注册成功',
                data: {
                    token,
                    name: body.username,
                    email: body.email
                }
            }
        }).catch((err: { code: number, index: number, errmsg: string }/** MongoServerError */) => {
            let msg = '未知原因,注册失败'
            if (err.code === 11000) {
                msg = '邮箱已被占用,无法注册'
            }
            context.body = {
                code: 0,
                message: msg,
                data: {}
            }
        })
        next()
    }
})

export default router
