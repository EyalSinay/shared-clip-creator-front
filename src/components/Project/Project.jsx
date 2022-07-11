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
import Spinner3Absolute from '../global-components/Spinner3Absolute';

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
        setDuration(Math.floor(wavesurferObj.getDuration()));
        setLoadingAudio(false)
      });

      wavesurferObj.on('play', () => {
        setPlaying(false);
      });

      wavesurferObj.on('finish', () => {
        setPlaying(false);
      });

      if (markers.length === 0) createNewMarker();
    }
    // eslint-disable-next-line
  }, [wavesurferObj]);

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

  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  const createNewMarker = () => {
    const color = randomColor({
      luminosity: "dark",
      alpha: 0.5,
      format: "rgba",
    });

    const newMarker = {
      time: newMarkerSecond,
      label: newMarkerName,
      color,
    }

    const sectionsArr = [...markers, newMarker]
    sectionsArr.sort((secA, secB) => secA.time - secB.time);

    wavesurferObj.clearMarkers();
    sectionsArr.forEach((sec, index) => {
      const pos = index % 2 === 0 ? "bottom" : "top";
      wavesurferObj.addMarker({ ...sec, position: pos });
    });

    setMarkers(sectionsArr);
  }

  console.log(markers);

  return (
    <div className='project-container'>
      <Beforeunload onBeforeunload={(e) => e.preventDefault()} />
      <section className='titles'>
        <h1 className='center-text'>Project Name</h1>
        <h6 className='center-text'>edit mode</h6>
      </section>
      <section>
        <div className="waveform-container" >
          {loadingAudio && <Spinner3Absolute />}
          <div ref={waveform} id="waveform" />
          <div ref={waveformTimeline} id="waveform-timeline" />
        </div>
        <div className="waveform-container controllers-container">
          <button onClick={handlePlayPause}>{playing ? "PAUSE" : "PLAY"}</button>
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
        <div className="section-container">
          {markers.map(sec => `${sec.label} `)}
        </div>
        <div className="section-input-container">
          <button onClick={createNewMarker}>create</button>
          <div className='new-label-name-container'>
            <label htmlFor="new-label-name">participant: </label>
            <input type="text" name="new-label-name" id="new-label-name" onChange={e => setNewMarkerName(e.target.value)} />
          </div>
          <div className='new-label-sec-container'>
            <label htmlFor="new-label-sec">second: </label>
            <input type="number" name="new-label-sec" id="new-label-sec" max={duration - 5} onChange={e => setNewMarkerSecond(parseInt(
              e.target.value))} />
          </div>
        </div>
      </section>
      <section className="message-container">
        <input type="textarea" id='message-input' />
      </section>
    </div>
  )
}

export default Project