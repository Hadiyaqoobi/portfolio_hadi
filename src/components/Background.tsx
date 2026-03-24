export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle, #334155 0.5px, transparent 0.5px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Subtle top gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.07]"
        style={{
          background: 'radial-gradient(ellipse, #3B82F6, transparent 70%)',
        }}
      />
    </div>
  );
};
