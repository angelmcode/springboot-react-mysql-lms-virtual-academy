import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import StudentHome from '../pages/StudentHome';

const RootRouter = () => {
  const { currentUser, isLoading } = useAuth();

  // 1. WAIT for the "vault" (localStorage) to open
  if (isLoading) {
    return <div className="bg-black min-h-screen" />; 
  }

  // 2. Now that we KNOW isLoading is false, we can trust currentUser
  if (!currentUser) {
    return <Home />;
  }

  // 3. Show student dashboard if they have the role
  if (currentUser.roles.includes("ROLE_STUDENT")) {
    return <StudentHome />;
  }

  // 4. Fallback: If they are an Admin/Teacher but NOT a student,
  // they see the Guest Home (unless you want to redirect them to /portal here)
  return <Home />;
};

export default RootRouter;