
console.log('card-swipe.js loaded');

const cardContent = document.querySelector('.card-content');
// const saveBtn = cardContent.pseudo('::after');
console.log(cardContent);

if (cardContent) {

    document.addEventListener('click', e => {
        console.log(e);
        if (e.target.classList.contains("card-content_save-btn")) {
            console.log('Save button pressed');
        }  
    })

    document.addEventListener('touchstart', e => {
        // console.log(e);
        if (e.target.classList.contains("card-content__link")) {
            console.log('card content pressed');
        }        
    })




}