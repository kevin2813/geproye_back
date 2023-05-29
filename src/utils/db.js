const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');
const logger = require('../config/logger');

const sb = [
  [config.supabase.url, config.supabase.key],
  [config.supabase.url2, config.supabase.key2]
]

module.exports =  (async function (){
  var i = 0;
  var supabase = createClient(sb[i][0], sb[i][1]);
  response = await supabase.from('proyectos').select().limit(1);
  while(response.error) {
    logger.error('Error al conectar a Supabase %d', i+1);
    i = (i+1) % 2;
    logger.warn('Intentando conectar a Supabase %d', i+1);
    await new Promise(r => setTimeout(r, 2000));
    supabase = createClient(sb[i][0], sb[i][1]);
    response = await supabase.from('proyectos').select().limit(1);
  }
  
  logger.info('Conectado a Supabase %d', i+1);
  return supabase;
})();
