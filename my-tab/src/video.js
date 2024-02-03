import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faPause, faPlay, faStepForward } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import My from'./my.js';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [isPlaying, setPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoRef = useRef(null);
  const inputRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const playNext = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(videos[nextIndex]);
      videoRef.current.load();
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const playPrev = () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    setCurrentVideoIndex(prevIndex);
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    setVideos(Array.from(fileList));
    setCurrentVideoIndex(0);

    if (fileList.length > 0) {
      videoRef.current.src = URL.createObjectURL(fileList[0]);
      videoRef.current.load();
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <div className="video-container">
        <div className="head">
          <h1> Video Player</h1>
        </div>
        <div className="video-info">
          <h2>{videos.length > 0 ? videos[currentVideoIndex].name : 'No Video'}</h2>
        </div>
        <div className="video-player">
          <video ref={videoRef} width="640" height="360" controls>
            {videos.length > 0 && <source src={URL.createObjectURL(videos[currentVideoIndex])} type="video/mp4" />}
            {!videos.length && <source src="default-video-source.mp4" type="video/mp4" />} 
   </video>
            <div className="vid">
          <input ref={inputRef} type="file" accept="video/*" onChange={handleFileChange} multiple/>
        </div>
        <div>
            <div className="Control">
              <button className="control-button" onClick={playPrev}>
                <FontAwesomeIcon icon={faStepBackward} />
              </button>
              <button className="control-button" onClick={togglePlay}>
                {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
              </button>
              <button className="control-button" onClick={playNext}>
                <FontAwesomeIcon icon={faStepForward} />
              </button>
            </div>
          </div>
          </div>
          </div>
          <div className='default'><My/></div>
        
    </>
  );
};

export default VideoPlayer;
