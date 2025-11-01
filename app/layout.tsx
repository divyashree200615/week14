import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "Simple Task Manager App with Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
