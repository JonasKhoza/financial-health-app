import c from "./styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={c.footer_container}>
      <div className={c.first_container}>
        <p className={c.terms_conditions}>Terms and Conditions</p>
        <p className={c.faqs}>FAQ'S</p>
        <p>{`©${new Date().getFullYear()} All rights reserved`}</p>
      </div>
      <div className={c.second_container}>
        <p>
          FinHealth is a licensed financial services provider in terms of the
          Financial Advisory and Intermediary Services Act and a registered
          credit provider in terms of the National Credit Act.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
