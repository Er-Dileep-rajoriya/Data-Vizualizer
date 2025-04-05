import React from "react";

function ChartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-10 px-4">
      <div className="w-full max-w-6xl bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300 ease-in-out">
        <div className="w-full h-[300px] sm:h-[500px] overflow-hidden m-auto flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ChartLayout;
