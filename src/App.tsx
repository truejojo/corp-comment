import Footer from './components/Footer';
import Container from './components/Container';
import HashTagList from './components/HashTagList';
import { useEffect, useState } from 'react';
import type { FeedbackItemProps } from './types';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemProps[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const addFeedbackItemToList = (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.startsWith('#'))!
      .substring(1);

    const badgeLetter = company.charAt(0).toUpperCase();

    const newItem: FeedbackItemProps = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter,
      company,
      text,
      daysAgo: 0,
    };

    setFeedbackItems((prevItems) => [...prevItems, newItem]);

    const setFeedbackItemsToServer = async () => {
      await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        },
      );
    };

    setFeedbackItemsToServer();
  };

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
    <div className='app'>
      <Footer />
      <Container
        isLoading={isLoading}
        error={error}
        feedbackItems={feedbackItems}
        addFeedbackItemToList={addFeedbackItemToList}
      />
      <HashTagList />
    </div>
  );
}

export default App;
