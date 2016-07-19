import React from 'react';

const Loader = ({fetching, error, children}) => {
  if (fetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return children;
  }
}

export default Loader;
