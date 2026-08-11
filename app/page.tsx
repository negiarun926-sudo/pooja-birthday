"use client";

import { useEffect, useState } from "react";

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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (!started) return;

    const timer = window.setInterval(() => {
      setMessageIndex(
        (current) => (current + 1) % messages.length
      );
    }, 5000);

    return () => window.clearInterval(timer);
  }, [started]);

  const openHeart = () => {
    setStarted(true);

    window.setTimeout(() => {
      document
        .getElementById("love-message")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 250);
  };

  return (
    <main className="birthday-page">

      {/* BACKGROUND GLOW */}

      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      {/* FLOATING HEARTS */}

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
            <span>Pooja ❤️</span>
          </h1>

          <p className="hero-text">
            Today is your special day...
            <br />
            and I wanted to make it a little more special.
          </p>

          {/* PHOTO */}

          <div className="photo-frame">
            <div className="photo-glow" />

            <img
              src="/images/IMG_4246.png"
              alt="Pooja"
            />
          </div>

          {/* BUTTON */}

          <button
            type="button"
            className="surprise-button"
            onClick={openHeart}
          >
            <span>Open My Heart</span>
            <span>❤️</span>
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
              controls
              autoPlay
              loop
              src="/music/birthday-song.mp3"
              onPlay={() => setMusicPlaying(true)}
              onPause={() => setMusicPlaying(false)}
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

            {/* MESSAGE DOTS */}

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

            {/* SIGNATURE */}

            <div className="signature">
              With love,
              <br />
              <span>Arun ❤️</span>
            </div>

          </div>

        </section>
      )}

      {/* FOOTER */}

      <footer>
        Made with ❤️ for Pooja
      </footer>

    </main>
  );
}
