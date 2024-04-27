document.addEventListener("DOMContentLoaded", () => {
    const text = document.querySelector('.text');
    text.classList.add("active");
});

const OCIcon = document.querySelector('.open-close-icon');
const OCIconImage = document.getElementById('icon');

OCIcon.addEventListener('click', () => {
    if (OCIconImage.classList.contains('open')) {
        OCIconImage.src = 'menu.png';
        OCIconImage.classList.remove('open');
    } else {
        OCIconImage.src = 'close.png';
        OCIconImage.classList.add('open');
    }
});
