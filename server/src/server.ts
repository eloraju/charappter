import app from './app';
import config from './config';
// Here we can add middleware to the whole app. Stuff like authentication
// and authorization as well as validation
app.listen(config.get('port'));
