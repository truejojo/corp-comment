import { TriangleUpIcon } from '@radix-ui/react-icons';

const FeedbackList = () => {
  return (
    <ol className='feedback-list'>
      <li className='feedback'>
        <button type='button'>
          <TriangleUpIcon />
          <span>593</span>
        </button>
        <div>
          <p>B</p>
        </div>
        <div>
          <p>ByteGrad</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
            rerum consectetur a!
          </p>
        </div>
        <p>4d</p>
      </li>
    </ol>
  );
};

export default FeedbackList;
