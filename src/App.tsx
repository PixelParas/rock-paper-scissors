import { Button } from "@/components/ui/button"
import Header from "./components/app-header"
import AuthPage from "./pages/login-page"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home-page"
import CustomQuizzes from "./pages/quiz-generator-page"
import TextbookSolutions from "./pages/textbook-solutions-page"
import AIHelp from "./pages/AI-help-page"
import ProblemPage from "./pages/problem-page"
import AskAProblemPage from "./pages/ask-a-problem-page"

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ProblemPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizzes" element={<CustomQuizzes />} />
        <Route path="/ask" element={<AskAProblemPage />} />
        <Route path="/textbook" element={<TextbookSolutions />} />
        <Route path="/ai-help" element={<AIHelp />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </div>
  )
}
 
export default App