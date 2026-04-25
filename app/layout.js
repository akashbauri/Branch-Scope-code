export const metadata = {
  title: "BranchScope",
  description: "AI Career Advisor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
