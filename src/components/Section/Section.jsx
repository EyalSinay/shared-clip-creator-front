import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import getSection from '../../utils/getSection.js';
import uploadVideoTrack from '../../utils/uploadVideoTrack';


function Section() {
  const paramsPath = useParams();
  const [section, setSection] = useState({});
  const [videoTrack, setVideoTrack] = useState(null);
  const { token } = useContext(UserContext);
  const projectFileRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
        }
      }
      setLoading(false);
    }
  }

  return (
    <div className='section-page-container' >
      <h1 className='center-text' >{section.projectName}</h1>
      <h2 className='center-text' >{section.secName}</h2>
      <p>{section.message}</p>
      <h2>Upload a mp4 file:</h2>
      <input ref={projectFileRef} type="file" name="audioTrack" id="audioTrack" accept='video/mp4' required onChange={(e) => setVideoTrack(e.target.files[0])} />
      {!loading && <button onClick={onSendClick} >send</button>}
    </div>
  )
}

export default Section;