import { CommentType } from '../types/types';

interface CommentsProps {
  comments: CommentType[];
}

const Comments = ({ comments }: CommentsProps) => (
  <ul className='comments'>
    {comments.map(comment => (
      <li className='comment' key={comment.id}>
        <div className='comment-header'>
          <svg width='21px' height='21px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='12' cy='6' r='4' stroke='#1C274C' strokeWidth='1.5' />
            <path d='M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
          </svg>
          <h6>{comment.email}</h6>
        </div>
        <div className='comment-body'>
          <p>{comment.body}</p>
        </div>
      </li>
    ))}
  </ul>
);

export default Comments;