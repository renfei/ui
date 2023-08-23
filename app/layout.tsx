import React from 'react'
import './globals.css'
import '../public/antd.min.css'
import {Inter} from 'next/font/google'
import StyledComponentsRegistry from '../lib/AntdRegistry'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
