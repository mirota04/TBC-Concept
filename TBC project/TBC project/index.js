document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.scroll_conteiner');
    const scrollContent = document.querySelector('.scroll_content');

    scrollContainer.addEventListener('wheel', function (e) {
        e.preventDefault();
        scrollContainer.scrollTo({
            top: scrollContainer.scrollTop + e.deltaY,
            behavior:"instant"
        });
    });
});