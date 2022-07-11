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

function Project() {
  const [wavesurferObj, setWavesurferObj] = useState();
  const waveform = useRef(null);
  const waveformTimeline = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [newMarkerSec, setNewMarkerSec] = useState("");
  const [newMarkerName, setNewLabelName] = useState("");

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
    // !SPINNER
    if (waveform.current && waveformTimeline.current && !wavesurferObj) {
      setWavesurferObj(
        Wavesurfer.create({
          container: "#waveform",
          waveColor: "#567FFF",
          progressColor: '#69207F',
          loopSelection: true,
          barGap: 2,
          barWidth: 3,
          barRadius: 3,
          cursorWidth: 3,
          cursorColor: "#567FFF",
          responsive: true,
          // backend: 'MediaElement',
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
      // wavesurferObj.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3");
    }
  }, [paramsPath.id, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.on('ready', () => {
        setDuration(Math.floor(wavesurferObj.getDuration())); // set the duration in local state
      });

      wavesurferObj.on('play', () => {
        setPlaying(false);
      });

      wavesurferObj.on('finish', () => {
        setPlaying(true);
      });

    }
  }, [wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume);
  }, [volume, wavesurferObj]);

  const handlePlayPause = () => {
    wavesurferObj.playPause();
    setPlaying(pre => !pre);
  };

  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  const createNewMarker = () => {
    const color = randomColor({
      luminosity: "light",
      alpha: 0.3,
      format: "rgba",
    });

    const newLabel = {
      time: parseInt(newMarkerSec),
      label: newMarkerName,
      color,
    }

    setMarkers(() => {
      const newArr = [...markers];
      newArr.push(newLabel)
      return newArr;
    });

    wavesurferObj.addMarker(newLabel);
  }

  console.log(markers);
  console.log(duration);

  return (
    <div className='project-container'>
      <div className='titles'>
        <h1 className='center-text'>Project Name</h1>
        <h6 className='center-text'>edit mode</h6>
      </div>
      <div className="waveform-container">
        <div ref={waveform} id="waveform" />
        <div ref={waveformTimeline} id="waveform-timeline" />
      </div>
      <button onClick={createNewMarker}>create</button>
      <button onClick={handlePlayPause}>{playing ? "PAUSE" : "PLAY"}</button>
      <label htmlFor="new-label-sec">second:</label>
      <input type="number" name="new-label-sec" id="new-label-sec" onChange={e => setNewMarkerSec(e.target.value)} />
      <label htmlFor="new-label-name">name:</label>
      <input type="text" name="new-label-name" id="new-label-name" onChange={e => setNewLabelName(e.target.value)} />
      <input
        type='range'
        min='0'
        max='1'
        step='0.05'
        value={volume}
        onChange={handleVolumeSlider}
        className='slider volume-slider'
      />
      {/* {markers.map(sec => {
        return (
          <div key={1}>
            <button onClick={createNewMarker}>{1}</button>
          </div>
        )
      })} */}
    </div>
  )
}

export default Project