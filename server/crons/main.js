const cron = require('node-cron');
const Config = require('../models/Config');
const { 
  processScheduledRequests,
  clearResolvedRequests
} = require('../services/request.service');

Config.findById(process.env.CONFIG_RECORD_ID)
  .then((config) => {
    cron.schedule(`*/${config.lowPriorityRequestsFrequency} * * * *`, () => {
      processScheduledRequests(['low', 'middle']);
    });
    
    cron.schedule(`*/${config.highPriorityRequestsFrequency} * * * *`, () => {
      processScheduledRequests(['high', 'highest']);
    });
    
    cron.schedule('* 7 * * *', () => {
      clearResolvedRequests();
    });
  })
  .catch((_) => {
    console.log('Could not find config for cron jobs');
  });

module.exports = cron;