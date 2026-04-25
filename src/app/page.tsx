import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Vellum</h1>
      <p>Next-generation creator automation platform</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link href="/dashboard" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', textDecoration: 'none' }}>
          Creator Dashboard
        </Link>
        <Link href="/creator_username" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', textDecoration: 'none' }}>
          Example Public Link-in-Bio
        </Link>
      </div>
    </div>
  );
}
