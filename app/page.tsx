"use client";

import { useEffect, useRef, useState } from "react";

const UNLOCK_AT = new Date("2026-09-23T10:00:00+05:30");

const messages = [
  "Bhle baat nhi hote per aaj bhi pyar phle jaisa hi hai.",
  "I love u Pooja.",
  "Waqt badla, situations badli, baatein kam hui... lekin tere liye mera pyaar kabhi kam nahi hua.",
  "Aaj bhi tu mere liye utni hi special hai jitni pehle thi.",
  "Shayad main av terko preshn nhi kar pata lekin dil ke kisi kone mein tumhari jagah aaj bhi wahi hai.",
  "Main bas chahta hoon ki tu hamesha khush rahe smile karti rahe, aur tumhe zindagi mein woh saari khushiyan milein jo tu deserve karti hai.",
  "I love u Pooja ❤️",
];

const hearts = [
  "❤️",
  "♡",
  "💕",
  "💗",
  "♡",
  "❤️",
  "💖",
  "♡",
  "💗",
  "❤️",
  "💕",
  "💗",
];

function getRemaining() {
  const difference = Math.max(
    0,
    UNLOCK_AT.getTime() - Date.now()
  );

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function Home() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [unlocked, setUnlocked] = useState(
    () => Date.now() >= UNLOCK_AT.getTime()
  );

  const [started, setStarted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // =========================
  // COUNTDOWN
  // =========================

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();

      if (now >= UNLOCK_AT.getTime()) {
        setUnlocked(true);

        setRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        window.clearInterval(timer);
        return;
      }

      setRemaining(getRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  // =========================
  // MESSAGE ROTATION
  // 8 SECONDS
  // =========================

  useEffect(() => {
    if (!started) return;

    const timer = window.setInterval(() => {
      setMessageIndex(
        (current) => (current + 1) % messages.length
      );
    }, 8000);

    return () => window.clearInterval(timer);
  }, [started]);

  // =========================
  // OPEN HEART
  // =========================

  const openHeart = async () => {
    setStarted(true);

    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;

        await audioRef.current.play();

        setMusicPlaying(true);
      }
    } catch (error) {
      console.log("Audio playback failed:", error);
    }

    window.setTimeout(() => {
      document
        .getElementById("love-message")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 250);
  };

  // =========================
  // LOCK SCREEN
  // =========================

  if (!unlocked) {
    return (
      <main className="locked-page">

        <div className="ambient-glow glow-one" />
        <div className="ambient-glow glow-two" />

        <div
          className="heart-background"
          aria-hidden="true"
        >
          {hearts.map((heart, index) => (
            <span
              key={index}
              style={{
                left: `${index * 9}%`,
                animationDelay: `${index * -1.4}s`,
                animationDuration: `${8 + (index % 4) * 2}s`,
              }}
            >
              {heart}
            </span>
          ))}
        </div>

        <section className="lock-card">

          <div className="lock-icon">
            🔐
          </div>

          <p className="small-label">
            A little surprise for
          </p>

          <h1>
            Pooja
          </h1>

          <p className="subtitle">
            Something special is waiting for you...
          </p>

          <div className="countdown">

            <div className="time-box">
              <strong>
                {remaining.days}
              </strong>
              <span>
                Days
              </span>
            </div>

            <div className="time-box">
              <strong>
                {remaining.hours}
              </strong>
              <span>
                Hours
              </span>
            </div>

            <div className="time-box">
              <strong>
                {remaining.minutes}
              </strong>
              <span>
                Minutes
              </span>
            </div>

            <div className="time-box">
              <strong>
                {remaining.seconds}
              </strong>
              <span>
                Seconds
              </span>
            </div>

          </div>

          <p className="unlock-text">
            Unlocks on
            <br />

            <b>
              23 September 2026
            </b>

            <br />

            at{" "}

            <b>
              10:00 AM
            </b>
          </p>

          <div className="heart-line">
            ♡ ❤️ ♡
          </div>

        </section>

      </main>
    );
  }

  // =========================
  // BIRTHDAY PAGE
  // =========================

  return (
    <main className="birthday-page">

      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      <div
        className="floating-hearts"
        aria-hidden="true"
      >
        {hearts.map((heart, index) => (
          <span
            key={index}
            style={{
              left: `${index * 8.5}%`,
              animationDelay: `${index * -1.25}s`,
              animationDuration: `${7 + (index % 5) * 1.5}s`,
            }}
          >
            {heart}
          </span>
        ))}
      </div>

      {/* HERO */}

      <section className="hero">

        <div className="hero-inner">

          <p className="eyebrow">
            TODAY IS ALL ABOUT YOU
          </p>

          <h1 className="birthday-title">
            Happy Birthday
            <br />

            <span>
              Pooja ❤️
            </span>
          </h1>

          <p className="hero-text">
            Today is your special day...
            <br />
            and I wanted to make it a little more special.
          </p>

          <div className="photo-frame">

            <div className="photo-glow" />

            <img
              src="/images/IMG_4246.png"
              alt="Pooja"
            />

          </div>

          <button
            type="button"
            className="surprise-button"
            onClick={openHeart}
          >
            <span>
              Open My Heart
            </span>

            <span>
              ❤️
            </span>
          </button>

          <p className="scroll-hint">
            Tap the button and see what I made for you ↓
          </p>

        </div>

      </section>

      {/* MESSAGE SECTION */}

      {started && (
        <section
          id="love-message"
          className="message-section"
        >

          {/* MUSIC */}

          <div className="music-card">

            <div className="music-top">

              <div className="music-icon">
                🎵
              </div>

              <div>

                <p className="music-label">
                  A little song for you
                </p>

                <h3>
                  Pooja ❤️
                </h3>

              </div>

            </div>

            <audio
              ref={audioRef}
              controls
              loop
              preload="auto"
              src="/music/birthday-song.mp3.mp3"
              onPlay={() =>
                setMusicPlaying(true)
              }
              onPause={() =>
                setMusicPlaying(false)
              }
            />

            {musicPlaying && (
              <div
                className="equalizer"
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            )}

          </div>

          {/* LOVE MESSAGE */}

          <div className="love-message">

            <p className="message-number">
              {String(messageIndex + 1).padStart(2, "0")}
              {" / "}
              {String(messages.length).padStart(2, "0")}
            </p>

            <div
              key={messageIndex}
              className="message-content"
            >

              <h2>
                {messages[messageIndex]}
              </h2>

              <div className="second-photo">

                <div className="photo-shine" />

                <img
                  src="/images/IMG_4247.png"
                  alt="Pooja memory"
                />

              </div>

            </div>

            <div className="message-dots">

              {messages.map((_, index) => (
                <span
                  key={index}
                  className={
                    index === messageIndex
                      ? "active"
                      : ""
                  }
                />
              ))}

            </div>

            <div className="signature">
              With love,
              <br />

              <span>
                Arun ❤️
              </span>
            </div>

          </div>

        </section>
      )}

      <footer>
        Made with ❤️ for Pooja
      </footer>

    </main>
  );
}
