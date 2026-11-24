import React, { useState } from "react";
import styled from "styled-components";
import Development from "./Development";
import ProductDesign from "./ProductDesign";
import WebDesign from "./WebDesign";

/* Category list for the Works section. Only Web Design, Development, and Product Design have 3D views; others fall back to ProductDesign. */
const data = [
  "Web Design",
  "Development",
  "Illustration",
  "Product Design",
  "Social Media",
];

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 14px;
  font-weight: 300;
`;

const Container = styled.div`
  width: min(1400px, 100%);
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex: 0 0 auto;
    padding: 20px;
    justify-content: center;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.button`
  display: block;
  padding: 0;
  border: 0;
  background: none;
  text-align: left;
  font-family: inherit;
  &:focus-visible { outline: 2px solid #da4ea2; outline-offset: 4px; }
  font-size: 90px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: white;
    -webkit-text-stroke: 0px;
  }

  /* Pseudo-element shows the same text in pink; width animates on hover for a fill effect. */
  ::after {
    content: "${(props) => props.$text}";
    position: absolute;
    top: 0;
    left: 0;
    color: pink;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    ::after {
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  min-height: 0;
`;

/** Works section: left = list of categories (hover fill effect); right = 3D view (WebDesign = Mac, Development = Atom, else ProductDesign = Shoe). */
const Works = () => {
  const [work, setWork] = useState("Web Design");
  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((item) => (
              <li key={item}><ListItem type="button" $text={item} aria-pressed={work === item} onClick={() => setWork(item)}>
                {item}
              </ListItem></li>
            ))}
          </List>
        </Left>
        <Right>
          {/* Only three categories have dedicated 3D components; Illustration and Social Media show ProductDesign. */}
          {work === "Web Design" ? (
            <WebDesign />
          ) : work === "Development" ? (
            <Development />
          ) : (
            <ProductDesign />
          )}
        </Right>
      </Container>
    </Section>
  );
};

export default Works;
