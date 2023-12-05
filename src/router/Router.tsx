import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Get from "../views/Get";
import Post from "../views/Post";
import Put from "../views/Put";
import Delete from "../views/Delete";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get" element={<Get />} />
        <Route path="/post" element={<Post />} />
        <Route path="/put" element={<Put />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
