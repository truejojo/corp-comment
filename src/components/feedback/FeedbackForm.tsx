import { useState } from 'react';
import { MAX_CHARS_LENGTH } from '../../lib/constants';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

type ValidatedTextarea = 'valid' | 'invalid' | 'default';

const FeedbackForm = () => {
  const [textarea, setTextarea] = useState<string>('');
  const [textareaValidation, setTextareaValidation] =
    useState<ValidatedTextarea>('default');
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);
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
    if (!/#[a-zA-Z]/.test(textarea)) {
      setTextareaValidation('invalid');

      setTimeoutValidation();
      return;
    } else {
      setTimeoutValidation();
      setTextareaValidation('valid');
    }

    addItemToList(textarea);
    setTextarea('');
  };

  const setTimeoutValidation = () => {
    setTimeout(() => {
      setTextareaValidation('default');
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${textareaValidation === 'valid' ? 'form--valid' : ''} ${
        textareaValidation === 'invalid' ? 'form--invalid' : ''
      }`}
    >
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
