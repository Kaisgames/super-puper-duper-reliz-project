// Плавна прокрутка до секцій
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Дані про автомобілі
const carDetails = {
    'Mazda 2': {
        engine: '1.5 л SKYACTIV-G',
        power: '90 к.с.',
        fuel: '5.1 л/100 км',
        acceleration: '9.8 с',
        features: [
            'Система G-Vectoring Control Plus',
            'Система Start/Stop i-stop',
            'Система допомоги при старті в гору (HLA)',
            'Система контролю тиску в шинах',
            'Подушки безпеки',
            'Кондиціонер',
            'Мультимедійна система з 7" екраном',
            'Apple CarPlay та Android Auto'
        ]
    },
    'Mazda 3': {
        engine: '2.0 л SKYACTIV-G',
        power: '150 к.с.',
        fuel: '5.8 л/100 км',
        acceleration: '8.2 с',
        features: [
            'Система G-Vectoring Control Plus',
            'Адаптивний круїз-контроль',
            'Система моніторингу сліпих зон',
            'Система допомоги при старті в гору',
            'Преміум аудіосистема Bose',
            'Двозонний клімат-контроль',
            'Проекційний дисплей',
            'Камера заднього виду'
        ]
    },
    'Mazda 6': {
        engine: '2.5 л SKYACTIV-G',
        power: '194 к.с.',
        fuel: '6.2 л/100 км',
        acceleration: '7.8 с',
        features: [
            'Система G-Vectoring Control Plus',
            'Адаптивні світлодіодні фари',
            'Вентиляція передніх сидінь',
            'Преміум аудіосистема Bose',
            'Система кругового огляду 360°',
            'Система контролю сліпих зон',
            'Електропривід багажника',
            'Навігаційна система'
        ]
    },
    'Mazda CX-30': {
        engine: '2.0 л SKYACTIV-X',
        power: '180 к.с.',
        fuel: '5.6 л/100 км',
        acceleration: '8.5 с',
        features: [
            'Система M Hybrid',
            'Адаптивний круїз-контроль',
            'Система i-ACTIVSENSE',
            'Преміум аудіосистема Bose',
            'Двозонний клімат-контроль',
            'Проекційний дисплей',
            'Система контролю сліпих зон',
            'Apple CarPlay та Android Auto'
        ]
    },
    'Mazda CX-5': {
        engine: '2.5 л SKYACTIV-G',
        power: '194 к.с.',
        fuel: '6.9 л/100 км',
        acceleration: '8.9 с',
        features: [
            'Система i-ACTIV AWD',
            'Адаптивні світлодіодні фари',
            'Система G-Vectoring Control Plus',
            'Преміум аудіосистема Bose',
            'Вентиляція передніх сидінь',
            'Система кругового огляду 360°',
            'Електропривід багажника',
            'Навігаційна система'
        ]
    },
    'Mazda CX-9': {
        engine: '2.5 л SKYACTIV-G Turbo',
        power: '231 к.с.',
        fuel: '8.4 л/100 км',
        acceleration: '8.2 с',
        features: [
            'Система i-ACTIV AWD',
            'Адаптивні світлодіодні фари',
            'Система G-Vectoring Control Plus',
            'Преміум аудіосистема Bose',
            'Вентиляція передніх сидінь',
            'Система кругового огляду 360°',
            'Електропривід багажника',
            'Система контролю сліпих зон'
        ]
    },
    'Mazda CX-60': {
        engine: '2.5 л PHEV SKYACTIV-G',
        power: '327 к.с.',
        fuel: '2.1 л/100 км',
        acceleration: '5.8 с',
        features: [
            'Гібридна силова установка PHEV',
            'Система i-ACTIV AWD',
            'Адаптивні світлодіодні фари',
            'Преміум аудіосистема Bose',
            'Вентиляція передніх сидінь',
            'Система кругового огляду 360°',
            'Електропривід багажника',
            'Навігаційна система'
        ]
    },
    'Mazda MX-5': {
        engine: '2.0 л SKYACTIV-G',
        power: '184 к.с.',
        fuel: '6.3 л/100 км',
        acceleration: '6.5 с',
        features: [
            'Система G-Vectoring Control Plus',
            'Механічний диференціал підвищеного тертя',
            'Спортивна підвіска Bilstein',
            'Преміум аудіосистема Bose',
            'Шкіряна оббивка Nappa',
            'Підігрів сидінь',
            'Apple CarPlay та Android Auto',
            'Система контролю сліпих зон'
        ]
    }
};

