// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import users from 'App/Models/users'


export default class UsersController {

    public async insert({ request }: HttpContextContract){
        try{
            const newPostSchema = schema.create({
                            username: schema.string(),
                            password: schema.string(),
                            bio: schema.string()
                          })
            const payload = await request.validate({ schema: newPostSchema })
            
            const result = await users.create({
                username: payload.username,
                password: payload.password,
                bio: payload.bio
              })
              
            if(result.$isPersisted){
                return "Inserted Successfully"
            }else{
                return "Unsuccessful Insertion"
            }}
            catch(err){
                console.log(err)
            }
            
    }
    public async checkLogin({ params }: HttpContextContract){
        const result = await users.findBy('username', params.username)
        if(result == null){
            return "No rows are selected"
        }else{
            if(result.password == params.password)
            return result
        }
    }
}
