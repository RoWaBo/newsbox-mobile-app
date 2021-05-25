
function notificationCounter() {
    const savedArticles = syncWithLS("savedArticles", [])
    
    if (savedArticles.length > 0) {
        const archiveLink = document.querySelector(`a[href="./archive/"]`)
        let notiCircle = archiveLink.querySelector('.notification')

        if (!notiCircle) {
            notiCircle = document.createElement('div')
            notiCircle.classList.add('notification')
            archiveLink.style.position = "relative"
            archiveLink.append(notiCircle)            
        }

        notiCircle.innerText = savedArticles.length
    }
}
