const db = require('../config/dbConn');

const _getPosts = async () => {
    const sql = "SELECT * FROM `PostS`";
    const [result] = await db.execute(sql);
    return result;
}

const _getPost = async (postId) => {
    const sql = "SELECT * FROM `PostS` WHERE `Post_id` = ?";
    const [result] = await db.execute(sql, [postId]);
    return result;
}

const _createPost = async (authorId, content) => {
    const sql = "INSERT INTO `PostS` (author_id, content) VALUES (?, ?)";
    const [result] = await db.execute(sql, [authorId, content]);
    return result;
} 

const _updatePost = async (userId, postId, content) => {
    var sql = "UPDATE `PostS` SET `content` = ? WHERE `Post_id` = ? AND `author_id` = ?";

    const [result] = await db.execute(sql, [content, postId, userId]);
    return result;
}

const _deletePost = async (postId) => {
    const sql = "DELETE FROM `PostS` WHERE `Post_id` = ?";
    const [result] = await db.execute(sql, [postId]);
    return result;
}

module.exports = { 
    _getPosts, 
    _getPost, 
    _createPost, 
    _updatePost, 
    _deletePost 
}