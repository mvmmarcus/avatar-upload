import styled, { css } from "styled-components";

type AvatarImgProps = {
  scale?: number;
  isCropping?: boolean;
};

const avatarImgModifiers = {
  isCropping: (scale?: number) => css`
    transform: ${`scale(${Number(scale)})`};
  `,
};

export const Wrapper = styled.figure`
  ${({ theme }) => css`
    width: 11.4rem;
    height: 11.4rem;
    min-height: 11.4rem;
    min-width: 11.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7.25rem;
    overflow: hidden;
    margin: auto;
    background-color: ${theme.colors.gray04};
  `}
`;

export const AvatarImg = styled.img<AvatarImgProps>`
  ${({ scale, isCropping }) => css`
    ${isCropping && avatarImgModifiers.isCropping(scale)}
  `}
`;
