export default function AnimatedBg() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,#ff5b84_0%,rgba(15,23,42,0)_40%),radial-gradient(circle_at_80%_0%,#6366f1_0%,rgba(15,23,42,0)_40%),radial-gradient(circle_at_10%_90%,#f97316_0%,rgba(15,23,42,0)_35%),radial-gradient(circle_at_90%_80%,#06b6d4_0%,rgba(15,23,42,0)_40%)] bg-[length:140%_140%] animate-gradient-move opacity-60"
    ></div>
  );
}
