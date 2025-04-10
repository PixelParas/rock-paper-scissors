import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/ask");  // Redirect to home page
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Registration successful! You can now log in.");
      navigate("/login");  // Redirect to login page
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs for Switching */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="min-h-[300px]">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email">Name</Label>
                  <Input id="email" type="text" placeholder="Enter your name" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="flex flex-col gap-1">   
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register" className="min-h-[300px]">
              <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <div  className="flex flex-col gap-1">
                  <Label htmlFor="email">Name</Label>
                  <Input id="email" type="text" placeholder="Enter your name" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button type="submit" className="w-full">Register</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
