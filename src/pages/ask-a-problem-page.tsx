import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
}

const AskAProblemPage = () => {
  const token = localStorage.getItem("token");
  const [problem, setProblem] = useState("");
  const [topic, setTopic] = useState("");
  const handleSubmit = async () => {
    if (!problem.trim() || !topic.trim()) {
      alert("Please enter the topic and the problem before submitting.");
      return;
    }

    if (!token) {
      alert("You must be logged in to submit a problem.");
      return;
    }
    
    const decoded = jwtDecode<DecodedToken>(token);
    const asker = decoded.name || decoded.email;

    try {
      const res = await axios.post("http://localhost:3001/ask-question",
        { topic, asker, question: problem },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Question submitted:", res.data);
      alert("Your problem was submitted successfully!");
      setProblem(""); // Clear the form 
      setTopic("");//Clear the topic
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("An error occurred while submitting your problem.");
    }
  };

  return (
    <div className="p-4 sm:p-6 h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm sm:max-w-lg">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Ask a Problem</CardTitle>
        </CardHeader>
   
        <CardContent>
          <div className="flex flex-col gap-4">
          <label className="text-sm sm:text-base text-gray-700 font-medium">
              Enter Topic
            </label>
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border rounded px-3 py-2 text-sm sm:text-base"
            />
            <label className="text-sm sm:text-base text-gray-700 font-medium">
              Problem Statement
            </label>
            <Textarea
              placeholder="Describe your problem..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="text-sm sm:text-base"
            />
            <Button onClick={handleSubmit} className="mt-4 text-sm sm:text-base">
              Submit Problem
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskAProblemPage;
