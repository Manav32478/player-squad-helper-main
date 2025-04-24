
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface RoleSelectorProps {
  role: "user" | "admin";
  setRole: (role: "user" | "admin") => void;
}

const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Choose your role</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={role === "user" ? "default" : "outline"}
          onClick={() => setRole("user")}
          className="flex-1"
        >
          User
        </Button>
        <Button
          type="button"
          variant={role === "admin" ? "default" : "outline"}
          onClick={() => setRole("admin")}
          className="flex-1"
        >
          Admin
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Note: In a real app, admin privileges would be granted by system admins.
      </p>
    </div>
  );
};

export default RoleSelector;
