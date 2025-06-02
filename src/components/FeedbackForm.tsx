import { useState } from 'react';
import { MAX_CHARS_LENGTH } from '../lib/constants';

const FeedbackForm = () => {
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

  return (
    <form className='form'>
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
        <button type='button'>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
