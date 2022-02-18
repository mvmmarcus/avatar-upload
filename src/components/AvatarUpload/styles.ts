import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    max-width: 55.3rem;
    height: 17.7rem;
    border: ${theme.border.dashed};
    border-radius: ${theme.border.radius};
    background-color: ${theme.colors.gray01};
    padding: ${theme.spacings.xsmall};

    ${media.greaterThan("small")`
      padding: ${theme.spacings.medium};
    `}
  `}
`;

export const CancelButton = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;
