import React, { useEffect, useRef, useState } from "react";

export default function AudioVisualizer({
  tracks = [],
  currentTrackIndex = null,
  onTrackChange,
  width = "100%",
  height = 300,
  className = ""
}) {
  // Get current track info - handle null case
  const currentTrack = currentTrackIndex !== null && tracks[currentTrackIndex] ? tracks[currentTrackIndex] : { name: 'Select a Track', preset: 'default' };

  // Canvas and audio refs
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const gainRef = useRef(null);
  const bufferRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);
  const backgroundImageRef = useRef(null);

  // Transport state
  const [isPlaying, setIsPlaying] = useState(false);

  // Preset configurations
  const presets = {
    default: {
      palette: ["#ff9966", "#ff5e62", "#ffd26f"],
      reactBass: 1.0,
      reactMid: 1.0,
      reactTreble: 1.0,
      fftSize: 2048,
      smoothing: 0.7,
      volume: 0.8,
      glow: true,
      bgShift: true
    },
    electronic: {
      palette: ["#00f5d4", "#f15bb5", "#fee440"],
      reactBass: 1.5,
      reactMid: 1.2,
      reactTreble: 1.0,
      fftSize: 2048,
      smoothing: 0.6,
      volume: 0.9,
      glow: true,
      bgShift: true
    },
    ambient: {
      palette: ["#aaf0ff", "#66c2ff", "#e6f7ff"],
      reactBass: 0.8,
      reactMid: 1.0,
      reactTreble: 1.3,
      fftSize: 1024,
      smoothing: 0.8,
      volume: 0.7,
      glow: false,
      bgShift: true
    },
    pop: {
      palette: ["#ff9966", "#ff5e62", "#ffd26f"],
      reactBass: 1.4,
      reactMid: 1.1,
      reactTreble: 1.2,
      fftSize: 2048,
      smoothing: 0.7,
      volume: 0.8,
      glow: true,
      bgShift: false
    },
    rock: {
      palette: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
      reactBass: 1.3,
      reactMid: 1.2,
      reactTreble: 0.9,
      fftSize: 2048,
      smoothing: 0.6,
      volume: 0.9,
      glow: true,
      bgShift: false
    }
  };

  const config = presets[currentTrack.preset] || presets.default;

  // Ensure audio context exists
  const ensureAudio = () => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error("Web Audio is not supported in this browser.");
      audioCtxRef.current = new AC();
    }
    const ctx = audioCtxRef.current;
    if (!gainRef.current) {
      gainRef.current = ctx.createGain();
      gainRef.current.gain.value = config.volume;
    }
    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = config.fftSize;
      analyserRef.current.smoothingTimeConstant = config.smoothing;
    } else {
      analyserRef.current.fftSize = config.fftSize;
      analyserRef.current.smoothingTimeConstant = config.smoothing;
    }
    // Connect gain -> analyser -> destination if not already
    try { gainRef.current.disconnect(); } catch {}
    gainRef.current.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);
    return ctx;
  };

  // Load and decode audio file
  const loadAudio = async () => {
    const currentTrack = tracks[currentTrackIndex];
    if (!currentTrack) return;

    try {
      const ctx = ensureAudio();
      if (ctx.state === "suspended") await ctx.resume();

      const response = await fetch(`/media/music/${currentTrack.file}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      bufferRef.current = audioBuffer;

      // Don't auto-play - wait for user interaction
    } catch (err) {
      console.error("Failed to load audio:", err);
    }
  };

  // Start playback
  const play = async () => {
    try {
      const buf = bufferRef.current;
      if (!buf) {
        await loadAudio();
        return;
      }

      const ctx = ensureAudio();
      if (ctx.state === "suspended") await ctx.resume();

      // Stop any previous source
      try { sourceRef.current?.stop(0); sourceRef.current?.disconnect(); } catch {}

      const src = ctx.createBufferSource();
      src.buffer = buf;
      sourceRef.current = src;
      src.connect(gainRef.current);

      src.start(0);
      setIsPlaying(true);

      // Loop the audio
      src.loop = true;

      // When source ends (if not looping), reset play state
      src.onended = () => {
        setIsPlaying(false);
      };

      loop();
    } catch (err) {
      console.error("Play failed:", err);
    }
  };

  // Pause playback
  const pause = () => {
    try {
      if (sourceRef.current) {
        sourceRef.current.stop(0);
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
    } catch (err) {
      console.error("Pause failed:", err);
    }
  };

  // Analysis helpers
  const getBands = (freq, sampleRate, fft) => {
    const binHz = sampleRate / fft;
    const sumRange = (lo, hi) => {
      const startIdx = Math.max(0, Math.floor(lo / binHz));
      const endIdx = Math.min(freq.length - 1, Math.ceil(hi / binHz));
      let s = 0; let c = 0;
      for (let i = startIdx; i <= endIdx; i++) { s += freq[i]; c++; }
      return c ? s / (c * 255) : 0;
    };
    const bass = sumRange(20, 150);
    const mid = sumRange(400, 2000);
    const treble = sumRange(4000, 12000);
    return { bass, mid, treble };
  };

  const getRMS = (time) => {
    let sum = 0;
    for (let i = 0; i < time.length; i++) {
      const v = (time[i] - 128) / 128;
      sum += v * v;
    }
    return Math.sqrt(sum / time.length);
  };



  // Render loop
  const loop = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const actx = audioCtxRef.current;
    if (!canvas || !analyser || !actx) return;

    const ctx2d = canvas.getContext("2d");

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const w = (canvas.width = canvas.clientWidth * window.devicePixelRatio);
      const h = (canvas.height = canvas.clientHeight * window.devicePixelRatio);

      const len = analyser.frequencyBinCount;
      const freq = new Uint8Array(len);
      const time = new Uint8Array(len);
      analyser.getByteFrequencyData(freq);
      analyser.getByteTimeDomainData(time);
      const bands = getBands(freq, actx.sampleRate, analyser.fftSize);
      const energy = getRMS(time);

      // Dark grey background
      ctx2d.fillStyle = "#1a1a1a";
      ctx2d.fillRect(0, 0, w, h);

      // Apply color overlay that reacts to treble
      if (config.bgShift) {
        const t = Math.min(1, bands.treble * config.reactTreble * 1.5);
        ctx2d.fillStyle = `rgba(0,0,0,${0.3 - t * 0.2})`;
        ctx2d.fillRect(0, 0, w, h);
      }

      // Glow effect
      if (config.glow) {
        ctx2d.shadowBlur = 20;
        ctx2d.shadowColor = config.palette[1];
      } else {
        ctx2d.shadowBlur = 0;
      }

      // Waveform ribbons visualization
      const time2 = new Uint8Array(len);
      analyser.getByteTimeDomainData(time2);
      const thickness = 1 + Math.floor(4 * Math.min(1, energy * 3));
      ctx2d.lineWidth = thickness;

      const drawWave = (amp, color, yOffset = 0) => {
        ctx2d.strokeStyle = color;
        ctx2d.beginPath();
        for (let i = 0; i < len; i++) {
          const x = (i / (len - 1)) * w;
          const v = (time2[i] - 128) / 128;
          const y = h / 2 + yOffset + v * (h / 2) * amp;
          if (i === 0) ctx2d.moveTo(x, y); else ctx2d.lineTo(x, y);
        }
        ctx2d.stroke();
      };

      // Draw main waveform
      drawWave(0.7, config.palette[0], 0);

      // Draw secondary waveform that reacts to treble
      drawWave(
        Math.min(0.2 + bands.treble * config.reactTreble, 0.6),
        config.palette[1],
        Math.sin(Date.now()/350) * 10
      );
    };

    draw();
  };

  // React to parameter changes
  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = config.volume;
    if (analyserRef.current) {
      analyserRef.current.fftSize = config.fftSize;
      analyserRef.current.smoothingTimeConstant = config.smoothing;
    }
  }, [config.volume, config.fftSize, config.smoothing]);

  // Handle track button clicks - toggle play/pause for current track
  const handleTrackClick = async (index) => {
    if (currentTrackIndex === index) {
      // Clicking the same track - toggle play/pause
      if (isPlaying) {
        pause();
      } else {
        await play();
      }
    } else {
      // Changing to a different track
      if (isPlaying) {
        pause();
      }
      onTrackChange && onTrackChange(index);
    }
  };

  // Initialize when component mounts or track changes
  useEffect(() => {
    if (currentTrack && currentTrack.file) {
      loadAudio();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      try { sourceRef.current?.stop(0); } catch {}
    };
  }, [currentTrackIndex, tracks]);

  // Get current palette for styling
  const currentPalette = presets[currentTrack.preset]?.palette || presets.default.palette;

  return (
    <div className={`cassette-visualizer ${className}`} style={{ width }}>
      {/* Cassette Tape Body */}
      <div className="cassette-body">
        {/* Track Selection Buttons */}
        <div className="cassette-controls">
          {tracks.map((track, index) => (
            <button
              key={index}
              className={`track-button ${currentTrackIndex === index ? 'active' : ''}`}
              onClick={() => handleTrackClick(index)}
              style={{
                backgroundColor: currentTrackIndex === index && isPlaying ? '#ff4444' : currentTrackIndex === index ? '#cccccc' : 'rgba(255, 255, 255, 0.1)',
                borderColor: currentTrackIndex === index ? '#999999' : '#666',
                color: currentTrackIndex === index ? '#000' : '#fff',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
              }}
            >
              {track.name}
            </button>
          ))}
        </div>

        {/* Cassette Window (Visualizer) */}
        <div className="cassette-window">
          <div className="window-frame">
            <canvas
              ref={canvasRef}
              className="visualizer-screen"
              style={{ height: height - 80 }} // Account for controls and frame
            />
          </div>
        </div>

        {/* Track Info */}
        <div className="cassette-info">
          <div className="track-name" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>{currentTrack.name}</div>
          <div className="track-description">
            {currentTrack.preset === 'electronic' && (
              <span style={{ color: currentPalette[1], fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                Neon dreams and digital pulses create an immersive electronic soundscape
              </span>
            )}
            {currentTrack.preset === 'ambient' && (
              <span style={{ color: currentPalette[1], fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                Ethereal atmospheres and gentle textures for deep contemplation
              </span>
            )}
            {currentTrack.preset === 'pop' && (
              <span style={{ color: currentPalette[1], fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                Catchy melodies and upbeat rhythms that get stuck in your head
              </span>
            )}
            {currentTrack.preset === 'rock' && (
              <span style={{ color: currentPalette[1], fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                Raw energy and powerful riffs that drive the soul
              </span>
            )}
            {currentTrack.preset === 'default' && (
              <span style={{ color: currentPalette[1], fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                Classic waveform visualization with balanced frequency response
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
