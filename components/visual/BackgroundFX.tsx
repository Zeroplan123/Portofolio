export default function BackgroundFX() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl opacity-70 [background:radial-gradient(closest-side,rgba(34,211,238,0.22),transparent)]" />
        <div className="absolute top-[30vh] -left-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-60 [background:radial-gradient(closest-side,rgba(124,58,237,0.18),transparent)]" />
        <div className="absolute -bottom-48 right-[-10%] h-[620px] w-[720px] rounded-full blur-3xl opacity-60 [background:radial-gradient(closest-side,rgba(52,211,153,0.14),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>
    </>
  );
}

