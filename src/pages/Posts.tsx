import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

const Posts = () => {
  const { users, posts, comments } = useContext(PostsContext) || { users: [], posts: [], comments: [] };

  console.log(users);

  return (
    <div>Home</div>
  )
}

export default Posts;