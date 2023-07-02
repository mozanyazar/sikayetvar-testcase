import Head from 'next/head'
import React from 'react'

interface HeadProps {
   title: string
   description?: string
}

function HeadComponent({ title, description }: HeadProps) {
   return (
      <Head>
         <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
         />
         <link
            rel="icon"
            href="/favicon.ico"
         />
         <title>{title}</title>
         <meta
            name="description"
            content={description ? description : 'Şikayet var'}
         ></meta>
      </Head>
   )
}

export default HeadComponent
