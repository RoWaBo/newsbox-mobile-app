
function addInfoBox(status, name) {
    console.log('infobox added');
    const div = document.createElement('div')
    div.classList.add('info-popup', `info-popup_${status}-background`)

    div.innerHTML = `<p class="info-popup__message">${name} has been ${status}</p>`
    
    document.querySelector('.wrapper').append(div)

    setTimeout(() => {
        console.log('infobox removed');
        document.querySelector('.info-popup').remove()    
    }, 4050)
}
