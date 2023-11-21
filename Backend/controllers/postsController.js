const PostDB = require('../model/Post');

const getPosts = async (_, res) => {
    try {
        res.status(200).json(await PostDB._getPosts());
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

const getPost = async (req, res) => {
    const postId = req.params.id;
    if (!postId) {
        return res.sendStatus(400);
    }

    try {
        const result = await PostDB._getPost(postId);

        if (result.length > 0) {
            res.json(result[0]);
        }
        else {
            return res.sendStatus(404);
        }
    } catch (err) {
        return res.sendStatus(500);
    }
}

const createPost = async (req, res) => {
    const authorId = req.id;
    const content = req.body.content;
    if (!authorId || !content) {
        return res.sendStatus(400);
    }

    try {
        await PostDB._createPost(authorId, content);
        res.status(201).json({ "message": `New Post created ${content} by ${authorId}` });
    } catch (err) {
        return res.sendStatus(500);
    }
}

const updatePost = async (req, res) => {
    const userId = req.id;
    const postId = req.body.id;
    const newContent = req.body.content;
    if (!postId || !newContent) {
        return res.sendStatus(400);
    }

    try {
        const result = await PostDB._updatePost(userId, postId, newContent);
        if (result.affectedRows > 0) {
            res.status(200).json({ "message": `Content of post ${postId} updated to ${newContent}` });
        } else {
            return res.sendStatus(404);
        }
        
    } catch (err) {
        return res.sendStatus(500);
    }
}

const deletePost = async (req, res) => {
    const postId = req.body.id;
    if (!postId) {
        return res.sendStatus(400);
    }

    try {
        const result = await PostDB._deletePost(postId);
        if (result.affectedRows > 0) {
            res.status(200).json({ "message": `Post ${postId} deleted` });
        } else {
            return res.sendStatus(404);
        }  
    } catch (err) {
        return res.sendStatus(500);
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPost
}