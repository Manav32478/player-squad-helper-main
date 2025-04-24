
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mongoDBService } from "@/utils/mongoDBService";

// Import the new component files
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import OtpVerification from "@/components/login/OtpVerification";
import RoleSelector from "@/components/login/RoleSelector";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithCredentials, register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Credentials login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Register states
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  
  // OTP states
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifiedUser, setVerifiedUser] = useState<any>(null);
  
  // Role selection for demo purposes
  const [role, setRole] = useState<"user" | "admin">("user");
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const handleCredentialsValidation = async () => {
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Verify credentials first without logging in
      const user = mongoDBService.verifyCredentials(username, password);
      
      // Store temporarily for OTP verification
      setVerifiedUser(user);
      
      // Show OTP verification
      setShowOTP(true);
      
      // Show OTP message based on contact method
      let contactMethod = "registered contact method";
      if (user.email) contactMethod = "email";
      if (user.phone) contactMethod = "phone";
      
      // Send OTP (simulated)
      toast({
        title: "OTP Sent",
        description: `We've sent a verification code to your ${contactMethod}`,
      });
      
      // For demo, we'll use a fake OTP
      console.log("Demo OTP: 123456");
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };
  
  const handleVerifyOTP = () => {
    // For demo purposes, any 6-digit OTP is valid
    if (otp.length === 6) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${verifiedUser.username}!`,
      });
      
      // Log in the user
      login({
        id: verifiedUser.id,
        username: verifiedUser.username,
        email: verifiedUser.email,
        phone: verifiedUser.phone,
        role: verifiedUser.role,
      });
      
      // Redirect based on role
      if (verifiedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
    }
  };
  
  const handleRegister = async () => {
    // Validate form
    if (!registerUsername || !registerPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Validate that either email or phone is provided
    if (!registerEmail && !registerPhone) {
      toast({
        title: "Error",
        description: "Either email or phone number is required",
        variant: "destructive"
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // Check if username exists
    if (mongoDBService.usernameExists(registerUsername)) {
      toast({
        title: "Error",
        description: "Username already exists",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Register new user
      await register(
        registerUsername, 
        registerPassword, 
        "user", // Only admins can create admin accounts
        registerEmail || undefined, 
        registerPhone || undefined
      );
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created",
      });
      
      // Redirect to home
      navigate("/");
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration",
        variant: "destructive"
      });
    }
  };
  
  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "In a real app, this would redirect to Google OAuth",
    });
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      login({
        id: Date.now().toString(),
        username: "googleuser",
        email: "user@example.com",
        role: role,
      });
      
      toast({
        title: "Login Successful",
        description: `You have successfully logged in as a ${role}`,
      });
      
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 1500);
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" onValueChange={(value) => setActiveTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RoleSelector role={role} setRole={setRole} />
                
                {!showOTP ? (
                  <LoginForm 
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    onContinue={handleCredentialsValidation}
                    onGoogleLogin={handleGoogleLogin}
                  />
                ) : (
                  <OtpVerification
                    otp={otp}
                    setOtp={setOtp}
                    onVerify={handleVerifyOTP}
                    onBack={() => setShowOTP(false)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                  Register a new user account
                </CardDescription>
              </CardHeader>
              <RegisterForm
                registerUsername={registerUsername}
                setRegisterUsername={setRegisterUsername}
                registerPassword={registerPassword}
                setRegisterPassword={setRegisterPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                registerEmail={registerEmail}
                setRegisterEmail={setRegisterEmail}
                registerPhone={registerPhone}
                setRegisterPhone={setRegisterPhone}
                onRegister={handleRegister}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
