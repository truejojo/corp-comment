import Pattern from './Pattern';
import Logo from './Logo';
import PageHeading from './PageHeading';
import FeedbackForm from './FeedbackForm';

type HeaderProps = {
  addFeedbackItemToList: (text: string) => void;
};

const Header = ({ addFeedbackItemToList }: HeaderProps) => {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm addFeedbackItemToList={addFeedbackItemToList} />
    </header>
  );
};

export default Header;
