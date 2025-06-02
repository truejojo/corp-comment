const FeedbackForm = () => {
  return (
    <form className='form'>
      <label htmlFor='feedback-textarea'>
        Enter your feedback here, remember to #hashtag the company
      </label>
      <textarea id='feedback-textarea' spellCheck={false} />
      <div>
        <p className='u-italic'>150</p>
        <button type='button'>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
