import React, { useContext, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import deleteSectionVideoTrack from '../../utils/deleteSectionVideoTrack';

function FileExist({setFileExist, imageUrl, videoUrl}) {
    const paramsPath = useParams();
    const { token } = useContext(UserContext);
    const videoPlayerRef = useRef(null);


    const onDeleteClick = async () => {
        const projectId = paramsPath.id;
        const sectionId = paramsPath.sec;
        const theToken = token || localStorage.getItem("TOKEN") || "";
        await deleteSectionVideoTrack(theToken, projectId, sectionId);
        setFileExist(false);
    }

    return (
        <div>
            <button onClick={onDeleteClick} >delete file</button>
            <div className="video-player">
                <video ref={videoPlayerRef} width="400" type="video/mp4" src={videoUrl} controls />
            </div>
            <div>
          <img style={{ width: "50%" }} src={imageUrl} alt="no file" />
        </div>
        </div>
    )
}

export default FileExist