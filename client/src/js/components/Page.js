import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

const Page = (props) => {
  useEffect(() => {
    document.title = "Sociala spel | " + props.title;
  });

  const { title, ...rest } = props;
  return <Route {...rest} />;
}

export default Page;
