import React, { useEffect, useState } from "react";
import c from "./styles/home.module.css";

const HomePage: React.FC = () => {
  // State to track if the header should have a different background color on scroll
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={c.home_page}>
      <header className={`${c.header} ${scrolled ? c.scrolled : ""}`}>
        <div className={c.logo}>FinancialHealthApp</div>
        <nav className={c.nav}>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#help">Help</a>
        </nav>
      </header>
      <section className={c.hero}>
        <h1>Assess and Improve Your Financial Health</h1>
        <p>Get personalized advice and track your financial progress.</p>
        <a href="#quiz">
          <button className={c.cta_button}>
            Start Your Financial Health Check
          </button>
        </a>
      </section>
      <section className={c.introduction}>
        <h2>Why Use Our App?</h2>
        <p>
          Our app helps you understand your financial situation and offers
          tailored advice to improve it.
        </p>
        <div className={c.features}>
          <div className={c.feature}>
            <h3>Personalized Advice</h3>
            <p>Receive tailored recommendations based on your responses.</p>
          </div>
          <div className={c.feature}>
            <h3>Track Your Progress</h3>
            <p>Monitor your financial health and see improvements over time.</p>
          </div>
          <div className={c.feature}>
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface for a smooth experience.</p>
          </div>
        </div>
      </section>
      <section className={c.how_it_works}>
        <h2>How It Works</h2>
        <ol>
          <li>
            Take the Quiz: Answer questions about your financial situation.
          </li>
          <li>
            Get Your Score: Receive a score out of 10 for various financial
            categories.
          </li>
          <li>
            Receive Recommendations: Get personalized advice on improving your
            financial health.
          </li>
        </ol>
      </section>
      <section className={c.testimonials}>
        <h2>What Our Users Say</h2>
        <div className={c.testimonial}>
          <p>
            "This app helped me understand my finances better and provided
            actionable advice!"
          </p>
          <cite>- Alex</cite>
        </div>
      </section>
      <footer className={c.footer}>
        <nav className={c.footer_nav}>
          <a href="#privacy_policy">Privacy Policy</a>
          <a href="#terms_of_service">Terms of Service</a>
        </nav>
        <div className={c.contact_info}>
          <p>
            Contact us:{" "}
            <a href="mailto:support@example.com">support@example.com</a>
          </p>
        </div>
        <div className={c.social_media}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
