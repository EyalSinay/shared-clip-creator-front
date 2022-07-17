import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import getSection from '../../utils/getSection.js';
import uploadVideoTrack from '../../utils/uploadVideoTrack';
import { BASE_URL } from '../../utils/globalConst.js';
import deleteSectionVideoTrack from '../../utils/deleteSectionVideoTrack';


function Section() {
  const paramsPath = useParams();
  const [section, setSection] = useState({});
  const [sectionDuration, setSectionDuration] = useState();
  const [videoTrack, setVideoTrack] = useState(null);
  const { token } = useContext(UserContext);
  const projectFileRef = useRef(null);
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
      projectFileRef.current.setCustomValidity("your video is to short");
    } else {
      projectFileRef.current.setCustomValidity("");
    }
  }, [videoTrackDuration, sectionDuration]);

  useEffect(() => {
    if (Object.keys(section).length > 0) {
      setSectionDuration(Math.round((section.secondEnd - section.secondStart) * 10) / 10);
    }
  }, [section])

  const onSendClick = async () => {
    if (projectFileRef.current.reportValidity()) {
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
      <input ref={projectFileRef} type="file" name="audioTrack" id="audioTrack" accept='video/mp4' required onChange={(e) => setVideoTrack(e.target.files[0])} />
      {!loading
        &&
        <>
          <button onClick={onSendClick} >send</button>
          <button onClick={onDeleteClick} >delete</button>
          <span>{videoTrackDuration.toFixed(2)} second</span>
        </>
      }
      <div className="video-player">
        <video ref={videoPlayerRef} width="400" type="video/mp4" src={`${BASE_URL}/users/projects/${paramsPath.id}/sections/${paramsPath.sec}/videoTrack`} controls />
      </div>
    </div>
  )
}

export default Section;