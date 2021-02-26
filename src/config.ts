import convict from 'convict';

const conf = convict({
  server: {
    host: {
      doc: 'Database url',
      format: String,
      default: 'localhost',
      env: 'HOST',
      arg: 'host'
    },
    port: {
      doc: '',
      format: 'port',
      default: 1339,
      env: 'PORT',
      arg: 'port'
    }
  },
  db: {
    host: {
      doc: 'Database url',
      format: String,
      default: 'localhost',
      env: 'DB_HOST',
      arg: 'db-host'
    },
    port: {
      doc: 'Database port',
      format: Number,
      default: 27017,
      env: 'DB_PORT',
      arg: 'db-port'
    },
    user: {
      doc: 'Database username',
      format: String,
      default: 'dev',
      env: 'DB_USER',
      arg: 'db-user'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      env: 'DB_PASS',
      arg: 'db-pass'
    },
    dbName: {
      doc: 'Database default database name',
      format: String,
      default: 'dev',
      env: 'DB_NAME',
      arg: 'db-name'
    }
  }
});

conf.validate();

export default conf;
