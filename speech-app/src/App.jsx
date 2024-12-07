import PlayIcon from "./assets/playicon.png";
import AppIcon from "./assets/TTS app icon.png";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    // Add splash screen timer
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // Cleanup the timer
    return () => clearTimeout(splashTimer);
  }, []);

  const speak = async () => {
    if (isLoading) return;

    if (!content || content.trim() === "") {
      alert("Please enter some text to convert to speech");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.get("https://api.voicerss.org/", {
        params: {
          key: "7dc86484121f42bf848874a5130085e8",
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

      audio.addEventListener("ended", () => {
        setIsLoading(false);
      });

      audio.addEventListener("error", () => {
        setIsLoading(false);
        alert("Error playing audio");
      });

      await audio.play();
    } catch (error) {
      console.error("Error with VoiceRSS:", error);
      alert("Sorry, there was an error converting text to speech");
      setIsLoading(false);
    }
  };

  const handleSpeech = (event) => {
    setContent(event.target.value);
  };

  // Splash screen component
  const SplashScreen = () => (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={AppIcon} />
     
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
      From <br/> {["L","u","m","i","o"].map((brandName, index) => (<li key={index} className="name">{brandName}</li>))}
      </motion.p>
      
    </motion.div>
  );

  // Main App Content
  const MainContent = () => (
    <div className="container">
      <motion.h1
        className="title"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      >
        Text To Speech{" "}
        <span className="subTitle">
          {["C","o","n","v","e","r","t","e","r"].map((letter, index) => (
            <li key={index}>{letter}</li>
          ))}
        </span>
      </motion.h1>
      <div className="input-group">
        <motion.textarea
          className="form-control"
          value={content}
          onChange={handleSpeech}
          placeholder="Write anything here..."
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
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
        transition={{
          duration: 0.5,
        }}
      >
        {!isLoading && <img src={PlayIcon} alt="Play" />}
        {isLoading ? "Converting..." : "Listen"}
      </motion.button>
    </div>
  );

  return showSplash ? <SplashScreen /> : <MainContent />;
}

export default App;