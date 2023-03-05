import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Article from "./Article";
import { getArticles } from "./articleSlice";

const Articles = () => {

    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.articles);
    const filterText = useSelector(state => state.articles.filterText);

    console.log(filterText);

    useEffect(() => {
        dispatch(getArticles("cryptids"))
    }, [,])

    return (
        <section id="articles">
            {
                    articles && articles.filter((article) => {
                        if(filterText === ""){
                            return article;
                        } else if (article.data.selftext.toLowerCase().includes(filterText.toLowerCase())){
                            return article;
                        } else if (article.data.title.toLowerCase().includes(filterText.toLowerCase())){
                            return article;
                        }
                    }).map((article, index) => {
                        return <Article article={article.data} key={index}/>
                })
            }
        </section>
    )
}

export default Articles;