import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import HashTagList from './components/hashtag/HashTagList';
import { useEffect, useMemo, useState } from 'react';
import type { FeedbackItemProps } from './types';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemProps[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [filterItem, setFilterItem] = useState<string>('');

  const filteredFeedbackItems = useMemo(() => {
    if (!filterItem) {
      return feedbackItems;
    }

    return feedbackItems.filter((item) => {
      return item.company.toUpperCase() === filterItem.toUpperCase();
    });
  }, [feedbackItems, filterItem]);

  const companyList = useMemo(() => {
    const normalizedSet = new Set<string>();

    feedbackItems.forEach((item) => {
      normalizedSet.add(item.company.toUpperCase());
    });

    return Array.from(normalizedSet.values());
  }, [feedbackItems]);

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
        feedbackItems={filteredFeedbackItems}
        addFeedbackItemToList={addFeedbackItemToList}
      />
      <HashTagList companyList={companyList} setFilterItem={setFilterItem} />
    </div>
  );
}

export default App;
