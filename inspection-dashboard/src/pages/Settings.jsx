export default function Settings() {
  return (
    <div className="page-container">
      <h2>Settings</h2>
      <p>You can manage application preferences here.</p>

      <ul style={{ marginTop: "16px" }}>
        <li>🔔 Notification Settings</li>
        <li>🔐 Change Password</li>
        <li>🎨 Theme Preferences</li>
      </ul>
    </div>
  );
}