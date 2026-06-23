export default function GlassCard({ children }) {
  return (
    <div className="
      bg-white/5 
      backdrop-blur-lg 
      border border-white/10 
      p-6 
      rounded-2xl 
      shadow-lg
      hover:scale-[1.02] 
      transition
    ">
      {children}
    </div>
  );
}
