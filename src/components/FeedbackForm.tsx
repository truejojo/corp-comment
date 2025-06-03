import { useState } from 'react';
import { MAX_CHARS_LENGTH } from '../lib/constants';

type FeedbackFormProps = {
  addFeedbackItemToList: (text: string) => void;
};

const FeedbackForm = ({ addFeedbackItemToList }: FeedbackFormProps) => {
  const [textarea, setTextarea] = useState<string>('');
  const charCount = MAX_CHARS_LENGTH - textarea.length;

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newTextarea = event.target.value;

    if (newTextarea.length <= MAX_CHARS_LENGTH) {
      setTextarea(newTextarea);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textarea.trim() === '') {
      return;
    }

    addFeedbackItemToList(textarea);
    setTextarea('');
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <textarea
        id='feedback-textarea'
        value={textarea}
        onChange={handleTextareaChange}
        placeholder='Default placeholder text for showing the text from label'
        spellCheck={false}
      />
      <label htmlFor='feedback-textarea'>
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className='u-italic'>{charCount}</p>
        <button type='submit'>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
