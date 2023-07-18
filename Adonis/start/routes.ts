/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import LogMiddleware from '../app/Middleware/LogAudit';
import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.post('insertUser','UsersController.insert').middleware('LogAudit')
Route.post('checkLogins','UsersController.checkLogin').middleware('LogAudit')


Route.post('insertPost','FeedsController.insert').middleware('LogAudit')
Route.get('view','FeedsController.selectAllRows').middleware('LogAudit')
Route.put('like/:id','FeedsController.updateLike').middleware('LogAudit')
Route.post('comment','FeedsController.commentInsert').middleware('LogAudit')

Route.get('/logging', 'LogAuditsController.handle')