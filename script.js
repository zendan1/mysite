document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});
document.getElementById('start-now-button').addEventListener('click', function() {
    document.getElementById('buttons-section').scrollIntoView({
        behavior: 'smooth' // плавная прокрутка
    });
});
