import React from 'react';

const Loader = ({fetching, error, children}) => {
  if (fetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return (<div>
      <div>Error: {error.message}</div>
    </div>);
  } else {
    return children;
  }
}

export default Loader;
