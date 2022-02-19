import Router from '@koa/router'

// import jwt from 'koa-jwt'
import defaultConfig from '../config/default'

import { verify, JwtPayload } from 'jsonwebtoken'
import { getUserByEmail } from '../models/user'

const router = new Router()

// const jwtMidware = jwt({ secret: defaultConfig.secret })

router.get('/', async (context, next) => {
    context.response.status = 200
    try {
        const { authorization = '' } = context.request.header
        const sign: string | JwtPayload = verify(authorization, defaultConfig.secret)
        await getUserByEmail({ email: (sign as JwtPayload).email }).then((doc) => {
            context.body = {
                code: 1,
                message: '获取用户信息成功',
                data: {
                    email: doc.email,
                    username: doc.username
                }
            }
        }).catch(() => {
            context.body = {
                code: 0,
                message: '未找到用户'
            }
        })
    } catch (error) {
        context.body = {
            code: 0,
            message: 'token 验证失败'
        }
    }
    next()
})

export default router
