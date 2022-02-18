import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: ${theme.spacings.xsmall};
  `}
`;
