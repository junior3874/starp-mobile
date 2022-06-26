import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

import { millisToHumanReadableFormat } from "./utils";
import { useQueue } from "../queueContext";

type PlayerContextData = {
  isPlaying: boolean;
  isPlayerOpen: boolean;
  play: (id?: string | undefined) => Promise<void>;
  pause: () => Promise<void>;
  percentageElapsed: number;
  timeElapsed: string;
};

const PlayerContext = createContext({} as PlayerContextData);

type PlayerProviderProps = {
  children: React.ReactNode;
};

export function PlayerProvider({ children }: PlayerProviderProps) {
  const { queue, currentTrack, nextTrack } = useQueue();

  const playbackObjectRef = useRef(new Audio.Sound());
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackQueueIdPlaying, setCurrentTrackQueueIdPlaying] =
    useState("");
  const [percentageElapsed, setPercentageElapsed] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(
    millisToHumanReadableFormat(0)
  );

  /* =========== */
  /*  Internals  */
  /* =========== */

  useEffect(() => {
    return () => {
      playbackObjectRef.current.unloadAsync();
    };
  }, []);

  const _isSoundLoaded = useCallback(async () => {
    const status = await playbackObjectRef.current.getStatusAsync();
    return status.isLoaded;
  }, []);

  const _loadAndPlaySound = useCallback(async (id: string) => {
    if (await _isSoundLoaded()) {
      await playbackObjectRef.current.unloadAsync();
    }

    playbackObjectRef.current.loadAsync(
      {
        uri: `http://localhost:3333/podcasts/${id}/listen/index.m3u8`,
      },
      {
        shouldPlay: true,
      }
    );
  }, []);

  const _isPlayingCallback = useCallback((status: AVPlaybackStatus) => {
    setIsPlaying(status.isLoaded && status.isPlaying);
  }, []);

  const _percentageElapsedCallback = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPercentageElapsed(
        (status.positionMillis * 100) / (status.durationMillis || 1)
      );

      setTimeElapsed(millisToHumanReadableFormat(status.positionMillis));
    }
  }, []);

  const _timeElapsedCallback = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setTimeElapsed(millisToHumanReadableFormat(status.positionMillis));
    }
  }, []);

  const _didFinishCallback = useCallback(
    (status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) {
        nextTrack();
      }
    },
    [nextTrack]
  );

  useEffect(() => {
    playbackObjectRef.current.setOnPlaybackStatusUpdate((status) => {
      _isPlayingCallback(status);
      _percentageElapsedCallback(status);
      _timeElapsedCallback(status);
      _didFinishCallback(status);
    });
  }, [
    _isPlayingCallback,
    _percentageElapsedCallback,
    _timeElapsedCallback,
    _didFinishCallback,
  ]);

  useEffect(() => {
    if (currentTrack && currentTrack._queueId !== currentTrackQueueIdPlaying) {
      setIsPlayerOpen(true);
      setCurrentTrackQueueIdPlaying(currentTrack._queueId);
      _loadAndPlaySound(currentTrack.id);
    }
  }, [currentTrack, _loadAndPlaySound]);

  /* ============ */
  /*  Public API  */
  /* ============ */

  const play = useCallback(
    async (id: string | undefined = undefined) => {
      const isSoundLoaded = await _isSoundLoaded();
      if (!id && !isSoundLoaded) return;

      setIsPlayerOpen(true);

      if (id) {
        _loadAndPlaySound(id);
        return;
      }

      await playbackObjectRef.current.playAsync();
    },
    [_isSoundLoaded]
  );

  const pause = useCallback(async () => {
    if (!(await _isSoundLoaded())) return;

    await playbackObjectRef.current.stopAsync();
  }, [_isSoundLoaded]);

  return (
    <PlayerContext.Provider
      value={{
        isPlayerOpen,
        isPlaying,
        play,
        pause,
        percentageElapsed,
        timeElapsed,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextData {
  return useContext(PlayerContext);
}
