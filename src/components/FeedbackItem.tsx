import { TriangleUpIcon } from '@radix-ui/react-icons';
import type { FeedbackItemProps } from '../types';

const FeedbackItem = ({ item }: { item: FeedbackItemProps }) => {
  return (
    <li className='feedback'>
      <button type='button'>
        <TriangleUpIcon />
        <span>{item.upvotes}</span>
      </button>
      <div>
        <p>{item.bold}</p>
      </div>
      <div>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>
      <p>{item.days}d</p>
    </li>
  );
};

export default FeedbackItem;
