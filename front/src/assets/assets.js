/* ──────────────── IMPORT ──────────────── */
import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import spotify_logo from './spotify_logo.png'
import Ashavanfy_logo from './Ashavanfy_logo.png'
import clock_icon from './clock_icon.png'

import img1  from './img1.jpg'
import img2  from './img2.jpg'
import img3  from './img3.jpg'
import img4  from './img4.jpg'
import img5  from './img5.jpg'
// import img6  from './img6.jpg'
import img7  from './img7.jpg'
import img8  from './img8.jpg'
import img9  from './Birth of Hell.png'
import img10 from './img10.jpg'
import img11 from './img11.jpg'
import img12 from './overlight.png'
// import img13 from './img13.jpg'
import img14 from './img14.jpg'
import img15 from './img15.jpg'
import img16 from './img16.jpg'

import song1 from './song1.mp3'
import song2 from './song2.mp3'
import song3 from './song3.mp3'

/* ──────────────── ASSETS ──────────────── */
export const assets = {
  bell_icon,
  home_icon,
  like_icon,
  loop_icon,
  mic_icon,
  next_icon,
  play_icon,
  plays_icon,
  prev_icon,
  search_icon,
  shuffle_icon,
  speaker_icon,
  stack_icon,
  zoom_icon,
  plus_icon,
  arrow_icon,
  mini_player_icon,
  volume_icon,
  queue_icon,
  pause_icon,
  arrow_left,
  arrow_right,
  spotify_logo,
  Ashavanfy_logo,
  clock_icon,
}

/* ──────────────── ALBUMS ──────────────── */
export const albumsData = [
  {
    id: 0,
    name: 'Top 50 Global',
    image: img8,
    desc: 'Your weekly update of the most played tracks',
    bgColor: '#2a4365',
  },
  {
    id: 1,
    name: 'Overlight',                                // ⬅ modificato
    image: img9,
    desc: 'nuovo album di questa storia fantastica',  // ⬅ modificato
    bgColor: '#22543d',
  },
  {
    id: 2,
    name: 'Trending India',
    image: img10,
    desc: 'Your weekly update of the most played tracks',
    bgColor: '#742a2a',
  },
  {
    id: 3,
    name: 'Trending Global',
    image: img16,
    desc: 'Your weekly update of the most played tracks',
    bgColor: '#44337a',
  },
  {
    id: 4,
    name: 'Mega Hits,',
    image: img11,
    desc: 'Your weekly update of the most played tracks',
    bgColor: '#234e52',
  },
  {
    id: 5,
    name: 'Happy Favorites',
    image: img15,
    desc: 'Your weekly update of the most played tracks',
    bgColor: '#744210',
  },
]

/* ──────────────── SONGS ──────────────── */
export const songsData = [
  {
    id: 0,
    name: 'Moero, Marisa',
    album: 'Overlight',
    image: img1,
    file: song1,
    desc: 'Let them all burn in hell',
    duration: '4:04',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 1,
    name: 'Claw of vengeance',
    album: 'Overlight',
    image: img2,
    file: song2,
    desc: 'The forgotten name from stars',
    duration: '2:20',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 2,
    name: 'Madness bound in infinity',
    album: 'Overlight',
    image: img3,
    file: song3,
    desc: 'The mark of emptiness',
    duration: '3:32',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 3,
    name: 'Song Four',
    album: 'Overlight',
    image: img4,
    file: song1,
    desc: 'Put a smile on your face with these happy tunes',
    duration: '2:50',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 4,
    name: 'Song Five',
    album: 'Overlight',
    image: img5,
    file: song2,
    desc: 'Put a smile on your face with these happy tunes',
    duration: '3:10',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 5,
    name: 'Song Six',
    album: 'Overlight',
    image: img14,
    file: song3,
    desc: 'Put a smile on your face with these happy tunes',
    duration: '2:45',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 6,
    name: 'Song Seven',
    album: 'Overlight',
    image: img7,
    file: song1,
    desc: 'Put a smile on your face with these happy tunes',
    duration: '2:18',
    date: "2025-07-01T12:00:00Z"
  },
  {
    id: 7,
    name: 'Song Eight',
    album: 'Overlight',
    image: img12,
    file: song2,
    desc: 'Put a smile on your face with these happy tunes',
    duration: '2:35',
    date: "2025-07-01T12:00:00Z"
  },
]
