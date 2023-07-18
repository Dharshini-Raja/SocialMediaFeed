import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import log_audit from 'App/Models/log_audit';
  
export default class LogAudit {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
    const log = {
      route_access : request.url(),
      ip_address : request.ip(),
    };
    await log_audit.create(log)
      
  }
}
