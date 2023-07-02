import type { AppProps } from "next/app";
import { ComponentType, ReactNode } from "react";
import MainLayout from "@/layout/MainLayout/MainLayout";
import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

export type CustomComponent<T = {}> = ComponentType<T> & {
  getLayout?(page: ReactNode): ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as CustomComponent).getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return getLayout(<Component {...pageProps} />);
}
