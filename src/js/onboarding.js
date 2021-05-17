
// (function runOnboarding() {
//     enableOverlay()    
// })()

function enableOverlay() {
    const body = document.querySelector('body')
    const div = document.createElement('div')
    div.classList.add('overlay')
    body.prepend(div);
}

