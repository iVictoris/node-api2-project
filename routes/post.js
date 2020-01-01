const {Router} = require('express');
const router = Router();

router
  .use('/')
  .get(async (req, res) => {
    // GET posts
  })
  .post(async (req, res) => {
    // POST posts
  })

router.use('/:id')
  .get(async ({params: {id}}, res) => {
    // GET post/id
  })
  .delete(async ({params: {id}}, res) => {
    // DELETE post/id
  })
  .update(async ({params: {id}}, res) => {
    // UPDATE post/id
  })

router.use('/:id/comments')
  .get(async ({params: {id}}, res) => {
    // GET comments of post/id
  })
  .post(async ({params: {id}}, res) => {
    // post comments to post/id
  })

