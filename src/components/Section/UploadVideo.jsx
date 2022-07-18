import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import uploadVideoTrack from '../../utils/uploadVideoTrack';


function UploadVideo({section, sectionDuration, videoSectionGetRequest}) {
    const paramsPath = useParams();
    const [videoTrack, setVideoTrack] = useState(null);
    const videoSecFileRef = useRef(null);
    const { token } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [videoTrackDuration, setVideoTrackDuration] = useState(0);

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
                    videoSectionGetRequest();
                }
            }
            setLoading(false);
        }
    }

    return (
        <div className='upload-video-container' >
            <h2>Upload a mp4 file:</h2>
            <input ref={videoSecFileRef} type="file" name="videoTrack" id="videoTrack" accept='video/mp4' required onChange={(e) => setVideoTrack(e.target.files[0])} />
            {!loading
                &&
                <>
                    <button onClick={onSendVideoClick} >send video</button>
                    {videoTrackDuration > 0 && <span>{videoTrackDuration.toFixed(2)} second</span>}
                </>
            }
        </div>
    )
}

export default UploadVideo;