import Header from './Header';
import FeedbackList from './FeedbackList';
import type { FeedbackItemProps } from '../types';

type ContainerProps = {
  isLoading: boolean;
  error: string;
  feedbackItems: FeedbackItemProps[] | [];
  addFeedbackItemToList: (text: string) => void;
};

const Container = ({
  isLoading,
  error,
  feedbackItems,
  addFeedbackItemToList,
}: ContainerProps) => {
  return (
    <main className='container'>
      <Header addFeedbackItemToList={addFeedbackItemToList} />
      <FeedbackList
        isLoading={isLoading}
        error={error}
        feedbackItems={feedbackItems}
      />
    </main>
  );
};

export default Container;
