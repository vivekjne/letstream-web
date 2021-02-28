import type { AppProps /*, AppContext */ } from "next/app";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="bg-gray-800 w-full h-full text-white">
        <Component {...pageProps} />
      </main>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default MyApp;
