import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type Track = {
  title: string;
  artist: string;
  id: string;
  _queueId: string;
};

type QueueContextData = {
  queue: Track[];
  currentTrack: Track | null;
  addToQueue: (track: Track) => void;
  removeFirstOccurrenceFromQueue: (track: Track) => void;
  clearQueue: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
};

const QueueContext = createContext({} as QueueContextData);

type QueueProviderProps = {
  children: React.ReactNode;
};

export function QueueProvider({ children }: QueueProviderProps) {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToQueue = useCallback((track: Track) => {
    setQueue((prev) => [...prev, track]);
  }, []);

  const removeFirstOccurrenceFromQueue = useCallback((track: Track) => {
    setQueue((prev) => {
      const index = prev.findIndex((t) => t.id === track.id);
      if (index !== -1) {
        prev.slice(index, 1);
      }

      return prev;
    });
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;

      if (newIndex >= queue.length) {
        return prev;
      }

      return newIndex;
    });
  }, [queue]);

  const previousTrack = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;

      if (newIndex <= 0) {
        return prev;
      }

      return newIndex;
    });
  }, [queue]);

  const currentTrack = useMemo(() => {
    if (queue.length === 0) return null;

    return queue[currentIndex];
  }, [queue, currentIndex]);

  return (
    <QueueContext.Provider
      value={{
        queue,
        addToQueue,
        removeFirstOccurrenceFromQueue,
        clearQueue,
        currentTrack,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue(): QueueContextData {
  return useContext(QueueContext);
}
