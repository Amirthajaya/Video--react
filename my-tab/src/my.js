import React, { useState, useEffect, useRef, useMemo } from 'react';


const Video = () => {
  const initialVideos = useMemo(() => [
    { title: 'Paris', src: '/paris.mp4' },
    { title: 'France', src: '/France.mp4' },
    { title: 'Australia', src: '/Australia.mp4' },
    { title: 'Singapore', src: '/Singapore.mp4' },
  ], []);

  const [videos, setVideos] = useState(initialVideos);
  const videoRefs = useRef(videos.map(() => React.createRef()));

  useEffect(() => {
    const handleVideoEnded = (index) => {
      const updatedVideos = [...videos];
      const endedVideo = updatedVideos.shift();
      updatedVideos.push(endedVideo);
      setVideos(updatedVideos);

      videoRefs.current.forEach((ref, i) => {
        ref.current.load();
        if (i === 0) { 
          if (ref.current.readyState >= 2) {
            ref.current.play();
          } else {
            
            ref.current.addEventListener('loadedmetadata', () => ref.current.play());
          }
        }
      });
    };

    videoRefs.current.forEach((ref, index) => {
      ref.current.addEventListener('ended', () => handleVideoEnded(index));
    });

    return () => {
      videoRefs.current.forEach((ref, index) => {
        ref.current.removeEventListener('ended', () => handleVideoEnded(index));
      });
    };
  }, [videos]);

  return (
    <div className="video-container">
      {videos.map((video, index) => (
        <div key={index} className='Vid'>
          <h3>{video.title}</h3>
          <video
            width="300"
            height="360"
            controls
            ref={videoRefs.current[index]}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default Video;
