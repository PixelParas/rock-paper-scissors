import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className="flex flex-col gap-1">   
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="password" required />
                </div>

                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register" className="min-h-[300px]">
              <form className="flex flex-col gap-4">
                <div  className="flex flex-col gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="password" required />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm password" required />
                </div>

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
