import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './ConstructionTimelapse.module.css';

const VIDEO_URL =
  'https://res.cloudinary.com/k9uaasxi/video/upload/v1786698102/House_construction_timelapse_video_202608141345.mp4';

export default function ConstructionTimelapse() {
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const headerRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: '0px' });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  // Play / Pause helper
  const playVideo = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    } catch (err) {
      // Browser autoplay policy might block programmatic play
      setIsPlaying(false);
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  }, [isPlaying, pauseVideo, playVideo]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Handle keyboard (Space / Enter)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      }
    },
    [togglePlay]
  );

  // IntersectionObserver for auto-play / auto-pause on scroll
  useEffect(() => {
    if (prefersReduced) return;
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      { threshold: 0.55 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [prefersReduced, playVideo, pauseVideo]);

  // Video progress handler
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  // Video ended handler
  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    setProgress(100);

    if (prefersReduced) return;

    // Wait ~450ms on final frame, then scroll to next sibling element smoothly
    setTimeout(() => {
      const nextSibling = sectionRef.current?.nextElementSibling;
      if (nextSibling) {
        nextSibling.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  // Derive status text
  let statusText = 'Scroll to play';
  if (isPlaying) statusText = 'Playing';
  else if (hasEnded) statusText = 'Finished';
  else if (progress > 0) statusText = 'Paused';

  return (
    <section
      ref={sectionRef}
      id="timelapse"
      className={`section ${styles.timelapseSection}`}
      aria-labelledby="timelapse-heading"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-eyebrow">Watch It Happen</span>
          </div>
          <h2 id="timelapse-heading" className="section-heading">
            From Empty Plot to{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              Finished Home
            </em>
          </h2>
          <p className={styles.subheading}>
            A real construction timelapse — watch a plot transform stage by stage, the same way we build for you.
          </p>
        </motion.div>

        {/* Video Player Container */}
        <motion.div
          className={styles.videoFrame}
          role="button"
          tabIndex={0}
          onClick={togglePlay}
          onKeyDown={handleKeyDown}
          aria-label={`${statusText}. Click to ${isPlaying ? 'pause' : 'play'} construction timelapse video.`}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <video
            ref={videoRef}
            className={styles.videoElement}
            src={VIDEO_URL}
            muted={isMuted}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />

          {/* Vignette Gradient Overlay for Legible Controls */}
          <div className={styles.overlayVignette} aria-hidden="true" />

          {/* Top Bar: Status Pill (Left) & Mute Toggle (Right) */}
          <div className={styles.topControls}>
            <div className={styles.statusPill}>
              <span
                className={`${styles.statusDot} ${isPlaying ? styles.dotActive : ''}`}
                aria-hidden="true"
              />
              <span>{statusText}</span>
            </div>

            <button
              type="button"
              className={styles.muteBtn}
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className={styles.muteLabel}>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>

          {/* Center Play Button Overlay (Shown when paused / ended) */}
          {!isPlaying && (
            <motion.div
              className={styles.centerPlayBtn}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <div className={styles.playIconCircle}>
                <Play size={28} className={styles.playIcon} />
              </div>
            </motion.div>
          )}

          {/* Bottom Edge Progress Bar */}
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
