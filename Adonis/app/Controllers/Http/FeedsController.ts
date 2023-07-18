// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import feeds from 'App/Models/feeds'
import Comments from 'App/Models/comments'

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
    // public async selectAllRows(){
 
    //     const Database = Comments.query()
        
    //     .rightJoin  ('feeds', 'feeds.id', '=', 'comments.pid')
       
       
    //     const objects = (await Database).map((obj) =>
    //     {
    //         return{
    //             pid:obj.$extras.pid,
    //             id:obj.$attributes.id,
    //             username: obj.$extras.username,
    //             posts: obj.$extras.posts,
    //             likes: obj.$extras.likes,
    //             //comment: obj.$extras ? obj.$extras.comment : null,   
    //         }
    //     })
    //     const comments = Comments.query()
    //     .select('*')
   

    //     function includeComments(objects, comments) {
    //         return objects.map(obj => {
    //           obj.comments = comments
    //             .filter(comments => omment.pid === obj.id)
    //             .map(comments => comment.comment);
    //           return obj;
    //         });
    //       }
          
    //       // Include comments based on pid matching
    //       const objectsWithComments = includeComments(objects, comments);
          
    //       // Print the updated objects
    //       objectsWithComments.forEach(obj => {
    //         console.log(obj);
    //       });

            


    // }

    public async selectAllRows({ response }: HttpContextContract) {
        try {
          const objects = await feeds.query()
            .leftJoin('comments', 'feeds.id', '=', 'comments.pid')
            .select('comments.pid', 'feeds.id', 'feeds.username', 'feeds.posts', 'feeds.likes')
           // .exec();
    
          const objectsWithComments = await this.includeComments(objects.map(obj => obj.toJSON()));
    
          return response.status(200).json(objectsWithComments);
        } catch (error) {
          console.error(error);
          return response.status(500).json({ message: 'Internal Server Error' });
        }
      }
    
      // Helper method to include comments
      // private async includeComments(objects) {
      //   const comments = await Comments.query().select('*').exec();
    
      //   return objects.map(obj => {
      //     obj.comments = comments
      //       .filter(comment => comment.pid === obj.id)
      //       .map(comment => comment.comment);
      //     return obj;
      //   });
      // }
      private async includeComments(objects) {
        const comments = await Comments.query().select('*');
        const uniqueObjects = [];
      
        objects.forEach(obj => {
          const existingObject = uniqueObjects.find(uniqueObj => uniqueObj.id === obj.id);
      
          if (existingObject) {
            const uniqueComments = new Set(existingObject.comments);
            comments
              .filter(comment => comment.pid === obj.id)
              .forEach(comment => uniqueComments.add(comment.comment));
            existingObject.comments = Array.from(uniqueComments);
          } else {
            const newObj = Object.assign({}, obj);
            newObj.comments = comments
              .filter(comment => comment.pid === obj.id)
              .map(comment => comment.comment);
            newObj.createdAt = comments
            .filter(comment => comment.pid === obj.id)
            .map(comment => (new Date(comment.createdAt)).toISOString().split('T')[0]);
            uniqueObjects.push(newObj);
          }
        });
      
        return uniqueObjects;
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
            
            const result = await Comments.create({
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
