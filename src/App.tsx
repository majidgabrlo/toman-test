import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PaymentDetail from "./pages/PaymentDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<PaymentDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
