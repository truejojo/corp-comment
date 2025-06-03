import { useEffect, useState } from 'react';
import FeedbackItem from './FeedbackItem';
import type { FeedbackItemProps } from '../types';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const FeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemProps[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setError(`Error during component mount: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackItems();
  }, []);

  return (
    <ol className='feedback-list'>
      {isLoading && <Spinner />}

      {error && <ErrorMessage message={error} />}

      {feedbackItems?.length === 0 && 'Keine Feedbacks vorhanden.'}

      {feedbackItems?.length > 0 &&
        feedbackItems.map((item) => <FeedbackItem key={item.id} item={item} />)}
    </ol>
  );
};

export default FeedbackList;
