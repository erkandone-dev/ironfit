import Navigation from "./navigation";
import { PremiumProvider } from "./context/PremiumContext";
import { AuthProvider } from "./context/AuthContext";
import AuthGate from "./screens/AuthGate";

export default function App(){
  return(
    <AuthProvider>
      <PremiumProvider>
        <AuthGate>
          <Navigation/>
        </AuthGate>
      </PremiumProvider>
    </AuthProvider>
  )
}
