
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OtpVerificationProps {
  otp: string;
  setOtp: (value: string) => void;
  onVerify: () => void;
  onBack: () => void;
}

const OtpVerification = ({ otp, setOtp, onVerify, onBack }: OtpVerificationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">Enter Verification Code</Label>
        <p className="text-sm text-muted-foreground">
          We sent a code to your registered contact method
        </p>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button className="w-full" onClick={onVerify}>
        Verify & Login
      </Button>
      <Button variant="link" className="w-full" onClick={onBack}>
        Back to login
      </Button>
    </div>
  );
};

export default OtpVerification;
