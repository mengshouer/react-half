import { HashRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Router from "@/routers";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Router />
        </HashRouter>
      </QueryClientProvider>
    </div>
  );
}
