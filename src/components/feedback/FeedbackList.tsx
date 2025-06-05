import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsContext } from '../../hooks/useFeedbackItemsContext';

const FeedbackList = () => {
  const { isLoading, error, filteredFeedbackItems } =
    useFeedbackItemsContext('FeedbackList');

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
