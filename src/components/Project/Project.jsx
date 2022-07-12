import './Project.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';
import { useLocation, useParams } from "react-router-dom";
import Wavesurfer from "wavesurfer.js";
import * as WaveformMarkersPlugin from "wavesurfer.js/dist/plugin/wavesurfer.markers";
import * as WaveformTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveformCursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor";
import getProjectById from '../../utils/getProjectById.js';
import randomColor from "randomcolor";
import { Beforeunload } from 'react-beforeunload';
import SpinnerAllPageOnComponent from '../global-components/SpinnerAllPageOnComponent';
import SectionsEditMode from './SectionsEditMode';

function Project() {
  const [wavesurferObj, setWavesurferObj] = useState();
  const waveform = useRef(null);
  const waveformTimeline = useRef(null);

  const [loadingAudio, setLoadingAudio] = useState(true)

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [duration, setDuration] = useState(0);

  const [markers, setMarkers] = useState([]);
  const [newMarkerSecond, setNewMarkerSecond] = useState(0);
  const [newMarkerName, setNewMarkerName] = useState("sec1");

  const nameInput = useRef(null);
  const secondInput = useRef(null);

  const [project, setProject] = useState({});
  const paramsPath = useParams();
  const { token } = useContext(UserContext);
  const location = useLocation();

  // projectData:
  useEffect(() => {
    if (Object.keys(project).length === 0) {
      if (location?.state?.projectData) {
        setProject(location.state.projectData);
      } else {
        const projectId = paramsPath.id;
        const theToken = token || localStorage.getItem("TOKEN");
        const fetchProjectData = async () => {
          try {
            const results = await getProjectById(theToken, projectId);
            setProject(results.data);
          } catch (err) {
            console.error(err);
          }
        }
        fetchProjectData();
      }
    }
  }, [project, token, paramsPath.id, location]);

  // audio:
  // ! use location.state.audioTrack if exist
  useEffect(() => {
    if (waveform.current && waveformTimeline.current && !wavesurferObj) {
      setWavesurferObj(
        Wavesurfer.create({
          container: "#waveform",
          waveColor: "#567FFF",
          progressColor: '#69207F',
          backgroundColor: '#ffffff33',
          loopSelection: true,
          // hideScrollbar: true,
          height: 200,
          barGap: 2,
          barWidth: 3,
          barRadius: 3,
          cursorWidth: 3,
          cursorColor: "#567FFF",
          responsive: true,
          plugins: [
            WaveformMarkersPlugin.create(),
            WaveformTimelinePlugin.create({ container: "#waveform-timeline" }),
            WaveformCursorPlugin.create(),
          ],
        })
      );
    }
  }, [waveform, waveformTimeline, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      const projectId = paramsPath.id;
      wavesurferObj.load("http://127.0.0.1:5050/users/projects/" + projectId + "/audioTrack");
    }
  }, [paramsPath.id, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.on('ready', () => {
        setLoadingAudio(false);
        const durationTrack = Math.floor(wavesurferObj.getDuration());
        setDuration(durationTrack);
      });

      wavesurferObj.on('play', () => {
        setPlaying(false);
      });

      wavesurferObj.on('finish', () => {
        setPlaying(false);
      });
    }
  }, [wavesurferObj]);

  useEffect(() => {
    if (markers.length === 0 && duration) {
      createNewMarker();
      setNewMarkerName("");
      setNewMarkerSecond("");
    };
    // eslint-disable-next-line
  }, [duration]);

  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume);
  }, [volume, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) wavesurferObj.zoom(zoom);
  }, [zoom, wavesurferObj]);

  const handlePlayPause = () => {
    wavesurferObj.playPause();
    setPlaying(pre => !pre);
  };

  const handleStop = () => {
    wavesurferObj.stop();
    setPlaying(false);
  }

  const handleMute = () => {
    wavesurferObj.toggleMute();
  }

  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  }

  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  }

  const onInputChange = (value, setFunction) => {
    const newArr = [...markers];
    newArr.forEach(marker => marker.editMode = false);
    setMarkers(newArr);

    setFunction(value);
  }

  const getCostumeValidate = (element, value, id) => {
    element.setCustomValidity('');
    const term1 = markers.some(marker => {
      if (marker.id === id) return false;
      return Math.abs(value - marker.secondStart) <= 3;
    });
    const term2 = markers.findIndex(marker => marker.id === id) === 0;
    if (term1) {
      element.setCustomValidity("Please ensure a difference of 3 seconds between the participants");
    }
    if (term2) {
      element.setCustomValidity("It is requierd to be section in second 0");
    }
  }

  const getValidIncrement = (value) => {
    if (value === 0) return value;

    let validValue = value + 1;
    let j = 0;
    while (j < markers.length && validValue > markers[j].secondStart) {
      j++
    }

    for (let i = j; i < markers.length; i++) {
      if (validValue <= markers[i].secondStart - 3) return validValue;
        validValue += 5;
    }
    if (validValue >= markers[markers.length - 1].secondStart && validValue <= duration - 3) return validValue;

    return value;
  }

  const getValidDecrement = (value) => {
    if (value === 0) return value;

    let validValue = value - 1;
    let j = markers.length - 1;
    while (j >= 0 && validValue < markers[j].secondStart) {
      j--
    }

    for (let i = j; i >= 0; i--) {
      if (validValue >= markers[i].secondStart + 3) return validValue;
        validValue -= 5;
    }
    if (validValue >= 3 && validValue <= markers[1].secondStart - 3) return validValue;

    return value;
  }

  const updateMarkersOnWaveSurfer = (marksArr) => {
    for (let i = 0; i < marksArr.length; i++) {
      if (i < marksArr.length - 1) {
        marksArr[i].secondEnd = marksArr[i + 1].secondStart;
      } else {
        marksArr[i].secondEnd = duration;
      }
    }

    marksArr.sort((secA, secB) => secA.secondStart - secB.secondStart);

    wavesurferObj.clearMarkers();
    marksArr.forEach((mark, index) => {
      const pos = index % 2 === 0 ? "bottom" : "top";
      wavesurferObj.addMarker({
        time: mark.secondStart,
        label: mark.name,
        color: mark.color,
        position: pos
      });
    });

    setMarkers(marksArr);
    setNewMarkerName("");
    setNewMarkerSecond("");
  }

  const createNewMarker = () => {
    getCostumeValidate(secondInput.current, newMarkerSecond);
    if (nameInput.current.reportValidity() && secondInput.current.reportValidity()) {
      const color = randomColor({
        luminosity: "dark",
        alpha: 0.5,
        format: "rgba",
      });
      const newMarker = {
        secondStart: parseInt(newMarkerSecond),
        name: newMarkerName,
        color,
        editMode: false,
        id: Date.now()
      }
      const sectionsArr = [...markers, newMarker]
      updateMarkersOnWaveSurfer(sectionsArr);
    }
  }

  const editMarkers = (id, editedKey, value, inputElement) => {
    if (inputElement !== undefined && editedKey === "secondStart") getCostumeValidate(inputElement, value, id);
    if (inputElement === undefined || inputElement.reportValidity()) {
      const newArr = [...markers];
      if (editedKey === "editMode" && value === true) newArr.forEach(marker => marker.editMode = false);
      const markerEdited = newArr.find(marker => marker.id === id);
      markerEdited[editedKey] = value;
      updateMarkersOnWaveSurfer(newArr);
    }
  }

  const deleteSection = (id) => {
    const newArr = [...markers];
    const index = newArr.findIndex(sec => sec.id === id);
    console.log(index);
    if (index === 0) return;
    if (index > -1) newArr.splice(index, 1);
    updateMarkersOnWaveSurfer(newArr);
  }

  console.log(markers);

  return (
    <div className='project-container'>
      <SpinnerAllPageOnComponent loading={loadingAudio} />
      <Beforeunload onBeforeunload={(e) => e.preventDefault()} />
      <section className='titles'>
        <h1 className='center-text'>Project Name</h1>
        <h6 className='center-text'>edit mode</h6>
      </section>
      <section>
        <div className="waveform-container" >
          <div ref={waveform} id="waveform" />
          <div ref={waveformTimeline} id="waveform-timeline" />
        </div>
        <div className="waveform-container controllers-container">
          <button onClick={handlePlayPause}>{playing ? "PAUSE" : "PLAY"}</button>
          <button onClick={handleStop}>STOP</button>
          <button onClick={handleMute}>Mute</button>
          <input
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={volume}
            onChange={handleVolumeSlider}
            className='slider volume-slider'
          />
          <input
            type='range'
            min='1'
            max='1000'
            value={zoom}
            onChange={handleZoomSlider}
            className='slider zoom-slider'
          />
        </div>
      </section>
      <section>
        <div className="sections-container">
          {markers.map(sec => <SectionsEditMode key={sec.id} section={{ ...sec }} duration={duration} onEditMarker={editMarkers} getValidDecrement={getValidDecrement} getValidIncrement={getValidIncrement} onDeleteClick={deleteSection} />)}
        </div>
        <div className="section-input-container">
          <div className='new-label-name-container'>
            <label htmlFor="new-label-name">participant: </label>
            <input type="text" name="new-label-name" id="new-label-name" value={newMarkerName} ref={nameInput} required onChange={e => onInputChange(e.target.value, setNewMarkerName)} onKeyPress={(e) => { if (e.key === "Enter") createNewMarker() }} />
          </div>
          <div className='new-label-sec-container'>
            <label htmlFor="new-label-sec">second-start: </label>
            <input type="number" name="new-label-sec" id="new-label-sec" ref={secondInput} min={0} max={duration - 3} required value={newMarkerSecond} onChange={e => onInputChange(e.target.value, setNewMarkerSecond)} onKeyPress={(e) => { if (e.key === "Enter") createNewMarker() }} />
            <button  >-</button>
            <button  >+</button>
          </div>
          <button onClick={createNewMarker}>create</button>
        </div>
      </section>
      <section className="message-container">
        <input type="textarea" id='message-input' />
      </section>
    </div>
  )
}

export default Project