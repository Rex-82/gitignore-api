import { type Request, type Response, type NextFunction, Router } from 'express'

export const TemplateRouter: Router = Router()

TemplateRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: true, statusCode: 200, data: [{ msg: "you get data product" }] })
})