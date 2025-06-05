import { useContext, useEffect, useState } from 'react';
import { FeedbackItemsContext } from '../contexts/feedbackItemsContextProvider';
import type { FeedbackItemProps } from '../types';

export const useFeedbackItemsContext = (componentName: string) => {
  const feedbackItemsContext = useContext(FeedbackItemsContext);

  if (!feedbackItemsContext) {
    throw new Error(
      `${componentName} must be used within a FeedbackItemsContextProvider`,
    );
  }

  return feedbackItemsContext;
};

export const useFeedbackItems = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemProps[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

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

  return {
    feedbackItems,
    isLoading,
    error,
    setFeedbackItems,
  };
};
