
function notificationCounter() {
    const savedArticles = syncWithLS("savedArticles", [])
    let notiCircle = document.querySelector('.notification')
    
    if (savedArticles.length > 0) {
        const archiveLink = document.querySelector(`a[href="./archive/"]`)
        
        if (!notiCircle) {
            notiCircle = document.createElement('div')
            notiCircle.classList.add('notification')
            archiveLink.style.position = "relative"
            archiveLink.append(notiCircle)            
        }

        notiCircle.innerText = savedArticles.length
    } else {
        if (notiCircle) notiCircle.remove()
    }
}
