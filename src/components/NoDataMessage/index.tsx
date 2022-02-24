import React from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';

import { Container } from './styles';

interface NoDataMessageProps {
  message?: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message, children }) => {
  return (
    <Container>
      <AiOutlineFileSearch />

      <span>
        {message} {children}
      </span>
    </Container>
  );
};

export default NoDataMessage;
