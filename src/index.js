const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { createClient } = require('@supabase/supabase-js');

(async () => {

const supabase = await require('./utils/db');

async function handleChanges(payload) {
  logger.info(JSON.stringify(payload));
  
  if(supabase.index == 0) {
    supabase_back = createClient(config.supabase.url2, config.supabase.key2);
    switch(payload.eventType) {
      case 'INSERT': {
        const res = await supabase_back.from(payload.table).insert(payload.new).select();
        if (res.error) logger.error('Error al insertar registro a base de datos secundaria');
      }break;
      case 'UPDATE': {
        const res = await supabase_back.from(payload.table).update(payload.new).eq('id', payload.new.id).select();
        if (res.error) logger.error('Error al actualizar registro a base de datos secundaria: ' + JSON.stringify(res.error));
      }break;
      case 'DELETE': {
        const res = await supabase_back.from(payload.table).delete().eq('id', payload.old.id).select();
        if (res.error) logger.error('Error al borrar registro en base de datos secundaria');
      }break;
    }
  }
}

if(supabase.index == 0) {
  const subscription = await supabase
    .channel('supabase_realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'proyectos' }, handleChanges)
/*     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'proyectos' }, handleChanges)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'proyectos' }, handleChanges)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'proyectos' }, handleChanges)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'iteraciones' }, handleChanges)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'iteraciones' }, handleChanges)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'iteraciones' }, handleChanges)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'integrantes' }, handleChanges)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'integrantes' }, handleChanges)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'integrantes' }, handleChanges)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'requerimientos' }, handleChanges)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'requerimientos' }, handleChanges)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'requerimientos' }, handleChanges) */
    .subscribe();

    supabase.subscription = subscription;
}

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
})()