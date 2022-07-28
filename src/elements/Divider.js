import React from "react";
import styled from "styled-components";

const Divider = (props) => {
  return <DividerStyle></DividerStyle>;
};

const DividerStyle = styled.div`
  height: 1px;
  border: 1px solid #dcdce8;
  width: ${(props) => props.width || "100%"};
`;

export default Divider;
