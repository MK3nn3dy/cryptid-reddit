// component imports
import SearchBar from "./features/searchbar/SearchBar";
import Articles from "./features/articles/Articles";
import ShortcutBar from "./features/shortcutbar/ShortcutBar";
import FilterResults from "./features/filterresults/FilterResults";
import ShortcutsToAdd from "./features/shortcutbar/ShortcutsToAdd";
import RenderWarning from "./features/shortcutwarning/RenderWarning";
import FullArticle from "./features/articles/FullArticle";
import Login from "./features/login/Login"; 
import Signup from "./features/login/Signup";

// library imports
import { useSelector } from "react-redux";
import { useEffect } from "react";


import { useDispatch } from "react-redux";

function App() {

  // login / signup visibility from state:
  const loginVisible = useSelector((state) => state.login.loginVisible);
  const signupVisible = useSelector((state) => state.login.signupVisible);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
        <ShortcutBar />
        <FilterResults />
        <FullArticle />
      </header>
      <main id="App-main-content">
        {loginVisible && <Login/>}
        {signupVisible && <Signup/>}
        <Articles />
      </main>
      <footer>
        <RenderWarning />
        <ShortcutsToAdd />
      </footer>
    </div>
  );
}

export default App;
