function fetchNews(url) {
    // RESET IMAGE ARRAY
    imgUrls = [];

    return fetch(url)
        .then(response => response.text())
        .then(result => {
            const strxml = result
            const parser = new DOMParser();
            const srcDOM = parser.parseFromString(strxml, "application/xml");
            return xml2json(srcDOM)
        })
        .then(jsonResult => {
            const articles = jsonResult.rss.channel.item
            let articlesWithImg = []

            articles.forEach((article, index) => {
                article["media:content"] = imgUrls[index]
                articlesWithImg.push(article)
            })
            
            return articlesWithImg
        })      
}

// All ARTICLE IMAGE ARRAY
let imgUrls = [];

function xml2json(srcDOM) {
    let children = [...srcDOM.children];

    // base case for recursion. 
    if (!children.length) {
        return srcDOM.innerHTML
    }

    // initializing object to be returned. 
    let jsonResult = {};
     
    for (let child of children) {

        // checking is child has siblings of same name. 
        let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

        // if child is array, save the values as array, else as strings. 
        if (childIsArray) {
            if (jsonResult[child.nodeName] === undefined) {
                jsonResult[child.nodeName] = [xml2json(child)];
            } else {
                jsonResult[child.nodeName].push(xml2json(child));
            }
        } else {
            jsonResult[child.nodeName] = xml2json(child);
        }
        // MY CHANGES TO THE ORIGINAL CODE
        if (child.nodeName === 'media:content') imgUrls.push(child.getAttribute('url'))
    }

    return jsonResult;
}
