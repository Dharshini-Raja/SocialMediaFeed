// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import feeds from 'App/Models/feeds'
import comments from 'App/Models/comments'

export default class FeedsController {
    public async insert({ request }: HttpContextContract){
        try{
            const newPostSchema = schema.create({
                posts: schema.string(),
                username: schema.string()
                            
                          })
            const payload = await request.validate({ schema: newPostSchema })
            
            const result = await feeds.create({
                posts: payload.posts,
                username: payload.username
                
              })
              
            if(result.$isPersisted){
                return "Inserted Successfully"
            }else{
                return "Unsuccessful Insertion"
            }}
            catch(err){
                console.log(err,"err")
            }
            
    }
    public async selectAllRows(){
 
        const Database = feeds.query()
        .leftJoin('comments', 'feeds.id', '=', 'comments.pid')
       
        const result = (await Database).map((obj) =>
        {
            return{
                id:obj.$attributes.id,
                username: obj.$attributes.username,
                posts: obj.$attributes.posts,
                likes: obj.$attributes.likes,
                comment: obj.$extras ? obj.$extras.comment : null,
            }
        })
         return result
        


            


    }
    public async updateLike({ request, params }: HttpContextContract){
 
    const result = await feeds.findBy('id', params.id)
        if(result == null){
            return "No rows are selected"
        }else{
            result.likes += 1;
            await result.save()
            return result
        }
    }
    public async commentInsert({ request }: HttpContextContract){
        try{
            const newPostSchema = schema.create({
                comment: schema.string(),
                pid: schema.number()
                            
                          })
            const payload = await request.validate({ schema: newPostSchema })
            
            const result = await comments.create({
                comment: payload.comment,
                pid: payload.pid
                
            })
              
            if(result.$isPersisted){
                return "Inserted Successfully"
            }else{
                return "Unsuccessful Insertion"
            }}
            catch(err){
                console.log(err,"err")
            }
    }
}
