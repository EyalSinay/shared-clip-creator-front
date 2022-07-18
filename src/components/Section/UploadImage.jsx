import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import uploadImageSection from '../../utils/uploadImageSection';


function UploadImage({section, imageSectionGetRequest}) {
  const paramsPath = useParams();
  const [image, setImage] = useState(null);
  const { token } = useContext(UserContext);
  const imageSecFileRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
          imageSectionGetRequest();
        }
      }
      setLoading(false);
    }
  }


  return (
      <div className='upload-image-container' >

        <input ref={imageSecFileRef} type="file" name="image" id="image" accept='image/png, image/jpeg' required onChange={(e) => setImage(e.target.files[0])} />
        {!loading
          &&
          <>
            <button onClick={onSendImageClick} >send image</button>
          </>
        }
      </div>
  )
}

export default UploadImage;