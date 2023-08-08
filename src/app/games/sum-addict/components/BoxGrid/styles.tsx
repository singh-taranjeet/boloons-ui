import { breakPoints } from "@/app/lib/constants";
import { styled } from "styled-components";

export const StyledBoxGrid = styled.section`
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(3, 5rem);
  @media screen and (min-width: ${breakPoints.lg}px) {
    grid-template-columns: repeat(3, 8rem);
    grid-template-rows: repeat(3, 8rem);
  }
`;
