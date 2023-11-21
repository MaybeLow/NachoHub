const express = require('express');
const router = express.Router();
const PostsController = require('../../controllers/postsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(PostsController.getPosts)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), PostsController.createPost)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), PostsController.updatePost)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), PostsController.deletePost);

router.route('/:id')
    .get(PostsController.getPost);

module.exports = router;