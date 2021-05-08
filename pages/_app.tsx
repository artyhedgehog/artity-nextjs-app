import React, { FC } from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';
import { reduxWrapper } from '../client/redux/store';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
      <Component { ...pageProps } />
  );
};

// noinspection JSUnusedGlobalSymbols
export default reduxWrapper.withRedux(App);
