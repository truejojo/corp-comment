import { useState } from 'react';
import { TriangleUpIcon } from '@radix-ui/react-icons';
import type { FeedbackItemProps } from '../../types';

const FeedbackItem = ({ item }: { item: FeedbackItemProps }) => {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(item.upvoteCount);

  const handleUpvoteCount = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setUpvoteCount((prevUpvoteCount) => ++prevUpvoteCount);
  };

  return (
    <li
      onClick={() => setOpen((prevOpen) => !prevOpen)}
      className={`feedback ${open ? 'feedback--expand' : ''}`}
    >
      <button onClick={handleUpvoteCount} type='button'>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
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
