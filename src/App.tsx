import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import HashTagList from './components/hashtag/HashTagList';
import { FeedbackItemsContextProvider } from './contexts/feedbackItemsContextProvider';

function App() {
  return (
    <div className='app'>
      <Footer />
      <FeedbackItemsContextProvider>
        <Container />
        <HashTagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
