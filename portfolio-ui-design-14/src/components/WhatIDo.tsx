/**
 * "What I Do" section: two content cards (Develop / Design). On touch devices,
 * cards can be expanded by pointer or keyboard, with sibling styling.
 */
import { useState, type KeyboardEvent } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (index: number) => setActive((current) => current === index ? null : index);
  const onKey = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(index); }
  };
  const cardClass = (index: number) => [
    "what-content",
    !ScrollTrigger.isTouch && "what-noTouch",
    active === index && "what-content-active",
    active !== null && active !== index && "what-sibling",
  ].filter(Boolean).join(" ");
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className={`what-box-in${active !== null ? " what-has-active" : ""}`}>
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className={cardClass(0)} role="button" tabIndex={0} aria-expanded={active === 0}
            onClick={() => toggle(0)} onKeyDown={(event) => onKey(event, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Description</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                quia aliquid laboriosam ducimus sit molestiae.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Css</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">PHP</div>
                <div className="what-tags">MySql</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className={cardClass(1)} role="button" tabIndex={0} aria-expanded={active === 1}
            onClick={() => toggle(1)} onKeyDown={(event) => onKey(event, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <h4>Description</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                quia aliquid laboriosam ducimus sit molestiae
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Blender</div>
                <div className="what-tags">Zbrush</div>
                <div className="what-tags">UI Design</div>
                <div className="what-tags">Motion</div>
                <div className="what-tags">Rigging</div>
                <div className="what-tags">3D Animation</div>
                <div className="what-tags">Character Design</div>
                <div className="what-tags">Modelling</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
