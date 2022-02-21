import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type WrapperProps = {
  isDraggable?: boolean;
  isDragOver?: boolean;
};

const wrapperModifiers = {
  isDragOver: (theme: DefaultTheme) => css`
    border: ${theme.border.activeDashed};
  `,
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isDraggable, isDragOver }) => css`
    width: 100%;
    display: flex;
    max-width: 55.3rem;
    height: 17.7rem;
    border: ${isDraggable ? theme.border.dashed : "none"};
    border-radius: ${theme.border.radius};
    background-color: ${theme.colors.gray01};
    padding: ${theme.spacings.xsmall};

    ${media.greaterThan("small")`
      padding: ${theme.spacings.medium};
    `}

    ${isDragOver && wrapperModifiers.isDragOver(theme)}
  `}
`;

export const CancelButton = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

export const FileInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0 y;
`;
