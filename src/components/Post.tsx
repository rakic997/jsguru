import { useContext, useState } from 'react';
import { PostsContext } from '../context/PostsContext';

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const { users, comments } = useContext(PostsContext) || { users: [], comments: [] };
  const [expandedPost, setExpandedPost] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);

  const findUser = (userId: number) => {
    return users.find(user => user.id === userId);
  }

  const findComment = (postId: number) => {
    return comments.filter(comment => comment.id === postId);
  }

  const togglePostDetails = () => {
    setExpandedPost(!expandedPost);
  }

  const toggleComments = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpandedComments(!expandedComments);
  }

  const user = findUser(post.userId);
  const postComments = findComment(post.id);

  return (
    <div className='post' onClick={togglePostDetails}>
      <h4>{post.title}</h4>
      {expandedPost &&
        <div>
          <p>{post.body}</p>
          <h6>{user?.name}</h6>
          <button onClick={toggleComments}>Expand Comments</button>
          {expandedComments &&
            <ul>
              {postComments.map(comment => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          }
        </div>
      }
    </div>
  )
}

export default Post;