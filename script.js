// script.js

// 1. Функція «Діалог з користувачем»
function dialogWithUser() {
    alert("Ласкаво просимо до хімчистки «Чистота»!");

    let garment;
    let attempts = 0;

    // Цикл — запитувати, поки не буде введено непорожнє значення або не перевищено 3 спроби
    while (!garment && attempts < 3) {
        garment = prompt("Яке вбрання ви бажаєте почистити сьогодні?");
        if (!garment) {
            alert("Ви нічого не ввели. Спробуйте ще раз.");
            attempts++;
        }
    }

    if (!garment) {
        alert("Спроба введення перевищена. Будь ласка, зверніться пізніше.");
        return;
    }

    const confirmed = confirm(`Ви підтверджуєте замовлення на чистку: "${garment}"?`);
    if (confirmed) {
        themedBackgroundChange(); // Зміна фону на 30 сек
        alert(`Дякуємо! Ваше "${garment}" знаходиться в черзі на обробку.`);
    } else {
        alert("Замовлення скасовано.");
    }
}
  
// 2. Функція виводу інформації про розробника
function showDeveloperInfo(lastName, firstName, position = "JS-розробник") {
    alert(`Розробник сторінки:\n${lastName} ${firstName}\nПосада: ${position}`);
}

// 3. Функція порівняння двох рядків
function compareStrings() {
    const a = prompt("Введіть перший тип тканини для порівняння:");
    const b = prompt("Введіть другий тип тканини для порівняння:");
    if (a === null || b === null) {
        alert("Порівняння скасовано.");
        return;
    }
    const greater = (a > b) ? a : (b > a) ? b : null;
    if (greater) {
        alert(`За лексикографією більший рядок: "${greater}"`);
    } else {
        alert("Рядки однакові.");
    }
}

// 4. Зміна фону сторінки на 30 секунд
function themedBackgroundChange() {
    const body = document.body;
    const originalBG = body.style.background;

    body.style.background = 'url("images/clean-laundry.jpg") center/cover no-repeat';

    setTimeout(() => {
        body.style.background = originalBG;
    }, 30000);
}

// 5. Перенаправлення на карту
function goToMap() {
    if (confirm("Відкрити нашу хімчистку на Google Картах?")) {
        location.href = "https://www.google.com/maps?q=50.4488974,30.456977";
    }
}

// 6. Використання DOM методів
function fullDomManipulation() {
    // 1. getElementById + innerHTML
    const adv = document.getElementById("our-advantages");
    if (adv) {
        adv.innerHTML += '<p style="text-align: center;">Ми постійно оновлюємо наші послуги!</p>';
    }

    // 2. querySelectorAll + outerHTML
    const navLinks = document.querySelectorAll(".nav-link");
    if (navLinks.length > 0) {
        navLinks[0].outerHTML = '<a href="index.html" class="nav-link">🏠 Головна (оновлено)</a>';
    }

    // 3. textContent
    const contactInfo = document.getElementById("contact-info");
    if (contactInfo) {
        contactInfo.textContent += " Ми завжди поруч із вами!";
    }

    // 4. createElement + createTextNode
    const newLi = document.createElement("li");
    const textNode = document.createTextNode("Антибактеріальна обробка тканин");
    console.log(textNode.data);
    newLi.appendChild(textNode);
    const ul = document.querySelector("ul");
    if (ul) {
        ul.appendChild(newLi);
    }

    // 5. prepend
    const firstLi = document.createElement("li");
    firstLi.textContent = "Ми працюємо для вас понад 10 років!";
    ul?.prepend(firstLi);

    // 6. after
    const paragraphs = document.querySelectorAll("div > p");
    paragraphs.forEach(p => {
        if (p.textContent.includes("індивідуальний підхід")) {
            const note = document.createElement("p");
            note.textContent = "Нові послуги доступні щодня!";
            p.after(note);
        }
    });

    // 7. replaceWith
    const buttonToReplace = document.querySelector("button.nav-link");
    if (buttonToReplace) {
        const newBtn = document.createElement("button");
        newBtn.className = "nav-link";
        newBtn.textContent = "🧼 Оновлена кнопка замовлення чистки";
        newBtn.onclick = dialogWithUser;
        buttonToReplace.replaceWith(newBtn);
    }

    // 8. remove
    const oldLinks = document.querySelector(".links-for-pictures");
    if (oldLinks) oldLinks.remove();

    // 9. document.write
    if (location.pathname.endsWith("index.html")) {
        const promoBanner = document.createElement("p");
        promoBanner.innerHTML = "✨ Сьогодні діє знижка 10% на чистку костюмів!";
        promoBanner.style.textAlign = "center";
        document.body.prepend(promoBanner);
    }
}


// Виклик функцій
window.addEventListener("DOMContentLoaded", () => {
    // 1. Замовлення чистки
    const orderBtn = document.createElement("button");
    orderBtn.textContent = "Замовлення чистки";
    orderBtn.onclick = dialogWithUser;
    orderBtn.className = "nav-link";
    const firstPara = document.querySelector("div > p");
    if (firstPara) {
      firstPara.parentNode.insertBefore(orderBtn, firstPara);
    }
  
    // 2. Про розробника
    if (location.pathname.endsWith("contacts.html")) {
      const devBtn = document.createElement("button");
      devBtn.textContent = "Про розробника";
      devBtn.onclick = () => showDeveloperInfo("Драга","Тарас");
      devBtn.className = "nav-link";
      const geoHeading = document.querySelector('#frame') ||
        Array.from(document.querySelectorAll("h3"))
             .find(h => h.textContent.trim().startsWith("Наша геолокація"));
      if (geoHeading) {
        geoHeading.parentNode.insertBefore(devBtn, geoHeading);
      }
    }
  
    // 3. Порівняти тканини
    if (location.pathname.endsWith("services.html")) {
      const compBtn = document.createElement("button");
      compBtn.textContent = "Порівняти тканини";
      compBtn.onclick = compareStrings;
      compBtn.className = "nav-link";
      const servHeading = document.getElementById("services-list");
      if (servHeading) {
        servHeading.parentNode.insertBefore(compBtn, servHeading);
      }
    }
  
    // 4. Перейти до Google maps
    if (location.pathname.endsWith("contacts.html")) {
        const mapBtn = document.createElement("button");
        mapBtn.textContent = "Перейти до Google maps";
        mapBtn.onclick = goToMap;
        mapBtn.className = "nav-link";
    
        const mapIframe = document.querySelector('iframe[title="Карта хімчистки"]');
        if (mapIframe) {
            const wrapper = document.createElement("div");
            wrapper.style.textAlign = "center";
            wrapper.appendChild(mapBtn);
            mapIframe.parentNode.insertBefore(wrapper, mapIframe.nextSibling);
        }
    }    
  
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Оновити сторінку";
    updateBtn.className = "nav-link";
    updateBtn.onclick = fullDomManipulation;
    document.body.append(updateBtn);
  });