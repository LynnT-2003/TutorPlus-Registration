import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { PageTransition } from 'next-page-transitions';
import { useRouter } from 'next/router';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) { const router = useRouter();
  return (
    <SessionProvider session={session}>
      <PageTransition timeout={300}
        classNames="page-transition"
        skipInitialTransition>
        <Component {...pageProps} key={router.route} />
      </PageTransition>
    </SessionProvider>
  );
}
