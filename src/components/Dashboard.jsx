import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './compo.css';
import loader from './ballsparade.gif';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const shareVideo = (platform, videoUrl) => {
    let shareUrl = '';
    
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(videoUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(videoUrl)}`;
        break;
      default:
        console.log("Platform not supported");
        return;
    }
    
    window.open(shareUrl, "_blank");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const resp1 = await fetch(`${import.meta.env.VITE_BACKEND}/data/fetch`, {
          method: "GET",
        });

        if (resp1.ok) {
          const data = await resp1.json();
          setVideos(data);
        } else {
          console.log(resp1);
          const r = await resp1.text();
          console.log(r);
        }
      } catch (error) {
        console.error("Error is:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {loading ? (
        <div>
          <img src={loader} alt='loader' className="loading-image" />
        </div>
      ) : (
        <div className="dashboard">
          <h1 className="Tagile">EduKARI</h1>
         <div className="div-btn"> <Link to="/upload">
            <button className="add-video-btn">Add video</button>
          </Link>
          <Link to="/board">
            <button className="add-video-btn">Stream</button>
          </Link> 
          <Link to="/jobs">
            <button className="add-video-btn">Jobs</button>
          </Link> 
          
         
          <Link to="/prep">
            <button className="add-video-btn">Prep</button>
          </Link> 
          
          </div>
          <div className="videos-container">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <div key={index} className="video-card">
                  <h3>{video.name}</h3>
                  <h4>{video.title}</h4>
                  
                  <p className="video-description">
                    {expandedIndex === index ? video.description : `${video.description.slice(0, 100)}...`}
                    {video.description.length > 100 && (
                      <button className="expand-btn" onClick={() => toggleDescription(index)}>
                        {expandedIndex === index ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </p>

                  <video controls>
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <button
                    className="share-button"
                    onClick={() => setShowShareOptions(showShareOptions === index ? null : index)}
                  >
                    Share
                  </button>

                  {showShareOptions === index && (
                    <div className="share-options">
                      <button onClick={() => shareVideo("whatsapp", video.videoUrl)}>WhatsApp</button>
                      <button onClick={() => shareVideo("facebook", video.videoUrl)}>Facebook</button>
                      <button onClick={() => shareVideo("twitter", video.videoUrl)}>Twitter</button>
                      <button onClick={() => shareVideo("telegram", video.videoUrl)}>Telegram</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="no-videos">No videos available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
