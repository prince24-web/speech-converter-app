import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import PlayIcon from "./assets/playicon.png";
import AppIcon from "./assets/TTS app icon.png";

function App() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const textAreaRef = useRef(null);

  const handelPaste = async () => {
    try{
      const copiedText = await navigator.clipboard.readText();
      setContent(copiedText);
    } catch(error){
      console.error("failed to read clipboard content contents:", error);
    }
  }

  // Add splash screen timer
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimer); // Cleanup timer on unmount
  }, []);

  const speak = async () => {
    if (isLoading) return;

    if (!content.trim()) {
      alert("Please enter some text to convert to speech");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.get("https://api.voicerss.org/", {
        params: {
          key: process.env.REACT_APP_VOICERSS_KEY,
          src: content,
          hl: "en-us",
          r: 0,
          c: "mp3",
          f: "44khz_16bit_stereo",
        },
        responseType: "blob",
      });

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);

      audio.addEventListener("ended", () => setIsLoading(false));
      audio.addEventListener("error", () => {
        setIsLoading(false);
        alert("Error playing audio");
      });

      await audio.play();
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleSpeech = useCallback((event) => {
    setContent(event.target.value); // Update state immediately
  }, []);

  const handelReset = () => {
    setContent("");
  }
  // Splash screen component
  const SplashScreen = () => (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={AppIcon} alt="App Icon" />
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        TTS App
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        From <br />
        {["L", "u", "m", "i", "o"].map((letter, index) => (
          <span key={index} className="name">
            {letter}
          </span>
        ))}
      </motion.p>
    </motion.div>
  );

  // Main content
  const MainContent = React.memo(() => (
    <div className="container">
      <motion.h1
        className="title"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Text To Speech{" "}
        <span className="subTitle">
          {["C", "o", "n", "v", "e", "r", "t", "e", "r"].map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </span>
      </motion.h1>
      <div className="input-group">
        <motion.textarea
          id="speech-input"
          className="form-control"
          disabled
          value={content}
          onChange={handleSpeech}
          ref={textAreaRef}
          placeholder="Paste "
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.textarea>
      </div>
      <motion.button
        className="listen-button"
        onClick={speak}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!isLoading && <img src={PlayIcon} alt="Play" />}
        {isLoading ? "Converting..." : <p>Play</p>}
      </motion.button>
      <motion.button
        className="clear-button"
        onClick={handelReset}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
       Clear
      </motion.button>
      <motion.button
        className="paste-button"
        onClick={handelPaste}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Paste
      </motion.button>
    </div>
  ));

  return showSplash ? <SplashScreen /> : <MainContent />;
}

export default App;
