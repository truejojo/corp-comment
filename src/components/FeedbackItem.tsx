import { TriangleUpIcon } from '@radix-ui/react-icons';
import type { FeedbackItemProps } from '../types';

const FeedbackItem = ({ item }: { item: FeedbackItemProps }) => {
  return (
    <li className='feedback'>
      <button type='button'>
        <TriangleUpIcon />
        <span>{item.upvoteCount}</span>
      </button>
      <div>
        <p>{item.badgeLetter}</p>
      </div>
      <div>
        <p>{item.company}</p>
        <p>{item.text}</p>
      </div>
      <p>{item.daysAgo === 0 ? 'NEW' : `${item.daysAgo}d`}</p>
    </li>
  );
};

export default FeedbackItem;
