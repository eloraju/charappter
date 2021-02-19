import convict from 'convict';

const conf = convict({
    port: {
        doc: '',
        format: 'port',
        default: 1339,
        env: 'PORT',
        arg: 'port'
    },
    db: {
        host:{
            doc: 'Database url',
            format: String,
            default: 'localhost',
            env: 'DB_HOST',
            arg: 'host'
        },
        user:{
            doc: 'Database username',
            format: String,
            default: 'charadmin',
            env: 'DB_USER',
            arg: 'user'
        },
        pswd:{
            doc: 'Database password',
            format: String,
            default: 'password',
            env: 'DB_PASS',
            arg: 'pass'
        }
    }
});

conf.validate();

export default conf;
