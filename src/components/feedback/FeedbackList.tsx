import { useMemo } from 'react';
import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

const FeedbackList = () => {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const error = useFeedbackItemsStore((state) => state.error);
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  const selectedCompany = useFeedbackItemsStore(
    (state) => state.selectedCompany,
  );
  // const filteredFeedbackItems = useFeedbackItemsStore((state) =>
  //   state.getFilteredFeedbackItems(),
  // );

  const filteredFeedbackItems = useMemo(() => {
    if (!selectedCompany) {
      return feedbackItems;
    }

    return feedbackItems.filter((item) => {
      return item.company.toUpperCase() === selectedCompany.toUpperCase();
    });
  }, [feedbackItems, selectedCompany]);

  return (
    <ol className='feedback-list'>
      {isLoading && <Spinner />}

      {error && <ErrorMessage message={error} />}

      {filteredFeedbackItems?.length === 0 && 'Keine Feedbacks vorhanden.'}

      {filteredFeedbackItems?.length > 0 &&
        filteredFeedbackItems.map((item) => (
          <FeedbackItem key={item.id} item={item} />
        ))}
    </ol>
  );
};

export default FeedbackList;
