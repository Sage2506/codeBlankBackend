const express = require('express');
const router = express.Router();
const prospects = require('../services/prospects');

/* GET prospects. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await prospects.get(req.query.page));
  } catch (err) {
    console.error(`Error while getting prospects `, err.message);
    next(err);
  }
});

/* POST prospect */
router.post('/', async function(req, res, next) {
  try {
    res.json(await prospects.create(req.body));
  } catch (err) {
    console.error(`Error while creating prospect`, err.message);
    next(err);
  }
});

/* PUT prospect */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await prospects.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating prospect`, err.message);
    next(err);
  }
});
module.exports = router;