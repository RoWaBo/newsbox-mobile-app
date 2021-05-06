
const card = document.querySelector('.card');

if (card) {

    function getNYTArticles(category, distElmnt) {
        category = category.toLowerCase()
        fetchNews(`https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`)
            .then(response => addArticlesToHTML(response, distElmnt))
    }

    function addArticlesToHTML(newsArticles, distElmnt) {
        newsArticles.slice(0, 5).forEach(article => {
            console.log(article);
            
            const cardContent = document.createElement('div')
            cardContent.classList.add('card-content')

            const description = article["media:description"] ? article["media:description"] : article.description 

            // const tag = article.category ? article.category[0] : article.title 

            // fetchRelatedImg(tag).then(articleImg => {
            //     cardContent.innerHTML = `
            //     <a href="${article.link}" class="card-content__link">
            //         <div class="card-content__img-container">
            //             <img src="${articleImg}" alt="" class="card-content__img">
            //         </div>
            //         <div class="card-content__text-container">
            //             <h2 class="card-content__heading">${article.title}</h2>
            //             <p class="card-content__description">${article["media:description"]}</p>
            //         </div>
            //     </a>
            //     `
            //     distElmnt.append(cardContent);
            // })

            cardContent.innerHTML = `
                <a href="${article.link}" class="card-content__link">
                    <div class="card-content__img-container">
                        <img src="https://source.unsplash.com/random/70x70" alt="" class="card-content__img">
                    </div>
                    <div class="card-content__text-container">
                        <h2 class="card-content__heading">${article.title}</h2>
                        <p class="card-content__description">${description}</p>
                    </div>
                </a>
                `
            distElmnt.append(cardContent);
        })
        createSaveBtn(distElmnt)
        // Takes one argument: The elements class name that you want to make swipable
        addSwipability('card-content__link')
    }


    function fetchRelatedImg(tag) {
        const id = 'client_id=' + 'FuPL1hfzN0nfjZIYYlZI7EkZXcTXTH6JIHY7aBMVg_8'
        let searchText = 'query=' + tag

        return fetch(`https://api.unsplash.com/search/photos?per_page=1&${searchText}&${id}`)
            .then(response => response.json())
            .then(data => {
                const img = data.results[0].urls.thumb
                return img
            })
    }



    document.addEventListener('click', e => {
        // ARROW BTNS
        if (e.target.classList.contains("toggleContent")) {

            const arrowBtn = e.target
            const cardTitle = e.target.previousElementSibling.innerText
            const cardSection = e.target.parentElement.parentElement
            const newsArticles = cardSection.querySelectorAll('.card-content')

            if (arrowBtn.style.transform === '') {
                if (cardSection.children.length == 1) {
                    getNYTArticles(cardTitle, cardSection)
                }
                else {
                    newsArticles.forEach(article => article.style.display = "block")
                }
                arrowBtn.style.transform = "rotate(90deg)"
            } else {
                arrowBtn.style.transform = ''
                newsArticles.forEach(article => article.style.display = "none")
            }

        }

        // SWIPE BTNS
        if (e.target.classList.contains("swipe-btn")) {
            const parent = e.target.parentElement

            if (parent.classList.contains('create-save-btn')) {
                console.log('save news item');
            }
            else if (parent.classList.contains('create-delete-btn')) {
                console.log('delete news item');
            }
        }

    })

}

