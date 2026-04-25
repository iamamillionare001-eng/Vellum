export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="public-profile">
      <header className="profile-header">
        <h1>@{resolvedParams.username}</h1>
      </header>
      <div className="links-container">
        <a href="#" className="link-item">My Latest Video</a>
        <a href="#" className="link-item">Book a Consultation</a>
      </div>
    </div>
  );
}
