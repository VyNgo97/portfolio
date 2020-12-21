import Head from 'next/head';
import Link from 'next/Link';
import styles from '../styles/Home.module.css';
import React from 'react';
import { motion } from 'framer-motion';
import { Twitch, Twitter, Youtube, Instagram, GitHub} from 'react-feather';
import Typed from 'react-typed';
import { Button } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

const variants = {
  visible: { opacity: 1},
  hidden: { opacity: 0}
}
const AboutButton = withStyles((theme) => ({
  root: {
    color: '#9146FF',
    backgroundColor: '#ffffff',
    borderColor: '#9146FF',
    '&:hover': {
      backgroundColor: 'rgba(145, 70, 255, .1)',
      borderColor: '#9146FF',
    },
  },
}))(Button);

const BlogButton = withStyles((theme) => ({
  root: {
    color: '#1da1f2',
    backgroundColor: '#ffffff',
    borderColor: '#1da1f2',
    '&:hover': {
      backgroundColor: 'rgba(29, 161, 242, .1)',
      borderColor: '#1da1f2',
    },
  },
}))(Button);

const MoreButton = withStyles((theme) => ({
  root: {
    color: '#c4302b',
    backgroundColor: '#ffffff',
    borderColor: '#c4302b',
    '&:hover': {
      backgroundColor: 'rgba(196, 48, 43, .1)',
      borderColor: '#c4302b',
    },
  },
}))(Button);

const ComeButton = withStyles((theme) => ({
  root: {
    color: '#3f729b',
    backgroundColor: '#ffffff',
    borderColor: '#3f729b',
    '&:hover': {
      backgroundColor: 'rgba(63,114,155, .1)',
      borderColor: '#3f729b',
    },
  },
}))(Button);

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Hi there.</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
      </Head>

      <main className={styles.main}>
        <motion.div 
        initial="hidden"
        transition="delay"
        animate="visible"
        variants={variants}>
          <h1 className={styles.title}>
          <Typed 
          typeSpeed={40}
          backSpeed={40}
            strings={[`Chào, bạn. Tên tôi là Vỹ.`, `Hi, I'm Vy.`]}/>
            </h1>
        </motion.div>
      <motion.div
      initial="hidden"
      transition={{delay: 4.3}}
      animate="visible"
      variants={variants}>
        
        <p className={styles.description}>
          Welcome to my corner of the internet :)
        </p>
        <div>
            <ul className={styles.nav}>
              <li>
                <Link href="/about">
                  <AboutButton variant="outlined">About</AboutButton>
                  </Link>
                  </li>
              <li>
                <Link href="/blog">
                  <BlogButton variant="outlined">Blog</BlogButton>
                  </Link>
                  </li>
                  <li>
                <Link href="/">
                  <MoreButton variant="outlined">More</MoreButton>
                  </Link>
                  </li>
                  <li>
                <Link href="/">
                  <Button variant="outlined" color="inherit">To</Button>
                  </Link>
                  </li>
                  <li>
                <Link href="/">
                  <ComeButton variant="outlined">Come</ComeButton>
                  </Link>
                  </li>
            </ul>
            </div>


      </motion.div>

      </main>

      <footer className={styles.footer}>
        <a href='https://twitch.tv/starlordvy' target='_blank'><Twitch color='#9146FF'/></a>
        &nbsp;&nbsp;
        <a href='https://twitter.com/starlordvy' target='_blank'><Twitter color='#1da1f2'/></a>
        &nbsp;&nbsp;
        <a href='https://www.youtube.com/channel/UC3omxyN3NuRo8Ct3mrgMRVg?view_as=subscriber' target='_blank'><Youtube color='#c4302b'/></a>
        &nbsp;&nbsp;
        <a href='https://www.github.com/VyNgo97' target='_blank'><GitHub/></a>
        &nbsp;&nbsp;
        <a href='https://www.instagram.com/starlordvy' target='_blank'><Instagram color='#3f729b'/></a>
      </footer>
    </div>
  )
}
