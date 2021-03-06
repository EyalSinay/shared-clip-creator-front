import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/globalConst.js';
import axios from 'axios';
import NavBar from '../global-components/NavBar.jsx';


function ConcatVideo() {
  const paramsPath = useParams();
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const getClip = () => {
    if (!videoUrl) {
      setLoadingVideo(true);
      axios({ //! add token
        url: `${BASE_URL}/users/projects/${paramsPath.id}/concatVideo`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        setVideoUrl(window.URL.createObjectURL(new Blob([response.data])));
      });
      setLoadingVideo(false);
    }
  }

  //! get project by id just for check auth

  //! if section.length === 0 show message!

  if (loadingVideo) {
    return (
      <div>We are preparing your clip for you, it will take some time...</div>
    )
  }

  const navLinks = [
    {
      id: paramsPath.id + 'project',
      path: `/project/${paramsPath.id}`,
      context: 'Back to project'
    }
  ]

  return (
    <>
      <NavBar linksArr={navLinks}>

      </NavBar>
      <div className='concat-video-page-container'>
        <h1>Your video:</h1>
        <button onClick={getClip} >CLICK HEAR!</button>
        <video width="400" type="video/mp4" src={videoUrl} controls />
      </div>
    </>
  )
}

export default ConcatVideo;