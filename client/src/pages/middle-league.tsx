import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const MiddleLeaguePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Middle School League</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Welcome to the Middle School League - designed specifically for students in grades 6-8 
          to develop advanced academic skills and prepare for competitive examinations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Mathematics</CardTitle>
            <CardDescription>Algebra, Geometry, and Problem Solving</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Tackle algebraic equations, geometric proofs, and mathematical reasoning 
              problems designed for middle school students.</p>
          </CardContent>
          <CardFooter>
            <Button>Start Practice</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Science Competitions</CardTitle>
            <CardDescription>Physics, Chemistry, and Biology</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore scientific principles through structured problems and experiments 
              covering key middle school science topics.</p>
          </CardContent>
          <CardFooter>
            <Button>Start Practice</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Language & Literature</CardTitle>
            <CardDescription>Critical Reading and Writing</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Develop analytical reading skills and written expression through exercises 
              designed for middle school English language standards.</p>
          </CardContent>
          <CardFooter>
            <Button>Start Practice</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Competitions</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-semibold mr-2">April 10, 2025:</span> 
            <span>Middle School Math League - Round 1</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">April 25, 2025:</span> 
            <span>Science Bowl Regional Competition</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">May 15, 2025:</span> 
            <span>Essay Writing Competition - Topic: "Innovation and Technology"</span>
          </li>
        </ul>
      </div>
      
      <div className="rounded-lg border p-6">
        <h2 className="text-2xl font-bold mb-4">Study Groups</h2>
        <p className="mb-4">Join other middle school students in our virtual study groups to prepare for competitions together.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Math Olympiad Prep</CardTitle>
              <CardDescription>Tuesdays & Thursdays</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">Join Group</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Science Explorers</CardTitle>
              <CardDescription>Mondays & Wednesdays</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">Join Group</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MiddleLeaguePage;