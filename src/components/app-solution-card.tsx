import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const SolutionCard = ({ verified = false, content }: { verified: boolean; content: string }) => {
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => setVotes(votes + 1);
  const handleDownvote = () => setVotes(votes - 1);

  return (
    <Card
      className={`relative ${
        verified ? "bg-gradient-to-br from-green-50 to-green-100" : ""
      } p-4 sm:p-6`}
    >
    <div className="flex flex-col gap-3">
      <div className="absolute top-2 left-12 flex items-center gap-2">
        <button
          onClick={handleUpvote}
          className="px-2 py-1 bg-green-500 text-white text-xs sm:text-sm rounded hover:bg-green-600"
        >
          👍
        </button>
        <span className="text-xs sm:text-sm text-gray-700">{votes}</span>
        <button
          onClick={handleDownvote}
          className="px-2 py-1 bg-red-500 text-white text-xs sm:text-sm rounded hover:bg-red-600"
        >
          👎
        </button>
      </div>
      </div>
      {verified && (
        <div className="absolute top-2 right-2 bg-gradient-to-br from-green-400 to-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          ✅ Verified
        </div>
      )}
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <img
            src="https://raw.githubusercontent.com/laynH/Anime-Girls-Holding-Programming-Books/master/C%2B%2B/Sakura_Nene_CPP.jpg"
            alt="Solver Profile"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
          />
          <p className="text-xs sm:text-sm text-gray-500">Solution by: PixelParas</p>
        </div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;