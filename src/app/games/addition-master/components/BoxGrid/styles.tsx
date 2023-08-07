import { breakPoints } from "@/app/lib/constants";
import { styled } from "styled-components";

export const StyledBoxGrid = styled.section`
  grid-template-columns: repeat(3, 10rem);
  grid-template-rows: repeat(3, 10rem);
  @media screen and (min-width: ${breakPoints.sm}px) {
    grid-template-columns: repeat(3, 8rem);
    grid-template-rows: repeat(3, 8rem);
  }
`;
