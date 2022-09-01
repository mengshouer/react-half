import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </div>
  );
}
