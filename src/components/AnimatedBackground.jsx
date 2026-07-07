import ParticleBackground from './ParticleBackground';

function AnimatedBackground() {
  return (
    <>
      <div className="animated-bg">
        <div className="spotlight-vignette"></div>
        <div className="luxury-glow"></div>
        <div className="aura-blob blob-1"></div>
        <div className="aura-blob blob-2"></div>
        <div className="aura-blob blob-3"></div>
        <div className="noise-overlay"></div>
      </div>
      <ParticleBackground />
    </>
  );
}

export default AnimatedBackground;
