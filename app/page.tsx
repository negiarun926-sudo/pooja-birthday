"use client";

import { useEffect, useState } from "react";

const UNLOCK_AT = new Date("2026-09-23T10:00:00+05:30");

function getRemaining() {
  const diff = Math.max(0, UNLOCK_AT.getTime() - Date.now());
  const total = Math.floor(diff / 1000);

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const messages = [
  "Bhle baat nhi hote per aaj bhi pyar phle jaisa hi hai.",
  "I love u Pooja.",
  "Waqt badla, situations badli, baatein kam hui... lekin tere liye mera pyaar kabhi kam nahi hua.",
  "Aaj bhi tu mere liye utni hi special hai jitni pehle thi.",
  "Shayad main av terko preshn nhi kar pata lekin dil ke kisi kone mein tumhari jagah aaj bhi wahi hai.",
  "Main bas chahta hoon ki tu hamesha khush rahe smile karti rahe, aur tumhe zindagi mein woh saari khushiyan milein jo tu deserve karti hai.",
  "I love u Pooja ❤️",
];

export default function Home() {
  const [remaining, setRemaining] = useState(getRemaining());
  const [unlocked, setUnlocked] = useState(
    Date.now() >= UNLOCK_AT.getTime()
  );
  const [started, setStarted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();

      if (now >= UNLOCK_AT.getTime()) {
        setUnlocked(true);
        setRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setRemaining(getRemaining());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setMessageIndex((current) => {
        if (current >= messages.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [started]);

  const openHeart = () => {
    setStarted(true);

    setTimeout(() => {
      document
        .getElementById("love-message")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  if (!unlocked) {
    return (
      <main className="locked-page">
        <div className="heart-background">
          <span>❤️</span>
          <span>♡</span>
          <span>💕</span>
          <span>♡</span>
          <span>❤️</span>
          <span>💗</span>
          <span>♡</span>
          <span>❤️</span>
        </div>

        <section className="lock-card">
          <div className="lock-icon">🔐</div>

          <p className="small-label">
            A little surprise for
          </p>

          <h1>Pooja</h1>

          <p className="subtitle">
            Something special is waiting for you...
          </p>

          <div className="countdown">
            <div className="time-box">
              <strong>{remaining.days}</strong>
              <span>Days</span>
            </div>

            <div className="time-box">
              <strong>{remaining.hours}</strong>
              <span>Hours</span>
            </div>

            <div className="time-box">
              <strong>{remaining.minutes}</strong>
              <span>Minutes</span>
            </div>

            <div className="time-box">
              <strong>{remaining.seconds}</strong>
              <span>Seconds</span>
            </div>
          </div>

          <p className="unlock-text">
            Unlocks on
            <br />
            <b>23 September 2026</b>
            <br />
            at <b>10:00 AM</b>
          </p>

          <div className="heart-line">
            ♡ ❤️ ♡
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="birthday-page">
      <div className="floating-hearts">
        <span>❤️</span>
        <span>💗</span>
        <span>💕</span>
        <span>❤️</span>
        <span>💖</span>
        <span>💗</span>
      </div>

      <section className="hero">
        <p className="eyebrow">
          TODAY IS ALL ABOUT YOU
        </p>

        <h1>
          Happy Birthday
          <br />
          <span>Pooja ❤️</span>
        </h1>

        <p className="hero-text">
          Today is your special day...
          <br />
          and I wanted to make it a little more special.
        </p>

        <div className="photo-frame">
          <img
            src="/images/IMG_4246.png"
            alt="Pooja"
          />
        </div>

        <button
          onClick={openHeart}
          className="surprise-button"
        >
          Open My Heart ❤️
        </button>
      </section>

      {started && (
        <section
          id="love-message"
          className="message-section"
        >
          <div className="music-card">
            <div className="music-icon">🎵</div>

            <p>
              A little song for you, Pooja ❤️
            </p>

            <audio
              controls
              autoPlay
              loop
              src="/music/birthday-song.mp3"
            />
          </div>

          <div className="love-message">
            <p className="message-number">
              {messageIndex + 1} / {messages.length}
            </p>

            <h2>
              {messages[messageIndex]}
            </h2>

            <div className="second-photo">
              <img
                src="/images/IMG_4247.png"
                alt="Pooja memory"
              />
            </div>

            <div className="signature">
              With love,
              <br />
              <span>Arun ❤️</span>
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
