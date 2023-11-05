import styled from "styled-components";

const colors = {
  blue: "#1a7ff7",
  white: "white",
};

const dashedRectangle = (
  color = "#C5C0C0"
) => `data:image/svg+xml;utf8,<svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="144" height="144" rx="6" fill="white" stroke="${color}" stroke-width="2" stroke-dasharray="5 5"/>
</svg>`;

export const StyledWrapper = styled.section`
  // width: 100%;
  // @media only screen and (min-width: 601px) {
  //   background-image: url('/images/page-background-image.png');
  //   background-position: left;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   position: relative;
  //   height: 100vh;
  // }

  .question {
    padding: 2rem 0;
    display: flex;
    gap: 5rem;
    justify-content: center;
  }

  .cloudWrapper {
    width: fit-content;
    height: fit-content;
  }

  .cloudText {
    font-size: 5rem;
    color: #1a7ff7;
    text-align: center;
  }

  .addCloud {
    background-image: url("/images/Plus-cloud.svg");
  }

  .minusCloud {
    background-image: url("/images/Minus-cloud.svg");
  }

  .divideCloud {
    background-image: url("/images/Divide-cloud.svg");
  }

  .multiplyCloud {
    background-image: url("/images/Multiply-cloud.svg");
  }

  h1 {
    font-size: 3.5rem;
  }
`;

export const StyledBoxWrapper = styled.figure`
  position: relative;
  svg {
    display: none;
  }
  @media only screen and (min-width: 601px) {
    width: 12rem;
    height: 12rem;
  }

  .children {
    left: 0;
    bottom: 40%;
    right: 10%;
    @media only screen and (min-width: 601px) {
      position: absolute;
    }
  }
`;

export const StyledOptions = styled.section`
  margin: 1rem;
  section {
    display: grid;
    grid-template-columns: 25rem 25rem;
    img {
      margin: auto;
      width: 20rem;
      height: 20rem;
    }
    @media only screen and (min-width: 601px) {
      grid-template-columns: 20rem 20rem;
      img {
        width: 18rem;
        height: 18rem;
      }
    }
  }
`;

export const StyledGameControl = styled.section`
  margin-top: 1rem;
  button {
    border: 0;
    padding: 1rem 1.5rem;
    color: ${colors.blue};
    background-color: ${colors.white};
    border-radius: 20%;
    font-size: 2rem;
    height: fit-content;
    @media only screen and (min-width: 601px) {
      img {
        width: 10rem;
        height: 10rem;
      }
    }
  }
`;

export const StyledScore = styled.section`
  top: 0;
  left: 0;
  padding: 1rem;
  color: ${colors.blue};
  // margin-bottom: 5rem;
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
  }
`;

export const ColumnWrapper = styled.section`
  flex-direction: column;
  justify-content: space-between;
`;
