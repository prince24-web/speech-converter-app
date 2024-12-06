import PlayIcon from "./assets/playicon.png";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);
  }, []);

  const speak = async () => {
    // Prevent multiple simultaneous calls
    if (isLoading) return;

    // Validate input
    if (!content || content.trim() === '') {
      alert('Please enter some text to convert to speech');
      return;
    }

    try {
      // Set loading state to prevent further clicks
      setIsLoading(true);

      const response = await axios.get('https://api.voicerss.org/', {
        params: {
          key: "7dc86484121f42bf848874a5130085e8",
          src: content,
          hl: 'en-us',
          r: 0,
          c: 'mp3',
          f: '44khz_16bit_stereo',
        },
        responseType: 'blob',
      });

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      
      // Add event listeners to manage loading state
      audio.addEventListener('ended', () => {
        setIsLoading(false);
      });

      audio.addEventListener('error', () => {
        setIsLoading(false);
        alert('Error playing audio');
      });

      await audio.play();
    } catch (error) {
      console.error('Error with VoiceRSS:', error);
      alert('Sorry, there was an error converting text to speech');
      setIsLoading(false);
    }
  };

  const handleSpeech = (event) => {
    setContent(event.target.value);
  }

  return (
    <div className="container">
      <motion.h1
        className="title"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      >
        Text To Speech <span className="subTitle">Converter</span>
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
       {isLoading ? 'Converting...' : 'Listen'}
      </motion.button>
    </div>
  );
}

export default App;