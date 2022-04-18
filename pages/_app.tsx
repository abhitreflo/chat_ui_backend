import '../styles/globals.css';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { wrapper } from '../components/redux/store';

import Backendless from 'backendless'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) =>{
Backendless.initApp('0F12B69E-DAB8-64B1-FF04-5629AD521700', 'D0E9777B-0A5C-4894-8FD3-E92F69AE4D51');

    return (
    <Component {...pageProps} />
);
}
export default wrapper.withRedux(WrappedApp);
