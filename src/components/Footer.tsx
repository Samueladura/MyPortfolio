export function Footer() {
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-xs font-bold">
            S
          </div>
          <span className="text-sm text-slate-500 font-medium">Babayemi Samuel</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-600 text-center">
          Designed & Built with{" "}
          <span className="text-indigo-500">♥</span>
          {" "}by buildwith⩓m™ · © {new Date().getFullYear()}
        </p>

        {/* Version */}
        <div className="text-xs font-mono text-slate-700">v2.0.0</div>
      </div>
    </footer>
  );
}