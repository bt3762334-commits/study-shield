export default function GlassCard({ children }) {
  return (
    <div className="
      bg-[#1e293b]
      border border-white/10 
      p-6 
      rounded-2xl 
      shadow-lg
      hover:scale-[1.02] 
      transition
      text-white
    ">
      {children}
    </div>
  );
}
