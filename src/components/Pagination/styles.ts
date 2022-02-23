/* eslint-disable no-undef */
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import {
  Pagination as PaginationBase,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

export const Pagination = styled(PaginationBase)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  user-select: none;

  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
  }
`;

export const Item = styled(PaginationItem)`
  margin: 0 1px 0;
  user-select: none;
`;

interface ButtonProps {
  acitve: boolean;
  disabled?: string;
}
export const Button = styled(PaginationLink)<ButtonProps>`
  background: none;
  border: 0;
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  line-height: 30px;
  user-select: none;
  align-items: center;
  border-radius: 0.6rem;
  background-color: var(--background);
  color: var(--text-primary);
  opacity: 0.9;

  background-position: 100% 0;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  &:hover {
    background: ${darken(0.2, '#21E6C1')};
  }

  ${({ active }) =>
    active &&
    css`
      z-index: 0;
      font-weight: 400;
      color: var(--background);
      background-color: var(--accent);

      &:hover {
        opacity: 1;
        background: ${darken(0.2, '#21E6C1')};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      &:hover {
        background-color: transparent;
      }
    `}
`;
