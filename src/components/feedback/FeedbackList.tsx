import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';
// import { shallow } from 'zustand/shallow';
// import type { FeedbackItemProps } from '../../types';

// type StateSelector = {
//   isLoading: boolean;
//   error: string;
//   getFilteredFeedbackItems: () => FeedbackItemProps[];
// };

const FeedbackList = () => {
  // // 1. Zustände mit shallow in einem Objekt selektieren
  // const { isLoading, error, getFilteredFeedbackItems } = useFeedbackItemsStore(
  //   (state): StateSelector => ({
  //     isLoading: state.isLoading,
  //     error: state.error,
  //     getFilteredFeedbackItems: state.getFilteredFeedbackItems,
  //   }),
  //   shallow, // shallow als zweites Argument
  // );

  // // 2. Funktion aufrufen um gefilterte Items zu erhalten
  // const filteredFeedbackItems = getFilteredFeedbackItems();
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const error = useFeedbackItemsStore((state) => state.error);
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems(),
  );

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
