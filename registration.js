document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const captchaCanvas = document.getElementById('captchaCanvas');
    const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
    const captchaInput = document.getElementById('captcha');
    let captchaCode = '';

    // Функция генерации CAPTCHA
    function generateCaptcha() {
        const ctx = captchaCanvas.getContext('2d');
        ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
        ctx.font = '24px Arial';
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'middle';

        // Генерация случайного кода из 5 символов
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        captchaCode = '';
        for (let i = 0; i < 5; i++) {
            captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Добавление случайного смещения для каждого символа
        for (let i = 0; i < captchaCode.length; i++) {
            const x = 10 + i * 18;
            const y = 20 + Math.random() * 10;
            const angle = Math.random() * 0.4 - 0.2; // Небольшой угол поворота
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillText(captchaCode[i], 0, 0);
            ctx.restore();
        }

        // Добавление шумов
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = getRandomColor();
            ctx.beginPath();
            ctx.arc(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height, 1.5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Функция для получения случайного цвета
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Генерация CAPTCHA при загрузке страницы
    generateCaptcha();

    // Обработчик обновления CAPTCHA
    refreshCaptchaBtn.addEventListener('click', generateCaptcha);

    // Функция для отображения ошибок
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error')) {
            error = document.createElement('div');
            error.classList.add('error');
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
    }

    // Функция для очистки ошибок
    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains('error')) {
            error.textContent = '';
        }
    }

    // Валидация формы при отправке
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем отправку формы

        let valid = true;

        // Очистка предыдущих ошибок
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => clearError(input));

        // Проверка имени пользователя
        const username = document.getElementById('username');
        if (username.value.trim().length < 3) {
            showError(username, 'Имя пользователя должно содержать не менее 3 символов.');
            valid = false;
        }

        // Проверка email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, 'Пожалуйста, введите корректный email.');
            valid = false;
        }

        // Проверка пароля
        const password = document.getElementById('password');
        if (password.value.length < 6) {
            showError(password, 'Пароль должен содержать не менее 6 символов.');
            valid = false;
        }

        // Проверка подтверждения пароля
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Пароли не совпадают.');
            valid = false;
        }

        // Проверка CAPTCHA
        if (captchaInput.value.trim() !== captchaCode) {
            showError(captchaInput, 'Неправильный код CAPTCHA.');
            generateCaptcha(); // Обновляем CAPTCHA при ошибке
            valid = false;
        }

        if (valid) {
            // Здесь вы можете отправить данные на сервер
            alert('Регистрация успешна! С Вами на почте свяжется наш менеджер!');
            form.reset();
            generateCaptcha();
        }
    });
});
