import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlockMath, InlineMath } from "react-katex";
import SolutionCard from "@/components/app-solution-card";

const what_is_integration_solution = `### **Problem:**  
Solve for \( x \) in the equation:  
∫ (x² + 2x + 1) dx = 0  

---

### **Solution:**

#### **Step 1: Compute the Indefinite Integral**  
We integrate each term separately:  

∫ (x² + 2x + 1) dx = ∫ x² dx + ∫ 2x dx + ∫ 1 dx  

Using standard integration formulas:  

∫ xⁿ dx = (xⁿ⁺¹) / (n+1),  
∫ c dx = cx  

Computing each term:  

∫ x² dx = x³/3,  
∫ 2x dx = x²,  
∫ 1 dx = x  

Thus,  

∫ (x² + 2x + 1) dx = x³/3 + x² + x + C  

---

#### **Step 2: Solve for x**  
Setting the integral equal to zero:  

x³/3 + x² + x + C = 0  

If C = 0, the equation simplifies to:  

x³/3 + x² + x = 0  

Multiplying by 3 to clear the fraction:  

x³ + 3x² + 3x = 0  

Factoring out x:  

x (x² + 3x + 3) = 0  

Setting each factor to zero:  

1. x = 0  
2. Solve x² + 3x + 3 = 0 using the quadratic formula:  

   x = (-3 ± √(9 - 12)) / 2  
   x = (-3 ± √-3) / 2  
   x = (-3 ± i√3) / 2  

---

### **Final Answer:**  
For C = 0, the solutions are:  
x = 0,  
x = (-3 + i√3) / 2,  
x = (-3 - i√3) / 2.  `

const ProblemPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 sm:p-6 h-screen">
      {/* Left Column (80%) */}
      <div className="col-span-1 sm:col-span-4 flex flex-col gap-4">
        {/* Problem Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Problem Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCANrMO54saVeRfFy8Vbu3cg1cRShi7yFMQ&s"
                alt="Asker Profile"
                className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
              />
              <p className="text-xs sm:text-sm text-gray-500">Asked by: __.Sanikaaa.__</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">
              Solve for <InlineMath math="x" />:
            </p>
            <BlockMath math="2x + 5 = 15" />
          </CardContent>
        </Card>

        {/* Solution Card */}
        <SolutionCard verified={true} content={what_is_integration_solution} />
      </div>

      {/* Right Column (20%) */}
      <div className="col-span-1 flex flex-col gap-4">
        <h2 className="text-base sm:text-lg font-bold">Similar Problems</h2>
        <Button variant="outline" className="text-xs sm:text-sm">
          Solve for <InlineMath math="y" />: <BlockMath math="3y + 7 = 22" />
        </Button>
        <Button variant="outline" className="text-xs sm:text-sm">
          Find <InlineMath math="x" />: <BlockMath math="5x - 2 = 18" />
        </Button>
        <Button variant="outline" className="text-xs sm:text-sm">
          Equation: <BlockMath math="4z + 10 = 30" />
        </Button>
      </div>
    </div>
  );
};

export default ProblemPage;
