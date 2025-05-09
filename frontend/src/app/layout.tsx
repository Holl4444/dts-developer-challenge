import './globals.css';

export const metadata = {
  title: 'dts-challenge',
  description: 'Task management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


