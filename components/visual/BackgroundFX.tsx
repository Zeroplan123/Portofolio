export default function BackgroundFX() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-44 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full blur-3xl opacity-70 [background:radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]" />
        <div className="absolute top-[28vh] -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-60 [background:radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" />
        <div className="absolute -bottom-56 right-[-8%] h-[680px] w-[820px] rounded-full blur-3xl opacity-60 [background:radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
    </>
  );
}
