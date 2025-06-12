const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        return [];
    }
};

const usersData = async () => {
    return getData('users');
}

const getAllData = async () => {
    const [users, posts, comments] = await Promise.all([
        getData('users'),
        getData('posts'),
        getData('comments')
    ]);
    return { users, posts, comments };
};

const mergeUserData = ({ users, posts, comments }) => {
    return users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        const userComments = comments.filter(comment =>
            userPosts.some(post => post.id === comment.postId)
        );

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            posts: userPosts.map(post => ({
                id: post.id,
                title: post.title,
                body: post.body
            })),
            comments: userComments.map(comment => ({
                id: comment.id,
                postId: comment.postId,
                name: comment.name,
                body: comment.body
            }))
        };
    });
};

const filterUsersWithMoreThan3Comments = (data) => {
    const mergedUsers = mergeUserData(data);
    return mergedUsers.filter(user => user.comments.length > 3);
};

const formatUserSummary = (data) => {
    const mergedUsers = mergeUserData(data);
    return mergedUsers.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        postsCount: user.posts.length,
        commentsCount: user.comments.length
    }));
};

const getTopUserByComments = (summary) => {
    return summary.reduce((topUser, currentUser) =>
        currentUser.commentsCount > topUser.commentsCount ? currentUser : topUser
    );
};

const sortUsersByPosts = (summary) => {
    return [...summary].sort((a, b) => b.postsCount - a.postsCount);
};

const getTopUserByPosts = (summary) => {
    return summary.reduce((topUser, currentUser) =>
        currentUser.postsCount > topUser.postsCount ? currentUser : topUser
    );
};

const getPostWithComments = async (postId) => {
    try {
        const [postRes, commentsRes] = await Promise.all([
            axios.get(`${BASE_URL}/posts/${postId}`),
            axios.get(`${BASE_URL}/comments`, { params: { postId } })
        ]);

        const post = postRes.data;
        const comments = commentsRes.data;

        return {
            ...post,
            comments
        };
    } catch (error) {
        console.error(`Error fetching post/comments for ID ${postId}:`, error.message);
        return null;
    }
};
