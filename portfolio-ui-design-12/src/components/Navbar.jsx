import React from "react";
import styled from "styled-components";

/* Navbar layout: centered max-width container, logo + nav links on left, search icon + CTA on right. */
const Section = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: min(1400px, 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Logo = styled.img`
  height: 24px;
`;

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  a { color: inherit; text-decoration: none; }
  a:focus-visible { outline: 2px solid #da4ea2; outline-offset: 4px; }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #da4ea2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

/** Top navigation: logo, nav items (Home, Studio, Works, Contact), search icon, and "Hire Now" button. Navigation links target the page sections. */
const Navbar = () => {
  return (
    <Section>
      <Container>
        <Links>
          <Logo src="/img/logo.png" alt="Portfolio logo" />
          <List>
            <ListItem><a href="#home">Home</a></ListItem>
            <ListItem><a href="#studio">Studio</a></ListItem>
            <ListItem><a href="#works">Works</a></ListItem>
            <ListItem><a href="#contact">Contact</a></ListItem>
          </List>
        </Links>
        <Icons>
          {/* Changed the image due to copyright problems */}
          <Icon src="/img/search.png" alt="" aria-hidden="true" />
          <Button as="a" href="#contact" style={{ textAlign: "center", textDecoration: "none" }}>Hire Now</Button>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
