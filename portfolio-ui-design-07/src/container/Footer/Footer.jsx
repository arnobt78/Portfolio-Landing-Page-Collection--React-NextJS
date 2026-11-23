import React, { useRef, useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

// Contact section uses the local demo client and does not send messages.
const Footer = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setLoading(true);
    setStatus('');

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    try {
      await client.create(contact);
      setStatus('Demo only: your message was not sent or stored.');
    } catch {
      setStatus('The demo could not be completed. Please try again.');
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:john@doe.com" className="p-text">
            john@doe.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (123) 456-7890" className="p-text">
            +1 (123) 456-7890
          </a>
        </div>
      </div>
      <p className="p-text">Demo only: messages are not sent or stored.</p>
      <form className="app__footer-form app__flex" onSubmit={handleSubmit}>
        <div className="app__flex">
          <input
            className="p-text"
            type="text"
            aria-label="Your Name"
            required
            disabled={loading}
            placeholder="Your Name"
            name="username"
            value={username}
            onChange={handleChangeInput}
          />
        </div>
        <div className="app__flex">
          <input
            className="p-text"
            type="email"
            aria-label="Your Email"
            required
            disabled={loading}
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <textarea
            className="p-text"
            aria-label="Your Message"
            required
            disabled={loading}
            placeholder="Your Message"
            value={message}
            name="message"
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="p-text" disabled={loading}>
          {!loading ? 'Send Message' : 'Sending...'}
        </button>
        <p role="status" className="p-text">{status}</p>
      </form>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
