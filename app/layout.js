import "./globals.css";

export const metadata = {
  title: "BranchScope",
  description: "AI Career Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
