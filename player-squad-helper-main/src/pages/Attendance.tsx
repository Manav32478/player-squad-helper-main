
import { useState } from "react";
import { usePlayerContext } from "@/context/PlayerContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sport } from "@/models/types";

const Attendance = () => {
  const { players, sports, getPlayersBySport, updateAttendance } = usePlayerContext();
  const { toast } = useToast();
  const [selectedSport, setSelectedSport] = useState<Sport>(sports[0]);
  const [saved, setSaved] = useState<boolean>(false);

  const sportPlayers = getPlayersBySport(selectedSport);

  const handleAttendanceChange = (id: string, present: boolean) => {
    updateAttendance(id, present);
    setSaved(false);
  };

  const handleSaveAttendance = () => {
    setSaved(true);
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${selectedSport} players has been recorded.`,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Selection Day Attendance</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Attendance Tracker</CardTitle>
          <CardDescription>Mark present or absent for selection day</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Mark the attendance for each player on the selection day. Players marked as absent will not be considered for selection.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue={sports[0]} onValueChange={(value) => {
        setSelectedSport(value as Sport);
        setSaved(false);
      }}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
          {sports.map(sport => (
            <TabsTrigger key={sport} value={sport}>
              {sport}
            </TabsTrigger>
          ))}
        </TabsList>

        {sports.map(sport => (
          <TabsContent key={sport} value={sport}>
            <Card>
              <CardHeader>
                <CardTitle>{sport} Attendance</CardTitle>
                <CardDescription>
                  {getPlayersBySport(sport).length} registered players
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getPlayersBySport(sport).length > 0 ? (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Present</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getPlayersBySport(sport).map((player) => (
                          <TableRow key={player.id}>
                            <TableCell className="font-medium">{player.name}</TableCell>
                            <TableCell>{player.level}</TableCell>
                            <TableCell>
                              <Switch 
                                checked={player.attendance === true}
                                onCheckedChange={(checked) => handleAttendanceChange(player.id, checked)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleSaveAttendance} disabled={saved}>
                        {saved ? "Attendance Saved" : "Save Attendance"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No players registered for {sport} yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {saved && (
        <Card className="mt-8 bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="font-bold mb-2">Present ({sportPlayers.filter(p => p.attendance === true).length})</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {sportPlayers.filter(p => p.attendance === true).map(player => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="font-bold mb-2">Absent ({sportPlayers.filter(p => p.attendance === false).length})</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {sportPlayers.filter(p => p.attendance === false).map(player => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
