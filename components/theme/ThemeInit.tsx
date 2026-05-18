export default function ThemeInit() {
  // Default is dark (no `light` class). We only add `light` if stored.
  // This runs before hydration to avoid a flash of incorrect theme.
  const code = `(() => {
  try {
    const saved = localStorage.getItem('theme');
    const isLight = saved === 'light';
    const root = document.documentElement;
    root.classList.toggle('light', isLight);
  } catch {}
})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
