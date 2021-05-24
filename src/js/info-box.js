
function addInfoBox(status, name) {
    const div = document.createElement('div')
    div.classList.add('info-popup', `info-popup_${status}-background`)
    div.innerHTML = `<p class="info-popup__message">${name} has been ${status}</p>`
    document.querySelector('.wrapper').append(div)

    setTimeout(() => {
        document.querySelector('.info-popup').remove()    
    }, 4050)
}

function addMessageBox(message) {
    const div = document.createElement('div')
    div.classList.add('message-popup', 'fade-in')
    div.innerHTML = `<p>${message}</p>`
    document.querySelector('.wrapper').append(div)   
}
function removeMessageBox() {
    const messageBox = document.querySelector('.message-popup')
    messageBox.classList.add('fade-out')
    setTimeout(() => {
        document.querySelector('.message-popup').remove()    
    }, 1000)      
}
