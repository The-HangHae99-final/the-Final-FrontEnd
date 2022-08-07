import React from "react";
import styled from "styled-components";

const Desktoplayout = (props) => {
  return <DesktoplayoutStyle>{props.children}</DesktoplayoutStyle>;
};

const DesktoplayoutStyle = styled.div`
  width: 100%;
  height: 100%;
`;

export default Desktoplayout;
