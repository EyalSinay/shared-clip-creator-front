import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import getSection from '../../utils/getSection.js';
import uploadVideoTrack from '../../utils/uploadVideoTrack';
import uploadImageSection from '../../utils/uploadImageSection';
import { BASE_URL } from '../../utils/globalConst.js';
import deleteSectionVideoTrack from '../../utils/deleteSectionVideoTrack';


function Section() {
  const paramsPath = useParams();
  const [section, setSection] = useState({});
  const [sectionDuration, setSectionDuration] = useState();
  const [videoTrack, setVideoTrack] = useState(null);
  const [image, setImage] = useState(null);
  const { token } = useContext(UserContext);
  const videoSecFileRef = useRef(null);
  const imageSecFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const videoPlayerRef = useRef(null);
  const [videoTrackDuration, setVideoTrackDuration] = useState(0);

  useEffect(() => {
    if (Object.keys(section).length === 0) {
      const projectId = paramsPath.id;
      const sectionId = paramsPath.sec;
      const theToken = token || localStorage.getItem("TOKEN") || "";
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
  }, [section, paramsPath, token]);

  useEffect(() => {
    if (videoTrack) {
      var reader = new FileReader();
      reader.onload = function () {
        var media = new Audio(reader.result);
        media.onloadedmetadata = function () {
          setVideoTrackDuration(media.duration);
        };
      };
      reader.readAsDataURL(videoTrack);
    }
  }, [videoTrack]);

  useEffect(() => {
    if (videoTrackDuration > 0 && videoTrackDuration < sectionDuration) {
      videoSecFileRef.current.setCustomValidity("your video is to short");
    } else {
      videoSecFileRef.current.setCustomValidity("");
    }
  }, [videoTrackDuration, sectionDuration]);

  useEffect(() => {
    if (Object.keys(section).length > 0) {
      setSectionDuration(Math.round((section.secondEnd - section.secondStart) * 10) / 10);
    }
  }, [section])

  const onSendVideoClick = async () => {
    if (videoSecFileRef.current.reportValidity()) {
      setLoading(true);
      if (videoTrack) {
        const fd = new FormData();
        fd.append("videoTrack", videoTrack, videoTrack.name);
        const projectId = paramsPath.id;
        const sectionId = paramsPath.sec;
        const theToken = token || localStorage.getItem("TOKEN") || "";
        if (section.secure || theToken) {
          await uploadVideoTrack(theToken, projectId, sectionId, fd);
          // ! show onUploadProgress
          videoPlayerRef.current.load();
        }
      }
      setLoading(false);
    }
  }

  const onSendImageClick = async () => {
    if (imageSecFileRef.current.reportValidity()) {
      setLoading(true);
      if (image) {
        const fd = new FormData();
        fd.append("image", image, image.name);
        const projectId = paramsPath.id;
        const sectionId = paramsPath.sec;
        const theToken = token || localStorage.getItem("TOKEN") || "";
        if (section.secure || theToken) {
          await uploadImageSection(theToken, projectId, sectionId, fd);
          // ! show onUploadProgress
        }
      }
      setLoading(false);
    }
  }

  const onDeleteClick = async () => {
    const projectId = paramsPath.id;
    const sectionId = paramsPath.sec;
    const theToken = token || localStorage.getItem("TOKEN") || "";
    await deleteSectionVideoTrack(theToken, projectId, sectionId);
    videoPlayerRef.current.load();
  }

  
  return (
    <div className='section-page-container' >
      <h1 className='center-text' >{section.projectName}</h1>
      <h2 className='center-text' >{section.secName}</h2>
      <p>{section.message}</p>
      <h2>Upload a mp4 file:</h2>
      <p>secondStart: {section.secondStart}</p>
      <p>secondEnd: {section.secondEnd}</p>
      <p>duration: {sectionDuration}</p>
      <input ref={videoSecFileRef} type="file" name="videoTrack" id="videoTrack" accept='video/mp4' required onChange={(e) => setVideoTrack(e.target.files[0])} />
      <input ref={imageSecFileRef} type="file" name="image" id="image" accept='image/png, image/jpeg' required onChange={(e) => setImage(e.target.files[0])} />
      {!loading
        &&
        <>
          <button onClick={onSendVideoClick} >send video</button>
          <button onClick={onSendImageClick} >send image</button>
          <button onClick={onDeleteClick} >delete file</button>
          <span>{videoTrackDuration.toFixed(2)} second</span>
        </>
      }
      <div className="video-player">
        <video ref={videoPlayerRef} width="400" type="video/mp4" src={`${BASE_URL}/users/projects/${paramsPath.id}/sections/${paramsPath.sec}/videoTrack`} controls />
      </div>
      <div>
        <img style={{width: "50%"}} src={`${BASE_URL}/users/projects/${paramsPath.id}/sections/${paramsPath.sec}/image`} alt="no file" />
      </div>
    </div>
  )
}

export default Section;