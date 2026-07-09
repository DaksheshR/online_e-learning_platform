export default function FormCard({ title, children }) {
  return (
    <div className="glass-card form-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
