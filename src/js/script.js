document.addEventListener('DOMContentLoaded', () => {
    console.log('src/script.js is loaded');

    fetchNews('https://rss.nytimes.com/services/xml/rss/nyt/World.xml')
    async function fetchNews(url) {
        const response = await fetch(url)
        const result = await response.text()
        console.log(result);
    }


    // fetch('https://rss.nytimes.com/services/xml/rss/nyt/World.xml')
    //     .then(response => response.text())
    //     .then(result => {
    //         const strxml = result
    //         const parser = new DOMParser();
    //         const srcDOM = parser.parseFromString(strxml, "application/xml");
    //         return xml2json(srcDOM)
    //     })
    //     .then(jsonResult => {
    //     const news = jsonResult.rss.channel.item[0]
        
    //     let newsStr = JSON.stringify(news)

    //     localStorage.setItem("news", newsStr)
    //     let local = localStorage.getItem("news")
    //     console.log(JSON.parse(local));
    //     })

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
        }
        return jsonResult;
    }

    
})



