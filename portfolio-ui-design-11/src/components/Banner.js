import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "./Visibility";

// Text options for the typing effect; ROTATE_PERIOD = pause (ms) when text is fully shown before deleting.
const ROTATE_TEXTS = ["Web Developer", "Web Designer", "UI/UX Designer"];
const ROTATE_PERIOD = 2000;

// Hero section: headline, typing/rotating title, short intro, and CTA. Uses TrackVisibility for scroll-in animations.
export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);     // Index of current phrase in ROTATE_TEXTS.
  const [isDeleting, setIsDeleting] = useState(false); // True when backspacing.
  const [text, setText] = useState("");           // Currently visible substring.
  const [delta, setDelta] = useState(250);         // Interval (ms) between character add/remove; speeds up when deleting.
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    const update = (event) => setReducedMotion(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const tick = () => {
      let i = loopNum % ROTATE_TEXTS.length;
      let fullText = ROTATE_TEXTS[i];
      let updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(80);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(ROTATE_PERIOD);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    };

    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta, isDeleting, loopNum, reducedMotion]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            {/* TrackVisibility: adds animate.css classes when section enters viewport for fade-in effect. */}
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    Hi! I’m John Doe
                    <br />
                    <span
                      className="txt-rotate"
                      data-period="1000"
                      data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'
                    >
                      <span className="wrap">{reducedMotion ? ROTATE_TEXTS[0] : text}</span>
                    </span>
                  </h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </p>
                  <a className="connect-link" href="#connect">
                    Let’s Connect <ArrowRightCircle size={25} />
                  </a>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
