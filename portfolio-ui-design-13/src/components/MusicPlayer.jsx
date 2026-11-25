import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const playlist = ["/iwasneverthere.mp3", "/escapism.mp3", "/blue.mp3", "/YAD.mp3", "/stars.mp3"];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const trackIndex = useRef(0);
  const wantedPlaying = useRef(false);
  const attempt = useRef(0);
  const switchingTrack = useRef(false);
  const playbackFailed = useRef(false);
  const clickTimer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("Wanna play music while scrolling?");

  // Ignore stale play rejections after a pause, track change, or unmount.
  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // A failed media resource must be reloaded, while normal resume keeps its position.
    if (audio.error) {
      switchingTrack.current = true;
      audio.load();
    }
    playbackFailed.current = false;
    wantedPlaying.current = true;
    const current = ++attempt.current;
    const result = audio.play();
    result?.catch(() => {
      if (current === attempt.current) {
        wantedPlaying.current = false;
        switchingTrack.current = false;
        playbackFailed.current = true;
        setIsPlaying(false);
        setMessage("Music could not be played. Try again.");
      }
    });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (wantedPlaying.current) {
      wantedPlaying.current = false;
      attempt.current += 1;
      audio.pause();
      setIsPlaying(false);
      setMessage("Wanna play music while scrolling?");
    } else {
      play();
    }
  };

  const shuffle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    let next;
    do { next = Math.floor(Math.random() * playlist.length); } while (next === trackIndex.current);
    trackIndex.current = next;
    attempt.current += 1;
    switchingTrack.current = wantedPlaying.current;
    audio.src = playlist[next];
    if (wantedPlaying.current) play();
  };

  // A single click toggles playback; two clicks (including touch taps) shuffle once.
  const handleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      shuffle();
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        togglePlay();
      }, 250);
    }
  };

  const adjustVolume = (event) => {
    if (!audioRef.current || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === "ArrowUp" ? 0.05 : -0.05;
    audioRef.current.volume = Math.max(0, Math.min(1, audioRef.current.volume + delta));
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = 0.6;
    return () => {
      clearTimeout(clickTimer.current);
      attempt.current += 1;
      wantedPlaying.current = false;
      audio?.pause();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      <p className="text-xs text-gray-300 italic" role="status">{message}</p>
      <audio ref={audioRef} src={playlist[0]} preload="none" onEnded={shuffle}
        onPlay={() => {
          if (!wantedPlaying.current) { audioRef.current?.pause(); return; }
          switchingTrack.current = false;
          setIsPlaying(true);
          setMessage("Double tap to change the music");
        }}
        onPause={() => {
          const audio = audioRef.current;
          // A source switch may dispatch a pause while its replacement is starting.
          if (!audio || !audio.paused || audio.ended || switchingTrack.current || playbackFailed.current) return;
          wantedPlaying.current = false;
          attempt.current += 1;
          setIsPlaying(false);
          setMessage("Wanna play music while scrolling?");
        }}
        onError={() => {
          wantedPlaying.current = false;
          switchingTrack.current = false;
          playbackFailed.current = true;
          attempt.current += 1;
          audioRef.current?.pause();
          setIsPlaying(false);
          setMessage("Music could not be played. Try again.");
        }}
      />
      <button type="button" onClick={handleClick} onKeyDown={adjustVolume}
        className="p-4 rounded-full shadow-lg transition transform hover:scale-110"
        style={{ background: "linear-gradient(135deg, #00f0ff, #00ff80)", boxShadow: "0 0 15px #00f0ff, 0 0 25px #00ff80", color: "white" }}
        aria-label={isPlaying ? "Pause music" : "Play music"}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
}
