import { useEffect, useState } from 'react';
import FeedbackItem from './FeedbackItem';
import type { FeedbackItemProps } from '../types';

const FeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemProps[] | []>(
    [],
  );

  useEffect(() => {
    fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.feedbacks);
        setFeedbackItems(data.feedbacks);
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        );
      });
  }, []);

  return (
    <ol className='feedback-list'>
      {feedbackItems &&
        feedbackItems.map((item) => <FeedbackItem key={item.id} item={item} />)}
    </ol>
  );
};

export default FeedbackList;
