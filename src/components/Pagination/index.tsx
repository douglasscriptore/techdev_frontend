import React from 'react';
// import PropTypes from 'prop-types';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import pagination from '../../utils/pagination';

import { Pagination as PaginationComponent, Item, Button } from './styles';

interface PaginationProps {
  total: number;
  activePage: number;
  onClick(activePage: number): void;
}

const Pagination = ({ total, activePage = 1, onClick }: PaginationProps) => (
  <PaginationComponent>
    <Item onClick={() => (activePage > 1 ? onClick(activePage - 1) : '')}>
      <Button disabled={activePage === 1}>
        <FiChevronsLeft />
      </Button>
    </Item>

    {pagination({ total, activePage }).map((page, index) => (
      // <Item key={index} onClick={() => (page === '...' ? '' : onClick(page))}>
      <Item
        key={index}
        onClick={() => (page.toString() === '...' ? '' : onClick(page))}
      >
        <Button active={page === activePage}>{page}</Button>
      </Item>
    ))}

    <Item onClick={() => (activePage < total ? onClick(activePage + 1) : '')}>
      <Button disabled={activePage === total}>
        <FiChevronsRight />
      </Button>
    </Item>
  </PaginationComponent>
);

// Pagination.defaultProps = {
//   activePage: 1,
// };

// Pagination.propTypes = {
//   total: PropTypes.number,
//   activePage: PropTypes.number,
//   onClick: PropTypes.func,
// };

export default Pagination;
