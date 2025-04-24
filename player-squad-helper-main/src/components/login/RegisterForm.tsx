
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";

interface RegisterFormProps {
  registerUsername: string;
  setRegisterUsername: (value: string) => void;
  registerPassword: string;
  setRegisterPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  registerEmail: string;
  setRegisterEmail: (value: string) => void;
  registerPhone: string;
  setRegisterPhone: (value: string) => void;
  onRegister: () => void;
}

const RegisterForm = ({
  registerUsername,
  setRegisterUsername,
  registerPassword,
  setRegisterPassword,
  confirmPassword,
  setConfirmPassword,
  registerEmail,
  setRegisterEmail,
  registerPhone,
  setRegisterPhone,
  onRegister,
}: RegisterFormProps) => {
  return (
    <>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="registerUsername">Username *</Label>
          <Input
            id="registerUsername"
            type="text"
            placeholder="Choose a username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerPassword">Password *</Label>
          <Input
            id="registerPassword"
            type="password"
            placeholder="Create a password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerEmail">Email (Required if no phone)</Label>
          <Input
            id="registerEmail"
            type="email"
            placeholder="Your email address"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerPhone">Phone (Required if no email)</Label>
          <Input
            id="registerPhone"
            type="tel"
            placeholder="Your phone number"
            value={registerPhone}
            onChange={(e) => setRegisterPhone(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onRegister}>
          <KeyRound className="mr-2 h-4 w-4" />
          Create Account
        </Button>
      </CardFooter>
    </>
  );
};

export default RegisterForm;
