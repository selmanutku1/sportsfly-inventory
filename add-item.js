// Örnek branş ve kategori verileri
const branches = ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Yüzme'];
const categories = ['Top', 'Forma', 'Ayakkabı', 'Ekipman', 'Aksesuar'];
const conditions = ['Yeni', 'Az Kullanılmış', 'Bakım Gerekli', 'Hasarlı'];

// Form elementlerini doldur
function initializeForm() {
    const branchSelect = document.getElementById('branch');
    const categorySelect = document.getElementById('category');
    const conditionSelect = document.getElementById('condition');

    // Branşları ekle
    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.textContent = branch;
        branchSelect.appendChild(option);
    });

    // Kategorileri ekle
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Durumları ekle
    conditions.forEach(condition => {
        const option = document.createElement('option');
        option.value = condition;
        option.textContent = condition;
        conditionSelect.appendChild(option);
    });
}

// Form verilerini localStorage'a kaydetme
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// localStorage'dan veri getirme
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Benzersiz ID oluşturma
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Form verilerini hazırlama
function prepareFormData() {
    return {
        id: generateUniqueId(),
        name: document.getElementById('name').value,
        branch: document.getElementById('branch').value,
        category: document.getElementById('category').value,
        condition: document.getElementById('condition').value,
        quantity: parseInt(document.getElementById('quantity').value),
        notes: document.getElementById('notes').value,
        createdAt: new Date().toISOString()
    };
}

// Form gönderildiğinde
document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Form verilerini al
    const itemData = prepareFormData();

    // Mevcut envanter verilerini al
    let inventory = getFromLocalStorage('inventory') || [];

    // Yeni ürünü ekle
    inventory.push(itemData);

    // Güncellenmiş envanteri kaydet
    saveToLocalStorage('inventory', inventory);

    // Başarı mesajı göster
    alert('Malzeme başarıyla eklendi!');

    // Formu sıfırla
    this.reset();

    // Ana sayfaya yönlendir
    window.location.href = 'index.html';
});

// Form seçeneklerini doldurma
function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// Sayfa yüklendiğinde form seçeneklerini doldur
document.addEventListener('DOMContentLoaded', function() {
    populateSelect('branch', branches);
    populateSelect('category', categories);
    populateSelect('condition', conditions);
});

// Kategori navigasyonu
function setupCategoryNavigation() {
    const categories = document.querySelectorAll('.categories li');
    const sections = document.querySelectorAll('.form-section');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Aktif kategoriyi güncelle
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');

            // İlgili form bölümünü göster
            const sectionId = category.dataset.section;
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupCategoryNavigation();
});
