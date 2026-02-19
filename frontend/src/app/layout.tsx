import { GastoProvider } from "./contextos/GastoContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GastoProvider>
          {children}
        </GastoProvider>
      </body>
    </html>
  );
}