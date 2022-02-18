import styled, { css } from "styled-components";

// import * as ButtonStyles from "components/Button/styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 27.6rem;
`;

export const SliderGroup = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 27.6rem;
    margin-bottom: ${theme.spacings.medium};
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    line-height: 2.8rem;
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.normal};
    color: ${theme.colors.gray05};
    margin-bottom: ${theme.font.sizes.xsmall};
  `}
`;

export const SliderInput = styled.input.attrs({ type: "range" })`
  ${({ theme, value }) => css`
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    height: 0.2rem;
    min-height: 0.2rem;
    border-radius: 0.1rem;
    background: ${`linear-gradient(
      to right,
      ${theme.colors.blue01} 0%,
      ${theme.colors.blue01} ${(Number(value) - 1) * 100}%,
      ${theme.colors.blue04} ${(Number(value) - 1) * 100}%,
      ${theme.colors.blue04} 100%
    )`};

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${theme.colors.blue01};
    }

    ::-moz-range-thumb {
      -moz-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${theme.colors.blue01};
    }
  `}
`;
