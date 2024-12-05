import React, { useState, useEffect } from "react";

const app = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    // Fetch available voices
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    // Some browsers may not populate voices immediately
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }
    fetchVoices();
  }, []);

  const handleSpeak = () => {
    if (!text) {
      alert("Please enter some text.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Text-to-Speech App</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Enter text:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            cols="50"
            style={{ display: "block", width: "100%", marginTop: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Voice:
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Rate:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
          <span style={{ marginLeft: "10px" }}>{rate}</span>
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Pitch:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
          <span style={{ marginLeft: "10px" }}>{pitch}</span>
        </label>
      </div>

      <button onClick={handleSpeak} style={{ marginRight: "10px" }}>
        Speak
      </button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default app;
