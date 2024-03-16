import React, { useState } from 'react';
import "./NewsLetter.css";
import NewsletterImage from '../../assets/post.jpg'; 

interface NewsLetterProps {
  theme: string;
}

const NewsLetter: React.FC<NewsLetterProps> = ({ theme }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('https://api-staging.bitdelta.com/api/v1/public/news-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => setMessage(''), 2000);
        setEmail("");
      } else {
        setError(data.error);
        setTimeout(() => setError(''), 2000);
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setError('An error occurred while subscribing. Please try again later.');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="newsletter-card">
      <div className="newsletter-form-container">
        <h2 className={`${theme === 'dark' ? 'white-text' : ''}`}>Subscribe to Our Newsletter</h2>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && (
          <div className="newsletter-message-card">
            <p className="newsletter-message">{message}</p>
          </div>
        )}
        {error && (
          <div className="newsletter-error-card">
            <p className="newsletter-error">{error}</p>
          </div>
        )}
      </div>
      <div className="newsletter-image-container">
        <img src={NewsletterImage} alt="Newsletter" className="newsletter-image" />
      </div>
    </div>
  );
};

export default NewsLetter;
