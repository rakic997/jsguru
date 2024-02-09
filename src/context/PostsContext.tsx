import React, { createContext, useState, useEffect } from 'react';

import { PostType, CommentType, UserType } from '../types/types';

interface PostsContextType {
    posts: PostType[];
    comments: CommentType[];
    users: UserType[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const PostsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15');
                const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=50');
                const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users?_limit=20');

                const postsData = await postsResponse.json();
                const commentsData = await commentsResponse.json();
                const usersData = await usersResponse.json();

                setPosts(postsData);
                setComments(commentsData);
                setUsers(usersData);
            } catch (error) {
                console.error('Error:', error); // Didn't handle it :)
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
