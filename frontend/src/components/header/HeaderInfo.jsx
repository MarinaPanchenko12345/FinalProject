import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./HeaderInfo.css";
import { useEffect, useState } from "react";

const HeaderInfo = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='header_div'>
      <div className='header_information'>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 5 }}
        >
          Digital Galaxy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5 }}
        >
          Welcome to DigitalGalaxy – your destination for cutting-edge
          technology!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2 }}
        >
          Explore our wide range of devices, from smartphones and laptops to
          smartwatches and headphones.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.5 }}
        >
          Discover the world of electronics with us!
        </motion.p>
      </div>
      {isTextVisible && (
        <div className='header_about'>
          <motion.p
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
            transition={{
              duration: 3,
              repeat: 1,
              ease: "circInOut",
            }}
          >
            Click to learn more about our website and its features!
          </motion.p>
          <Link to='/about'>
            <button>About Us</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderInfo;
