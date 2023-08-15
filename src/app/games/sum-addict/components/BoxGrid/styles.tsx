import { breakPoints } from "@/app/lib/style.lib";
import { styled } from "styled-components";

export const StyledBoxGrid = styled.section`
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(3, 5rem);
  @media screen and (min-width: ${breakPoints.xl}px) {
    grid-template-columns: repeat(3, 6rem);
    grid-template-rows: repeat(3, 6rem);
  }
`;
