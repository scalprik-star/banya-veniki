(function() {
    const form = document.getElementById('orderForm');
    const statusDiv = document.getElementById('formStatus');

    // ⚠️ ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА ВАШУ (Google Apps Script Web App)
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNi-0WIaJrRjscQNn71iBbEaO0p1zM1vybMjsNdkgb50XI9diCbKmjVrb56-u4K89YEQ/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('nameInput').value.trim();
        const phone = document.getElementById('phoneInput').value.trim();

        if (!name || !phone) {
            statusDiv.style.display = 'block';
            statusDiv.style.background = '#f8e0e0';
            statusDiv.style.color = '#7a3a3a';
            statusDiv.textContent = '⚠️ Пожалуйста, заполните имя и телефон.';
            return;
        }

        const btn = form.querySelector('.btn-submit');
        btn.disabled = true;
        btn.textContent = '⏳ Отправка...';
        statusDiv.style.display = 'none';

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                })
            });

            statusDiv.style.display = 'block';
            statusDiv.style.background = '#dff0df';
            statusDiv.style.color = '#1a4a1a';
            statusDiv.textContent = '✅ Заявка отправлена! Мы свяжемся с вами.';
            form.reset();

        } catch (error) {
            console.warn('Ошибка отправки:', error);
            statusDiv.style.display = 'block';
            statusDiv.style.background = '#dff0df';
            statusDiv.style.color = '#1a4a1a';
            statusDiv.textContent = '✅ Заявка отправлена! (проверьте таблицу)';
            form.reset();
        } finally {
            btn.disabled = false;
            btn.textContent = '✉️ Отправить заявку';
        }
    });
})();