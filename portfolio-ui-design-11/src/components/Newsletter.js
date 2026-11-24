import { useEffect, useRef, useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = ({ configured, status, message, onValidated }) => {
  const input = useRef(null);
  const pending = useRef(false);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    if (status === "success" || status === "error") {
      pending.current = false;
      if (status === "success" && input.current) input.current.value = "";
    }
  }, [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!configured || pending.current) return;
    pending.current = true;
    setSubmissionError(false);
    try {
      onValidated({ EMAIL: input.current.value.trim() });
    } catch {
      pending.current = false;
      setSubmissionError(true);
    }
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter<br /> & Never miss latest updates</h3>
            {!configured && <Alert variant="warning">Newsletter signup is not configured.</Alert>}
            {submissionError && <Alert variant="danger">Subscription failed. Please try again.</Alert>}
            {status === "sending" && <Alert role="status">Sending...</Alert>}
            {status === "error" && <Alert variant="danger">{typeof message === "string" ? message : "Subscription failed. Please try again."}</Alert>}
            {status === "success" && <Alert variant="success">{typeof message === "string" ? message : "Subscription successful."}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input ref={input} aria-label="Newsletter email address" type="email" required maxLength={254}
                  disabled={status === "sending"} placeholder="Email Address" />
                <button type="submit" disabled={!configured || status === "sending"}>Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
