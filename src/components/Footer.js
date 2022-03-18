import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="d-flex flex-column flex-sm-row pb-2 justify-content-between px-3 px-md-5 border-top pt-3 mt-5">
      <p>FinancialBlog.com &copy; {currentYear}</p>
      <Link to="/about">About us</Link>
    </footer>
  );
};

export default Footer;
