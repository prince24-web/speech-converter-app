import PlayIcon from "./assets/playicon.png";
import { motion } from "framer-motion";

function App() {
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
          id="text"
          rows="5"
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      >
        <img src={PlayIcon} />
        Listen
      </motion.button>
    </div>
  );
}

export default App;
