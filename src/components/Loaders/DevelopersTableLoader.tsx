import React from 'react';
import ContentLoader from 'react-content-loader';

const TableRow = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      // width={67}
      height={69}
      viewBox="0 0 100% 69"
      {...props}
    >
      <rect x="0" y="8" rx="10" ry="10" width="100%" height="60" />
    </ContentLoader>
  );
};

const DevelopersTableLoader: React.FC = () => {
  return (
    <>
      {Array(5)
        .fill('')
        .map((e, i) => (
          <TableRow
            key={i}
            style={{ opacity: Number(2 / i).toFixed(1) }}
            backgroundColor="#0c2646"
            foregroundColor="#0a2f5c"
            primaryOpacity={1}
            secondaryOpacity={0.6}
          />
        ))}
    </>
  );
};

export default DevelopersTableLoader;
