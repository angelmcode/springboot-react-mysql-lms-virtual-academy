import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import StudentHome from '../pages/StudentHome';

const RootRouter = () => {
  const { currentUser, isLoading } = useAuth();

  // 1. WAIT for the "vault" (localStorage) to open
  if (isLoading) {
    return <div className="bg-black min-h-screen" />; 
  }

  // 2. If no user, show the public landing page
  if (!currentUser) {
    return <Home />;
  }

  // 3. ✅ NEW: Show student dashboard if they have permission to see it
  if (currentUser.permissions?.includes("ACCESS_STUDENT_PANEL")) {
    return <StudentHome />;
  }

  // 4. Fallback: If they are logged in but don't have student access 
  // (e.g., they are just a teacher/admin), show the default Home.
  return <Home />;
};

export default RootRouter;