import { useDispatch } from 'react-redux';
import { setFullArticle, toggleFullArticle } from './articleSlice';

const Article = ({article}) => {

    const dispatch = useDispatch();

    const changeFullArticle = () => {
        dispatch(setFullArticle(article));
        dispatch(toggleFullArticle(true));
    }

    return(
       <article onClick={changeFullArticle}>
            <h3>{article.title.substring(0, 100)}...</h3>
            <a className="redditLink" href={"https://www.reddit.com" + article.permalink} target="_blank"><div className="to-reddit"></div></a>
            <p className="expand-text" onClick={changeFullArticle}>Open</p>
       </article>
    )
}

export default Article;