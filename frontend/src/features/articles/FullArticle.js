import { useSelector, useDispatch} from "react-redux";
import { toggleFullArticle } from "./articleSlice";

const FullArticle = () => {

    const dispatch = useDispatch();
    const fullArticle = useSelector((state) => state.articles.fullArticle);
    const visible = useSelector((state) => state.articles.fullArticleVisible);

    const closeArticle = () => {
        dispatch(toggleFullArticle(false));
    }
    // line 22 used to output url as <p> text as well as href but now just displays "Go To Reddit Post"
    return (
        visible &&
        <div className="full-article-bg">
            <div className="full-article-panel">
                <div className="full-article-gradient"></div>
                <h3>{fullArticle.title.substring(0, 100)}</h3>
                <p className="full-article-text">{fullArticle.selftext}</p>
                {fullArticle.url.includes('jpg') && <img src={fullArticle.url}/>}
                <div className="full-article-link-to-reddit-container">
                    <a id="full-article-link-to-reddit" target="_blank" href={"https://www.reddit.com" + fullArticle.permalink}><p>Go to Reddit Post</p></a>
                </div>
                {fullArticle.url.includes('jpg') && <a href={fullArticle.url} target="_blank" id="link-to-image">View Image</a>}
                <div className="close-window-button close-article" onClick={closeArticle}>Close</div>
                <div className="up-down-display">
                    <div className="ups">{fullArticle.ups}</div>
                    <div className="up-down-icon"></div>
                    <div className="downs">{fullArticle.downs}</div>
                </div>
            </div>
        </div>
    )
}

export default FullArticle;