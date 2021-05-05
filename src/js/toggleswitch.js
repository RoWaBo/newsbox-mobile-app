document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('#toggle');

    if (toggle) {
        toggle.addEventListener('click', () => {
            console.log('toggleSlider is: '+toggle.checked);
            localStorage.setItem("toggleSwitch", toggle.checked);
        })
    }
});