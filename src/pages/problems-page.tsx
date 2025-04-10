import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlockMath } from "react-katex";

interface Problem {
  question: string;
  _id: string;
  title: string;
  equation: string;
  asker: string;
  topic: string;
}

const ProblemsPage = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:3001/questions");
        const data = await res.json();
        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {problems.map((problem) => (
        <Card key={problem._id}>
          <CardHeader>
  <CardTitle className="text-base sm:text-lg">
    {problem.title}
  </CardTitle>
  <p className="text-xs text-gray-500">Topic: {problem.topic}</p>
  <p className="text-xs text-gray-500 mt-1">
  <strong>Asked by:</strong> {problem.asker}
</p>
</CardHeader>
<CardContent>
  <p className="text-xs sm:text-sm text-gray-700 mb-1">Solve:</p>
  <BlockMath math={problem.question || ""} />
  <Button variant="outline" className="mt-4 text-xs sm:text-sm">
    View Problem
  </Button>
</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProblemsPage;
