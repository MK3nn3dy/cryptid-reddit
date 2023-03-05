import { useDispatch, useSelector } from "react-redux";
import { getArticles, changeSubreddit } from "../articles/articleSlice";


const SearchBar = () => {

    const dispatch = useDispatch();
    let subreddit = useSelector((state) => state.articles.subreddit);
    let currentUser = useSelector((state) => state.user.user);
    
    const handleChange = (e) => {
        dispatch(changeSubreddit(e.target.value));
        dispatch(getArticles(e.target.value.replace(/\s/g,'')));
    }

    return (
            <form id="searchform" onSubmit={(e) => e.preventDefault()}>
                { currentUser.email && (<p className="user-welcome">{currentUser.email.split("@")[0]}</p>)}
                <label id="searchLabel" htmlFor="search">/r/ </label>
                <input type="text" id="search" value={subreddit} onChange={handleChange}/>
            </form>
    )
}

export default SearchBar;