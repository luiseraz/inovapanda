import { Router } from 'express';
import { list, getBySlugOrId, create, update, remove } from '../controllers/product.controller.js';
import { authRequired } from '../middleware/auth.js';
import { adminOnly } from '../middleware/role.js';

const router = Router();

// públicos
router.get('/', list);
router.get('/:slug', getBySlugOrId);

// admin
router.post('/', authRequired, adminOnly, create);
router.put('/:slug', authRequired, adminOnly, update);
router.delete('/:slug', authRequired, adminOnly, remove);

export default router;
