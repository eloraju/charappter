import app from './app';
import config from './config';

app.listen(config.get('port'));
