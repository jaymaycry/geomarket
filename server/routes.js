/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import cors from 'cors';

export default function(app) {
  // var whitelist = ['http://localhost:9000'];
  const corsOptions = {};
  // const corsOptions = {
  // 	origin: 'http://localhost:9000'
  // };

  // Enable CORS for all routes.
  app.use(cors(corsOptions));
  
  // Insert routes below
  app.use('/api/offers', require('./api/offer'));
  app.use('/api/users', require('./api/user'));
  app.use('/uploads', require('./api/upload'));
  app.use('/swagger', require('./swagger').router);

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
