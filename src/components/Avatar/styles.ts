import styled, { css } from "styled-components";
import media from "styled-media-query";

type AvatarImgProps = {
  scale?: number;
  hasError?: boolean;
  isCropping?: boolean;
};

const avatarImgModifiers = {
  isCropping: (scale?: number) => css`
    transform: ${`scale(${Number(scale)})`};
  `,
};

export const Wrapper = styled.figure`
  ${({ theme }) => css`
    width: 8.4rem;
    height: 8.4rem;
    min-height: 8.4rem;
    min-width: 8.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7.25rem;
    overflow: hidden;
    margin: auto;
    position: relative;
    pointer-events: none;
    background-color: ${theme.colors.gray04};

    ${media.greaterThan("small")`
      width: 11.4rem;
      height: 11.4rem;
      min-height: 11.4rem;
      min-width: 11.4rem;
    `}
  `}
`;

export const AvatarImg = styled.img<AvatarImgProps>`
  ${({ scale, isCropping, hasError }) => css`
    width: ${hasError ? "auto" : "100%"};

    transition: transform 0.3s ease-in-out;

    ${isCropping && avatarImgModifiers.isCropping(scale)}
  `}
`;
