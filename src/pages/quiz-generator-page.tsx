import { useState, useEffect } from "react";
import React from "react";

interface Problem {
  question: string;
  _id: string;
  title: string;
  equation: string;
  asker: string;
  topic: string;
  solution: string; // Add a solution field for the spoiler
}

const CustomQuizzes: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [quizSize, setQuizSize] = useState<number>(5);
  const [quizDuration, setQuizDuration] = useState<number>(10); // in minutes
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [generatedQuiz, setGeneratedQuiz] = useState<Problem[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);

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

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleGenerateQuiz = () => {
    let filteredProblems = problems;

    if (selectedTopic !== "All") {
      filteredProblems = problems.filter(
        (problem) => problem.topic === selectedTopic
      );
    }

    const quiz = filteredProblems.slice(0, quizSize);
    setGeneratedQuiz(quiz);
    setShowForm(false);
    setTimeLeft(quizDuration * 60); // Convert minutes to seconds
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="quiz-generator-container p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Generator</h1>

      {/* Form for Quiz Options */}
      {showForm && (
        <div className="card border rounded p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Quiz Options</h2>
          <label className="block mb-2">
            <span className="text-sm font-medium">Quiz Size (Number of Questions):</span>
            <input
              type="number"
              value={quizSize}
              onChange={(e) => setQuizSize(Number(e.target.value))}
              className="border rounded p-2 w-full"
              min={1}
              max={problems.length}
            />
          </label>

          <label className="block mb-2">
            <span className="text-sm font-medium">Quiz Duration (Minutes):</span>
            <input
              type="number"
              value={quizDuration}
              onChange={(e) => setQuizDuration(Number(e.target.value))}
              className="border rounded p-2 w-full"
              min={1}
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium">Select Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="All">All</option>
              {[...new Set(problems.map((problem) => problem.topic))].map(
                (topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                )
              )}
            </select>
          </label>

          <button
            onClick={handleGenerateQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate Quiz
          </button>
        </div>
      )}

      {/* Timer */}
      {!showForm && timeLeft > 0 && (
        <div className="timer text-lg font-bold mb-4">
          Time Left: {formatTime(timeLeft)}
        </div>
      )}

      {/* Generated Quiz */}
      {generatedQuiz.length > 0 && (
        <div className="generated-quiz">
          <h2 className="text-xl font-bold mb-4">Generated Quiz</h2>
          <p className="text-sm mb-4">
            Duration: {quizDuration} minutes | Number of Questions: {quizSize}
          </p>
          <ul className="space-y-4">
            {generatedQuiz.map((problem, index) => (
              <li key={problem._id} className="border rounded p-4">
                <h3 className="font-bold">
                  Q{index + 1}: {problem.title}
                </h3>
                <p>{problem.question}</p>
                <p className="text-sm text-gray-500">Topic: {problem.topic}</p>
                <button
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded mt-2"
                  onClick={(e) => {
                    const spoiler = e.currentTarget.nextElementSibling;
                    if (spoiler) {
                      spoiler.classList.toggle("hidden");
                    }
                  }}
                >
                  Show Solution
                </button>
                <p className="hidden mt-2 text-sm text-gray-700">
                  {problem.solution}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomQuizzes;