/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";

const UNLOCK_AT = new Date("2026-08-01T10:00:00+05:30");

function Heart3D() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.18;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.035;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh position={[-0.28, 0.2, 0]}>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial color="#ff4f91" emissive="#ff174f" emissiveIntensity={1.4} roughness={0.22} metalness={0.15} />
        </mesh>
        <mesh position={[0.28, 0.2, 0]}>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial color="#ff4f91" emissive="#ff174f" emissiveIntensity={1.4} roughness={0.22} metalness={0.15} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI]} position={[0, -0.22, 0]}>
          <coneGeometry args={[0.82, 1.55, 64]} />
          <meshStandardMaterial color="#ff4f91" emissive="#ff174f" emissiveIntensity={1.4} roughness={0.22} metalness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

function Background3D() {
  return (
    <div className="canvas-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 3, 4]} intensity={25} color="#ff5a9d" />
        <pointLight position={[-3, -1, 2]} intensity={12} color="#8c5cff" />
        <Sparkles count={85} scale={[12, 7, 5]} size={1.7} speed={0.35} color="#ffd0e4" />
        <Heart3D />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

function getRemaining() {
  const diff = Math.max(0, UNLOCK_AT - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    unlocked: diff === 0,
  };
}

export default function Home() {
  const [remaining, setRemaining] = useState(getRemaining());
  const [entered, setEntered] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unlocked = remaining.unlocked;
  const photos = useMemo(() => ["/images/pooja-1.jpg", "/images/pooja-2.jpg"], []);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = 0.45;
      await audio.play();
      setAudioOn(true);
    } catch {
      setAudioOn(false);
    }
  };

  const enter = async () => {
    setEntered(true);
    if (unlocked) await startMusic();
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await startMusic();
    else {
      audio.pause();
      setAudioOn(false);
    }
  };

  return (
    <main>
      <audio ref={audioRef} src="/music/romantic-song.mp3" loop preload="none" />

      <Background3D />

      <div className="petals" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 17) % 100}%`, animationDelay: `${(i % 7) * 1.1}s`, animationDuration: `${8 + (i % 5)}s` }}>♥</span>
        ))}
      </div>

      <section className="hero">
        <div className="glass hero-card">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="eyebrow">A little secret for you</p>
            <h1>Pooja<span>...</span></h1>
            <p className="lead">I made something special for you.</p>
            <p className="muted">But you&apos;ll have to wait for the right moment ❤️</p>

            <button className="primary" onClick={enter}>
              {entered ? "The surprise awaits ❤️" : "Enter the Surprise ✨"}
            </button>

            <p className="tiny">23 September 2026 · 10:00 AM IST</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">COUNTDOWN</p>
          <h2>Something beautiful is waiting for you...</h2>
          <p className="section-sub">The door opens on 23 September at 10:00 AM.</p>

          <div className="countdown">
            {[
              ["DAYS", remaining.days],
              ["HOURS", remaining.hours],
              ["MINUTES", remaining.minutes],
              ["SECONDS", remaining.seconds],
            ].map(([label, value]) => (
              <motion.div key={label} className="time-card" animate={{ scale: label === "SECONDS" ? [1, 1.035, 1] : 1 }} transition={{ duration: 1, repeat: Infinity }}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>

          <div className={`lock ${unlocked ? "open" : ""}`}>
            <div className="lock-heart">{unlocked ? "♥" : "🔐"}</div>
            <h3>{unlocked ? "The surprise is unlocked." : "This surprise is locked for now."}</h3>
            <p>{unlocked ? "It&apos;s your day, Pooja. ❤️" : "Come back on 23rd September at 10:00 AM ❤️"}</p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {unlocked && (
          <motion.div className="birthday-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
            <section className="section reveal">
              <div className="section-inner">
                <p className="eyebrow">THE WAIT IS OVER</p>
                <motion.h2 initial={{ opacity: 0, scale: .92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                  It&apos;s Your Day, Pooja! ❤️
                </motion.h2>
                <h1 className="birthday-title">HAPPY BIRTHDAY<br /><span>POOJA ❤️</span></h1>
                <p className="section-sub">Now... let me tell you something.</p>
                <button className="primary" onClick={startMusic}>Continue ❤️</button>
                <button className="music-btn" onClick={toggleMusic}>{audioOn ? "❚❚ Pause music" : "♫ Play our song"}</button>
                <p className="tiny">Add your own song at <code>public/music/romantic-song.mp3</code>.</p>
              </div>
            </section>

            <section className="section message-section">
              <div className="message glass">
                <p className="eyebrow">A LETTER FOR YOU</p>
                <h2>Dear Pooja...</h2>
                {[
                  "Bhale hi ab humari baatein pehle jaisi nahi hoti...",
                  "Bhale hi humare beech pehle jaisi conversations nahi rahi...",
                  "Lekin ek cheez aaj bhi bilkul waisi hi hai — mere dil mein tumhare liye jo feelings hain.",
                  "Waqt badla, situations badli, baatein kam hui... lekin tumhare liye mera pyaar kabhi kam nahi hua.",
                  "Aaj bhi tum mere liye utni hi special ho jitni pehle thi.",
                  "Shayad main har baar keh nahi pata, lekin dil ke kisi kone mein tumhari jagah aaj bhi wahi hai.",
                  "Main bas chahta hoon ki tum hamesha khush raho, smile karti raho, aur tumhe zindagi mein woh saari khushiyan milein jo tum deserve karti ho.",
                ].map((text, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .7, delay: i * .08 }}>
                    {text}
                  </motion.p>
                ))}
                <motion.p className="love-line" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                  I still love you, Pooja. ❤️
                </motion.p>
              </div>
            </section>

            <section className="section">
              <div className="section-inner">
                <p className="eyebrow">MEMORIES</p>
                <h2>A few moments worth keeping...</h2>
                <div className="gallery">
                  {photos.map((src, i) => (
                    <motion.figure key={src} className="photo-card" initial={{ opacity: 0, y: 40, rotate: i ? 4 : -4 }} whileInView={{ opacity: 1, y: 0, rotate: i ? 2 : -2 }} viewport={{ once: true }} transition={{ duration: .9 }}>
                      <img src={src} alt={`Pooja memory ${i + 1}`} />
                      <figcaption>{i === 0 ? "That smile... ❤️" : "One of my favourite pictures of you."}</figcaption>
                    </motion.figure>
                  ))}
                </div>
              </div>
            </section>

            <section className="section">
              <div className="wish glass">
                <p className="eyebrow">ONE LAST THING</p>
                <h2>Make A Wish ✨</h2>
                <p>May this new year of your life bring you endless happiness, beautiful memories, peace in your heart, and countless reasons to smile.</p>
                <p>I hope every dream you have slowly becomes reality.</p>
                <p>And no matter how much time passes, some feelings simply don&apos;t disappear.</p>
                <h3>Bhale hi baat pehle jaisi nahi hoti,<br />par aaj bhi tumhare liye mera pyaar pehle jaisa hi hai.</h3>
                <div className="final-heart">♥</div>
                <h1>I Love You, Pooja. ❤️</h1>
                <p className="signature">Always. ❤️</p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <footer>Made with ❤️ for Pooja</footer>
    </main>
  );
}
