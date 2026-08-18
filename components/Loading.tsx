export const Loading = () => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      <h1
        className="
          relative
          text-8xl
          font-black
          tracking-wider
          text-transparent
          bg-clip-text
          bg-linear-to-b
          from-yellow-200
          via-yellow-400
          to-yellow-700
          [-webkit-text-stroke:3px_#fff7cc]
          drop-shadow-[0_0_10px_#facc15]
          animate-[goldGlow_2s_ease-in-out_infinite]
          text-center
        "
      >
        Money Line
      </h1>
    </div>
  );
};
