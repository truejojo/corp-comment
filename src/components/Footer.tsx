import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <small>
        <p>
          &copy; Copyright by{' '}
          <Link target='_blank' to='https://bytegrad.com'>
            ByteGrad.com
          </Link>{' '}
          Intended for learning or your portfolio.
        </p>
        <p>
          <span className='u-bold u-italic'>Not allowed</span> to use as your
          own teaching material.
        </p>
      </small>
    </footer>
  );
};

export default Footer;
