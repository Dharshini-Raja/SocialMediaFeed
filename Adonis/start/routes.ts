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

Route.post('insertUser','UsersController.insert')
Route.get('checkLogin/:username/:password','UsersController.checkLogin')


Route.post('insertPost','FeedsController.insert')
Route.get('view','FeedsController.selectAllRows')
Route.get('like/:id','FeedsController.updateLike')
Route.post('comment','FeedsController.commentInsert')


