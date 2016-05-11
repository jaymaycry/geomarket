'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import recaptcha from 'express-recaptcha-rest';
var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', recaptcha({ secret: '6LcaMB8TAAAAAPwOUEwHUg0VrnrlHvGnWAztrCiG' }), controller.create);
router.post('/anonymous', recaptcha({ secret: '6LcaMB8TAAAAAPwOUEwHUg0VrnrlHvGnWAztrCiG' }), controller.createAnonymous);

module.exports = router;
