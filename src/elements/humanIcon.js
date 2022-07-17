import human03 from "../public/img/human03.png";
import human04 from "../public/img/human04.png";

import styled from "styled-components";

export const Human03 = ({ size, position, top, right, left }) => {
  return (
    <>
      <HumanImg
        src={human03}
        alt="human03"
        size={size}
        style={{
          width: size,
          height: size,
          position: position,
          top: top,
          right: right,
          left: left,
        }}
      />
    </>
  );
};

export const Human04 = ({ size, position, top, right, left }) => {
  return (
    <>
      <HumanImg
        src={human04}
        alt="human04"
        size={size}
        style={{
          width: size,
          height: size,
          position: position,
          top: top,
          right: right,
          left: left,
        }}
      />
    </>
  );
};

const HumanImg = styled.img`
  border-radius: 50%;
`;
