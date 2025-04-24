
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Player, Sport } from "../models/types";

interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  getPlayersBySport: (sport: Sport) => Player[];
  updateAttendance: (id: string, present: boolean) => void;
  sports: Sport[];
  addSport: (sport: string) => void;
  removeSport: (sport: string) => void;
}

const defaultSports: Sport[] = [
  "Football",
  "Basketball",
  "Cricket",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Athletics"
];

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });
  
  const [sports, setSports] = useState<Sport[]>(() => {
    const savedSports = localStorage.getItem("sports");
    return savedSports ? JSON.parse(savedSports) : defaultSports;
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("sports", JSON.stringify(sports));
  }, [sports]);

  const addPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  const getPlayersBySport = (sport: Sport) => {
    return players.filter((player) => player.sport === sport);
  };

  const updateAttendance = (id: string, present: boolean) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, attendance: present } : player
      )
    );
  };

  const addSport = (sport: string) => {
    if (!sports.includes(sport as Sport)) {
      setSports(prev => [...prev, sport as Sport]);
    }
  };

  const removeSport = (sport: string) => {
    // Don't allow removing a sport if there are players registered for it
    const playersInSport = players.filter(player => player.sport === sport);
    if (playersInSport.length === 0) {
      setSports(prev => prev.filter(s => s !== sport));
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        addPlayer,
        getPlayersBySport,
        updateAttendance,
        sports,
        addSport,
        removeSport
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
