import { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from './Visibility';

// Contact section: form posts to backend POST /contact; success/error message shown below. Requires server running and .env email config.
export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [sending, setSending] = useState(false);
  const submitting = useRef(false);
  const [status, setStatus] = useState({}); // { success: boolean, message: string } after submit.

  const onFormUpdate = (category, value) => {
      setFormDetails((current) => ({
        ...current,
        [category]: value
      }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting.current) return;
    const endpoint = import.meta.env.VITE_CONTACT_API_URL || (import.meta.env.DEV ? "http://localhost:5000/contact" : "");
    if (!endpoint) {
      setStatus({ success: false, message: "Contact service is not configured." });
      return;
    }
    submitting.current = true;
    setSending(true);
    setStatus({});
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });
      const result = await response.json();
      if (!response.ok || result.code !== 200) throw new Error("Contact request failed");
      setFormDetails(formInitialDetails);
      setStatus({ success: true, message: "Message sent successfully" });
    } catch {
      setStatus({ success: false, message: "Something went wrong, please try again later." });
    } finally {
      submitting.current = false;
      setSending(false);
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input aria-label="First Name" required maxLength={100} disabled={sending} type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input aria-label="Last Name" required maxLength={100} disabled={sending} type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input aria-label="Email Address" required maxLength={254} disabled={sending} type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input aria-label="Phone No." maxLength={40} disabled={sending} type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea aria-label="Message" required maxLength={5000} disabled={sending} rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit" disabled={sending}><span>{sending ? "Sending..." : "Send"}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p role="status" className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
