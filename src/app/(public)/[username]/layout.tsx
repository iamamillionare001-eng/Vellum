export default function PublicLinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-link-layout">
      <main className="public-main">{children}</main>
    </div>
  );
}
