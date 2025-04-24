
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-primary-foreground py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          SportsSelect
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>

          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/players">Players</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/attendance">Attendance</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/admin">Admin</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/players">Players</Link>
                  </Button>
                </>
              )}
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="secondary" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
