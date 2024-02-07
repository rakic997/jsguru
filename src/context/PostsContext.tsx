import React, { createContext, useState, useEffect } from 'react';

import { Post, Comment, User } from '../types/types';

interface PostsContextType {
    posts: Post[];
    comments: Comment[];
    users: User[];
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const PostsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
                const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');

                const postsData = await postsResponse.json();
                const commentsData = await commentsResponse.json();
                const usersData = await usersResponse.json();

                setPosts(postsData);
                setComments(commentsData);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const ContextValue: PostsContextType = {
        posts, 
        comments,
        users
    }

    return (
        <PostsContext.Provider value={ContextValue}>
            {children}
        </PostsContext.Provider>
    )
}

export { PostsContext, PostsContextProvider };
