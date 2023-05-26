const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');
const logger = require('../config/logger');

const supabase = createClient(config.supabase.url, config.supabase.key);

if (supabase) {
  logger.info('Connected to Supabase');
} else logger.error('Error on supabase connect');

module.exports = supabase;
