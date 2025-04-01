import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";

const AskAProblemPage = () => {
  const [problem, setProblem] = useState("");
  const [equation, setEquation] = useState("");

  const handleSubmit = () => {
    console.log("Problem:", problem);
    console.log("Equation:", equation);
    // Add logic to handle submission
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
