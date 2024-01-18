import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout";
import IndexPage from "./page";
import RootProvider from "./provider";

function App() {
  return (
    <RootProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<IndexPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootProvider>
  );
}

export default App;
