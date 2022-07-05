import React from "react";
import styled from "styled-components";

const Divider = (props) => {
  return <DividerStyle></DividerStyle>;
};

const DividerStyle = styled.div`
  height: 10px;
  width: ${(props) => props.width || "100%"};
  background-color: #f8f8f9;
`;

export default Divider;
