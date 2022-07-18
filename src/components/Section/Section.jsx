import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import getSection from '../../utils/getSection.js';
import NavBar from '../global-components/NavBar'
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import TakeFilm from './TakeFilm';
import TakePicture from './TakePicture';
import FileExist from './FileExist';
import getVideoSection from '../../utils/getVideoSection';
import getImageSection from '../../utils/getImageSection';


function Section() {
  const paramsPath = useParams();
  const [section, setSection] = useState({});
  const [sectionDuration, setSectionDuration] = useState();
  const { token } = useContext(UserContext);
  const [secUpMode, setSecUpMode] = useState('take-film');
  const [fileExist, setFileExist] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const imageSectionGetRequest = async () => {
    const projectId = paramsPath.id;
    const sectionId = paramsPath.sec;
    const theToken = token || localStorage.getItem("TOKEN") || "";
    const url = await getImageSection(theToken, projectId, sectionId);
    setImageUrl(url);
  }

  const videoSectionGetRequest = async () => {
    const projectId = paramsPath.id;
    const sectionId = paramsPath.sec;
    const theToken = token || localStorage.getItem("TOKEN") || "";
    const url = await getVideoSection(theToken, projectId, sectionId);
    setVideoUrl(url);
  }

  useEffect(() => {
    setLoading(true);
    const projectId = paramsPath.id;
    const sectionId = paramsPath.sec;
    const theToken = token || localStorage.getItem("TOKEN") || "";

    if (Object.keys(section).length === 0) {
      const sectionGetRequest = async () => {
        const data = await getSection(theToken, projectId, sectionId);
        if (data) {
          setSection(data);
        } else {
          // ! Show a message like "u need to sign up (link) or ask owner to change secure to false"
        }
      }
      sectionGetRequest();
    }

    if (!videoUrl && !imageUrl) {
      videoSectionGetRequest();
    }

    if (!videoUrl && !imageUrl) {
      imageSectionGetRequest();
    }

    setLoading(false);
    // eslint-disable-next-line
  }, [section, paramsPath, token, imageUrl, videoUrl]);


  useEffect(() => {
    if (Object.keys(section).length > 0) {
      setSectionDuration(Math.round((section.secondEnd - section.secondStart) * 10) / 10);
    }
  }, [section])

  useEffect(() => {
    if (videoUrl || imageUrl) {
      setFileExist(true);
    }
  }, [imageUrl, videoUrl])

  const getSecUpMode = () => {
    switch (secUpMode) {
      case 'take-film':
        return (<TakeFilm
          section={section}
          sectionDuration={sectionDuration}
          videoSectionGetRequest={videoSectionGetRequest} />)
      case 'take-picture':
        return (<TakePicture
          section={section}
          sectionDuration={sectionDuration}
          imageSectionGetRequest={imageSectionGetRequest} />)
      case 'upload-video':
        return (<UploadVideo
          section={section}
          sectionDuration={sectionDuration}
          videoSectionGetRequest={videoSectionGetRequest} />)
      case 'upload-image':
        return (<UploadImage
          section={section}
          sectionDuration={sectionDuration}
          imageSectionGetRequest={imageSectionGetRequest} />)
      default:
        return;
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <NavBar>
        <button className='section-btn nav-btn' onClick={() => setSecUpMode('take-film')} >Take a film</button>
        <button className='section-btn nav-btn' onClick={() => setSecUpMode('take-picture')} >Take a picture</button>
        <button className='section-btn nav-btn' onClick={() => setSecUpMode('upload-video')} >Upload video</button>
        <button className='section-btn nav-btn' onClick={() => setSecUpMode('upload-image')} >Upload image</button>
      </NavBar>
      <div className='section-page-container' >
        <h1 className='center-text' >{section.projectName}</h1>
        <h2 className='center-text' >{section.secName}</h2>
        <p>{section.message}</p>
        <p>secondStart: {section.secondStart}</p>
        <p>secondEnd: {section.secondEnd}</p>
        <p>duration: {sectionDuration}</p>


        {fileExist ? <FileExist imageUrl={imageUrl} videoUrl={videoUrl} setFileExist={setFileExist} /> : getSecUpMode()}

      </div>
    </>
  )
}

export default Section;