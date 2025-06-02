import Pattern from './Pattern';
import Logo from './Logo';
import PageHeading from './PageHeading';
import FeedbackForm from './FeedbackForm';

const Header = () => {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
};

export default Header;
