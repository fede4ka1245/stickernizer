import {BrowserRouter, Route, Routes} from "react-router-dom";
import StickerEditorPage from "./pages/stickerEditorPage/StickerEditorPage";
import Main from "./pages/main/Main";
import {routes} from "./routes";
import SavedStickers from "./pages/savedStickers/SavedStickers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.stickerEditor} element={<StickerEditorPage />}/>
        <Route path={routes.main} element={<Main />}/>
        <Route path={routes.savedStickers} element={<SavedStickers />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
