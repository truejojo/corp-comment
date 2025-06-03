import FeedbackItem from './FeedbackItem';

const items = [
  {
    id: '1',
    upvotes: 593,
    bold: 'B',
    title: 'ByteGrad',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus rerum consectetur a!',
    days: 4,
  },
  {
    id: '2',
    upvotes: 223,
    bold: 'Z',
    title: 'Facebook',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus rerum consectetur a! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus rerum consectetur a!',
    days: 2,
  },
];

const FeedbackList = () => {
  return (
    <ol className='feedback-list'>
      {items.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </ol>
  );
};

export default FeedbackList;
