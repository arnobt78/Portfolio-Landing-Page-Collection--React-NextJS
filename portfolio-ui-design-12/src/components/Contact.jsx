import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import Map from "./Map";

/* Contact section: form on the left, world map on the right (map hidden on small screens). */
const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e8e6e6;
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
`;

const Right = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

/** Contact form (name, email, message) sent via EmailJS. Configure the public EmailJS identifiers using Vite environment variables. ref attaches to the form for sendForm. */
const Contact = () => {
  const ref = useRef();
  const [status, setStatus] = useState("idle");
  const sending = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending.current) return;
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey) {
      setStatus("unconfigured");
      return;
    }
    sending.current = true;
    setStatus("sending");
    try {
      await emailjs.sendForm(service, template, ref.current, { publicKey });
      ref.current.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  };
  return (
    <Section>
      <Container>
        <Left>
          <Form ref={ref} onSubmit={handleSubmit}>
            <Title>Contact Us</Title>
            <Input placeholder="Name" aria-label="Name" name="name" required disabled={status === "sending"} />
            <Input placeholder="Email" aria-label="Email" name="email" type="email" required disabled={status === "sending"} />
            <TextArea
              placeholder="Write your message"
              aria-label="Message"
              required
              name="message"
              disabled={status === "sending"}
              rows={10}
            />
            <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send"}</Button>
            <div role="status" aria-live="polite">
              {status === "success" && "Your message has been sent. We'll get back to you soon :)"}
              {status === "error" && "Your message could not be sent. Please try again."}
              {status === "unconfigured" && "The contact form is not configured yet."}
            </div>
          </Form>
        </Left>
        <Right>
          <Map />
        </Right>
      </Container>
    </Section>
  );
};

export default Contact;
