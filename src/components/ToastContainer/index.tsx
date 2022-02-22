import React from 'react';
import { ToastContainer } from './styles';

// export default function WrappedToastContainer({ className, ...rest }) {
//   return (
//     <div className={className}>
//       <ToastContainer {...rest} />
//     </div>
//   )
// }
interface WrappedToastContainerProps {
  className?: string;
  autoClose?: number;
}

const WrappedToastContainer: React.FC<WrappedToastContainerProps> = ({
  className,
  ...rest
}: WrappedToastContainerProps) => {
  return (
    <div className={className}>
      <ToastContainer {...rest} />
    </div>
  );
};

export default WrappedToastContainer;
