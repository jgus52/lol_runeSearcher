import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../logoSmall.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0px;
  background-color: lightgrey;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 960px;
`;

const Logo = styled.img`
  margin-right: auto;
  width: 118px;
  height: 66px;
  position: fixed;
  left: 0;
`;

const NavLinkStyle = {
  display: "flex",
  color: "black",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 20,
  border: "none",
  height: 75,
  width: 118,
  margin: 10,
  textDecorationLine: "none",
};
const NavLinkActiveStye = {
  display: "flex",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 20,
  border: "none",
  height: 75,
  width: 118,
  margin: 10,
  fontWeight: "bold",
  color: "rgba(255, 192, 203)",
  textDecorationLine: "none",
};

const Header = () => {
  return (
    <Container>
      <Content>
        <Logo src={logo} alt="logo" />
        <NavLink
          to="/"
          style={(props) => (props.isActive ? NavLinkActiveStye : NavLinkStyle)}
        >
          Enemies
        </NavLink>
        <NavLink
          to="/multi"
          style={(props) => (props.isActive ? NavLinkActiveStye : NavLinkStyle)}
        >
          Allies
        </NavLink>
      </Content>
    </Container>
  );
};

export default Header;
