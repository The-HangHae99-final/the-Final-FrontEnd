import styled, { css } from "styled-components";

const sizeStyles = css``;

const ButtonStyle = styled.button``;

function Button({ children, size, ...rest }) {
  return (
    <ButtonStyle size={size} {...rest}>
      {children}
    </ButtonStyle>
  );
}
