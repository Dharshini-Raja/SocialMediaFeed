import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import log_audit from 'App/Models/log_audit';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export default class LogAuditsController {
    public async handle({request}: HttpContextContract) {
    // Retrieve the table data from the Log model or any other source
    const tableData = await log_audit.query().select('*');
    // Convert tableData to CSV and save to a file
    const filePath = 'C:/Users/dhars/Desktop/Log/output.csv';
    
    await convertTableToCsv(tableData, filePath);
    async function convertTableToCsv(tableData, filePath) {
      const csvWriter = createCsvWriter({
        path: filePath,
        header:[{ id: 'route_access', title: 'Route Access' },
        { id: 'ip_address', title: 'IP Address' },],
        append:true
      });
      await csvWriter.writeRecords(tableData);
    }
    
    await log_audit.query().delete();
}
}
