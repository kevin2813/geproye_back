const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    //  MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    SUPABASE_API_URL: Joi.string().required().description('Supabase API Url'),
    SUPABASE_API_URL2: Joi.string().required().description('Supabase API Url'),
    SUPABASE_API_KEY: Joi.string().required().description('Supabase API Key'),
    SUPABASE_API_KEY2: Joi.string().required().description('Supabase API Key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  supabase: {
    url: envVars.SUPABASE_API_URL,
    key: envVars.SUPABASE_API_KEY,
    url2: envVars.SUPABASE_API_URL2,
    key2: envVars.SUPABASE_API_KEY2,
  },
};
