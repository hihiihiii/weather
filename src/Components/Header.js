import React from "react";
import styled from "styled-components";
import { FaHome, FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const HeaderBox = styled.header`
  background-color: #f5f5f5;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  font-size: 18px;
  font-weight: 500;
  margin-right: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;

  a {
    color: black;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Icon = styled.div`
  margin-right: 8px;
`;
const Header = () => {
  return (
    <HeaderBox>
      <Nav>
        <Ul>
          <Li>
            <Link to="/">
              <FaHome />
            </Link>
          </Li>
          <Li>
            <Link to="/recommendations">
              <FaHeart />
            </Link>
          </Li>
          <Li>
            <Link to="/search">
              <FaSearch />
            </Link>
          </Li>
        </Ul>
      </Nav>
    </HeaderBox>
  );
};

export default Header;
