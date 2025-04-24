
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Globe } from "lucide-react";

interface LoginFormProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onContinue: () => void;
  onGoogleLogin: () => void;
}

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  onContinue,
  onGoogleLogin,
}: LoginFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button className="w-full" onClick={onContinue}>
        <User className="mr-2 h-4 w-4" />
        Continue
      </Button>

      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">Or</span>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>

      <Button className="w-full" variant="outline" onClick={onGoogleLogin}>
        <Globe className="mr-2 h-4 w-4" />
        Login with Google
      </Button>
    </div>
  );
};

export default LoginForm;
