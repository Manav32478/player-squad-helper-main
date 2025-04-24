
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlayerContext } from "@/context/PlayerContext";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { players, sports } = usePlayerContext();
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to SportsSelect</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Register for sports tryouts, view registered players, and manage attendance for selection day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Sign up for sports tryouts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Fill out our registration form to participate in sports selection trials.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/register">Register Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Player List</CardTitle>
            <CardDescription>View registered players</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Browse the list of all registered players by sport.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/players">View Players</Link>
            </Button>
          </CardFooter>
        </Card>

        {isAuthenticated && isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Mark attendance for selection day</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track which players are present for their tryouts.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/attendance">Take Attendance</Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {isAuthenticated && isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage sports and players</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Access administrative features for the SportsSelect platform.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin">Admin Panel</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {sports.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Available Sports</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sports.map((sport) => (
              <Card key={sport} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{sport}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {players.filter(p => p.sport === sport).length} registered
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
