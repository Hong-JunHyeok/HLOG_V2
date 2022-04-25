import React, { useEffect } from "react";
import { AppProps } from "next/app"
import { SWRConfig } from "swr";
import fetcher from "utils/fetcher";
import ErrorBoundary from 'components/Common/ErrorBoundary';
import FallbackLoader from 'components/Common/Loader/FallbackLoader'
import { CookiesProvider } from "react-cookie";
import { wrapper } from "../store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<ErrorBoundary fallback={<>Error</>}>
				<React.Suspense fallback={<FallbackLoader />}>
					<SWRConfig value={{
						refreshInterval: 3000,
						fetcher,
						suspense: true
					}}>
						<CookiesProvider>
							<Component {...pageProps} />
						</CookiesProvider>
					</SWRConfig>
				</React.Suspense>
			</ErrorBoundary>
		</React.StrictMode>
	);
}

export default wrapper.withRedux(MyApp);
