import React, { createContext, useState, useEffect } from 'react';

import { Post, Comment, User } from '../types/types';

interface PostsContextType {
    posts: Post[];
    comments: Comment[];
    users: User[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const PostsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15');
                const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
                const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users?_limit=20');

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
        users,
         searchQuery,
        setSearchQuery,
    }

    return (
        <PostsContext.Provider value={ContextValue}>
            {children}
        </PostsContext.Provider>
    )
}

export { PostsContext, PostsContextProvider };
