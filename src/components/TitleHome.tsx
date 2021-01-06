import React from 'react'
import './TitleHome.css'
import { motion } from 'framer-motion'
import paperplane from '../assets/img/paperplane.svg'

const parent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.4 } },
}

const child = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
}

const TitleHome: React.FC = () => {
  return (
    <motion.div
      className="TitleHome"
      initial="hidden"
      animate="visible"
      variants={parent}
    >
      <motion.div className="title-wrapper" variants={child}>
        <h1>copily</h1>
        <img className="paperplane" src={paperplane} alt="paperplane" />
      </motion.div>
      <motion.p variants={child}>easy text sharing across devices</motion.p>
    </motion.div>
  )
}

export default TitleHome
