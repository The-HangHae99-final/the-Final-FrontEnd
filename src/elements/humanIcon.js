import human03 from "../public/img/human03.png";
import styled from "styled-components";

export const Human03 = ({ size }) => {
  console.log(size);
  return (
    <>
      <HumanImg
        src={human03}
        alt="human03"
        size={size}
        style={{
          width: size,
          height: size,
        }}
        className="human03"
      />
    </>
  );
};

const HumanImg = styled.img`
  border-radius: 50%;
`;
