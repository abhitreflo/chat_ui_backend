import '../styles/globals.css';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { wrapper } from '../components/redux/store';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);
