function fetchNews(url) {

    return fetch(url)
        .then(response => response.text())
        .then(result => {
            const strxml = result
            const parser = new DOMParser();
            const srcDOM = parser.parseFromString(strxml, "application/xml");
            return xml2json(srcDOM)
        })
        .then(jsonResult => jsonResult.rss.channel.item)      
}

function xml2json(srcDOM) {

    let children = [...srcDOM.children];
  
    // base case for recursion. 
    if (!children.length) {
  
      if (srcDOM.hasAttributes()) {      
        var attrs = srcDOM.attributes;
        var output = {};
        for(var i = attrs.length - 1; i >= 0; i--) {
          output[attrs[i].name] = attrs[i].value;
        }
  
        output.value = srcDOM.innerHTML;
        return output;
  
      } else {
        return srcDOM.innerHTML
      }  
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