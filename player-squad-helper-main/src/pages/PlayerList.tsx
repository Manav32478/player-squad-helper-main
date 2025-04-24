
import { useState, useEffect } from "react";
import { usePlayerContext } from "@/context/PlayerContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sport } from "@/models/types";
import { UserIcon, Users } from "lucide-react";

const PlayerList = () => {
  const { players, sports, getPlayersBySport } = usePlayerContext();
  const { user } = useAuth();
  
  // Get the player's registered sport(s)
  const userPlayer = user ? players.find(player => player.name === user.username) : null;
  const userSport = userPlayer ? userPlayer.sport : null;
  
  const [selectedSport, setSelectedSport] = useState<Sport>(userSport || (sports[0] || ""));
  
  // If user doesn't have a sport but sports exist, use the first sport
  useEffect(() => {
    if (!userSport && sports.length > 0 && !selectedSport) {
      setSelectedSport(sports[0]);
    }
  }, [userSport, sports, selectedSport]);
  
  // Update selected sport if the current one is removed
  useEffect(() => {
    if (sports.length > 0 && !sports.includes(selectedSport)) {
      setSelectedSport(sports[0]);
    }
  }, [sports, selectedSport]);

  // Only display the selected sport's stats
  const selectedSportPlayers = getPlayersBySport(selectedSport);
  
  // Determine visible sports - if user is a player, they can only see their sport
  // If they're an admin or don't have a registered sport, they can see all sports
  const visibleSports = userSport && !user?.role?.includes("admin") ? [userSport] : sports;

  return (
    <div className="container mx-auto py-10 fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center text-gradient">Registered Players</h1>
      
      <Card className="mb-8 hover-card glass-card">
        <CardHeader>
          <CardTitle>Player Statistics</CardTitle>
          <CardDescription>Overview of registered players</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted/80 p-6 rounded-lg text-center flex flex-col items-center justify-center hover:bg-muted transition-colors">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <p className="text-3xl font-bold">{players.length}</p>
              <p className="text-sm text-muted-foreground">Total Players</p>
            </div>
            <div className="bg-muted/80 p-6 rounded-lg text-center flex flex-col items-center justify-center hover:bg-muted transition-colors">
              <UserIcon className="h-8 w-8 mb-2 text-secondary" />
              <p className="text-3xl font-bold">{selectedSportPlayers.length}</p>
              <p className="text-sm text-muted-foreground">{selectedSport} Players</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {visibleSports.length > 0 ? (
        <Tabs 
          defaultValue={selectedSport} 
          onValueChange={(value) => setSelectedSport(value as Sport)}
          value={selectedSport}
          className="animate-float"
        >
          <TabsList className={`grid ${visibleSports.length <= 4 ? `grid-cols-${visibleSports.length}` : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-7'} mb-8`}>
            {visibleSports.map(sport => (
              <TabsTrigger key={sport} value={sport} className="font-medium">
                {sport}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedSport}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-primary"></span>
                  {selectedSport} Players
                </CardTitle>
                <CardDescription>
                  {selectedSportPlayers.length} registered players
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSportPlayers.length > 0 ? (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Table className="table-fancy">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Age</TableHead>
                          <TableHead className="font-semibold">Gender</TableHead>
                          <TableHead className="font-semibold">Level</TableHead>
                          <TableHead className="font-semibold">Contact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedSportPlayers.map((player) => (
                          <TableRow key={player.id} className="transition-colors hover:bg-muted/50">
                            <TableCell className="font-medium">{player.name}</TableCell>
                            <TableCell>{player.age}</TableCell>
                            <TableCell className="capitalize">{player.gender}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium">
                                {player.level}
                              </span>
                            </TableCell>
                            <TableCell>{player.contact}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-lg text-muted-foreground">No players registered for {selectedSport} yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-lg glass-card">
          <p className="text-xl text-muted-foreground">No sports available. Please contact an administrator.</p>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
