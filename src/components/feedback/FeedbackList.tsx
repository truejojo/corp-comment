import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import type { FeedbackItemProps } from '../../types';

type FeedbackListProps = {
  isLoading: boolean;
  error: string;
  feedbackItems: FeedbackItemProps[] | [];
};

const FeedbackList = ({
  isLoading,
  error,
  feedbackItems,
}: FeedbackListProps) => {
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
