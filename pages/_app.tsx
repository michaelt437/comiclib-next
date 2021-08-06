import { AppProps } from "next/app";
import "../styles/globals.css";
import "overlayscrollbars/css/OverlayScrollbars.css";

export default function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
