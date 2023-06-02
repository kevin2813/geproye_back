const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');
const logger = require('../config/logger');

const supabaseData = [
  [config.supabase.url, config.supabase.key],
  [config.supabase.url2, config.supabase.key2]
]

logger.info('DB --------');

module.exports = (async function (){
  var i = 0;
  var supabase = createClient(supabaseData[i][0], supabaseData[i][1], {
    realtime: {
      params: {
        eventsPerSecond: 10,
      }
    }
  });
  response = await supabase.from('proyectos').select().limit(1);
  while(response.error) {
    logger.error('Error al conectar a Supabase %d', i+1);
    i = (i+1) % 2;
    logger.warn('Intentando conectar a Supabase %d', i+1);
    await new Promise(r => setTimeout(r, config.supabase.retryTimeOutMs));
    supabase = createClient(supabaseData[i][0], supabaseData[i][1], {
      realtime: {
        params: {
          eventsPerSecond: 10,
        }
      }
    });
    response = await supabase.from('proyectos').select().limit(1);
  }
  
  logger.info('Conectado a Supabase %d', i+1);
  supabase.index = i;
  if(supabase.index == 0) {

  }
  return supabase;
})()
/*
supabase_sync: async function () {
  const supabase = createClient(supabaseData[0][0], supabaseData[0][1]);
  const supabase_back = createClient(supabaseData[1][0], supabaseData[1][1]);

  const tables = ['proyectos', 'iteraciones', 'integrantes', 'requerimientos'];

  for (table in tables){
    tb1 = await supabase.from(table).select().order('id', {ascending: true});
    tb2 = await supabase_back.from(table).select().order('id', {ascending: true});

    for(back in tb2.data) {
      front = tb1.data.find(element => element.id === back.id);
      if(!front) continue;

      
    }
  }
}}
*/
