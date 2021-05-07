let localSavedArticles = JSON.parse(localStorage.getItem("savedArticles")) 
let savedArticles = localSavedArticles ? localSavedArticles : [] 

function saveArticleToLS(category, cardContent) {
    console.log('saveArticleToLS'); 
    
    const linkUrl = cardContent.toString()
    const imgSrc = cardContent.querySelector('.card-content__img').getAttribute('src')
    const heading = cardContent.querySelector('.card-content__heading').innerText
    const desc = cardContent.querySelector('.card-content__description').innerText
    category = category.toLowerCase()

    const article = {
        link: linkUrl,
        img: imgSrc,
        heading: heading,
        description: desc,
        category: category,
        id: savedArticles.length
    }

    savedArticles.push(article)
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))

    let local = localStorage.getItem("savedArticles")
    console.log(JSON.parse(local)); 

}

// let localStorage = (() => {
//     let newsStr = JSON.stringify(news)

//     localStorage.setItem("news", newsStr)
//     let local = localStorage.getItem("news")
//     console.log(JSON.parse(local));    
// })();