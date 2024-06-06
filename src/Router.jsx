import { UserProvider } from "./contexts/userContext";
import RoutesAuth from "./routes/RoutesAuth";

export function Router() {
  return (
    <UserProvider>
      <RoutesAuth />
    </UserProvider>
  );
}
