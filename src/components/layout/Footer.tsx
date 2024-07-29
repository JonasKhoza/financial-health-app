const Footer = () => {
  return (
    <footer>
      <div>
        <p>Terms and Conditions</p>
        <p>FAQ'S</p>
        <p>{`©${new Date().getFullYear()} All rights reserved`}</p>
      </div>
    </footer>
  );
};

export default Footer;
