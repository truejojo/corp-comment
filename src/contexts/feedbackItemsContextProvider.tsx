import { createContext, useMemo, useState } from 'react';
import type { FeedbackItemProps } from '../types';
import { useFeedbackItems } from '../hooks/useFeedbackItemsContext';

type TFeedbackItemsContext = {
  isLoading: boolean;
  error: string;
  filteredFeedbackItems: FeedbackItemProps[];
  addFeedbackItemToList: (text: string) => void;
  setFilterItem: (text: string) => void;
  companyList: string[];
};

const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);

const FeedbackItemsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { feedbackItems, isLoading, error, setFeedbackItems } =
    useFeedbackItems();
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

  return (
    <FeedbackItemsContext
      value={{
        isLoading,
        error,
        filteredFeedbackItems,
        addFeedbackItemToList,
        setFilterItem,
        companyList,
      }}
    >
      {children}
    </FeedbackItemsContext>
  );
};

export { FeedbackItemsContext, FeedbackItemsContextProvider };
