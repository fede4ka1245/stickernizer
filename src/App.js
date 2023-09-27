import {BrowserRouter, Route, Routes} from "react-router-dom";
import StickerEditor from "./pages/stickerEditor/StickerEditor";
import Header from "./components/header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<StickerEditor />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