// Функція відкриття модального вікна замовлення
function openOrderModal(model, price, image) {
    const modal = document.getElementById('orderModal');
    const carModel = document.getElementById('carModel');
    const carPrice = document.getElementById('carPrice');
    const carImage = document.getElementById('carImage');

    carModel.textContent = model;
    carPrice.textContent = price;
    carImage.src = image;

    modal.style.display = 'block';
}

// Зберігання замовлень в localStorage
function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orderData.id = Date.now(); // Унікальний ID для замовлення
    orderData.date = new Date().toLocaleDateString();
    orderData.status = 'pending';
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Відкриття вікна "Мої замовлення"
function openMyOrders() {
    const modal = document.getElementById('myOrdersModal');
    const ordersList = document.getElementById('ordersList');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="no-orders">У вас поки немає замовлень</div>';
    } else {
        ordersList.innerHTML = orders.map(order => `
            <div class="order-item">
                <img src="${order.image}" alt="${order.model}">
                <div class="order-info">
                    <h3>${order.model}</h3>
                    <p>Ціна: ${order.price}</p>
                    <p>Колір: ${order.color}</p>
                    <p class="order-date">Дата замовлення: ${order.date}</p>
                </div>
                <span class="order-status status-${order.status}">
                    ${getStatusText(order.status)}
                </span>
            </div>
        `).join('');
    }

    modal.style.display = 'block';
}

// Функція для отримання тексту статусу
function getStatusText(status) {
    const statusTexts = {
        'pending': 'В обробці',
        'confirmed': 'Підтверджено',
        'completed': 'Виконано'
    };
    return statusTexts[status] || status;
}

// Закриття модальних вікон
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Закриття при кліку поза модальним вікном
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Обробка форми замовлення
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const orderData = {
        model: document.getElementById('carModel').textContent,
        price: document.getElementById('carPrice').textContent,
        image: document.getElementById('carImage').src,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        color: document.getElementById('color').value,
        options: Array.from(document.querySelectorAll('input[name="options"]:checked'))
            .map(option => option.parentElement.textContent.trim())
    };

    saveOrder(orderData);

    alert('Дякуємо за замовлення! Ви можете переглянути його у розділі "Мої замовлення"');
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
});

// Функція відкриття модального вікна з деталями
function openDetailsModal(model, price, image) {
    const modal = document.getElementById('detailsModal');
    const details = carDetails[model];

    document.getElementById('detailsImage').src = image;
    document.getElementById('detailsModel').textContent = model;
    document.getElementById('detailsPrice').textContent = price;
    document.getElementById('detailsEngine').textContent = details.engine;
    document.getElementById('detailsPower').textContent = details.power;
    document.getElementById('detailsFuel').textContent = details.fuel;
    document.getElementById('detailsAcceleration').textContent = details.acceleration;

    const featuresList = document.getElementById('detailsFeatures');
    featuresList.innerHTML = details.features
        .map(feature => `<li>${feature}</li>`)
        .join('');

    modal.style.display = 'block';

    // Додаємо обробник для кнопки замовлення
    document.getElementById('detailsOrderButton').onclick = () => {
        modal.style.display = 'none';
        openOrderModal(model, price, image);
    };
}

// Оновлюємо обробники для кнопок "Детальніше"
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.model-card');
        const model = card.querySelector('h3').textContent;
        const price = card.querySelector('p').textContent.replace('Від ', '');
        const image = card.querySelector('img').src;
        openDetailsModal(model, price, image);
    });
}); 