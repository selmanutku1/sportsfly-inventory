// Sabit veriler
const BRANCHES = ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Yüzme'];
const CATEGORIES = ['Top', 'Forma', 'Ayakkabı', 'Ekipman', 'Aksesuar'];
const CONDITIONS = ['Yeni', 'Az Kullanılmış', 'Bakım Gerekli', 'Hasarlı'];

// Form elementlerini seç
const form = document.getElementById('addItemForm');
const nameInput = document.getElementById('name');
const branchSelect = document.getElementById('branch');
const categorySelect = document.getElementById('category');
const conditionSelect = document.getElementById('condition');
const quantityInput = document.getElementById('quantity');
const notesInput = document.getElementById('notes');

// Select elementlerini doldur
function populateSelect(selectElement, options) {
    selectElement.innerHTML = '<option value="">Seçiniz</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Benzersiz ID oluştur
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Form verilerini hazırla
function getFormData() {
    return {
        id: generateUniqueId(),
        name: nameInput.value.trim(),
        branch: branchSelect.value,
        category: categorySelect.value,
        condition: conditionSelect.value,
        quantity: parseInt(quantityInput.value),
        notes: notesInput.value.trim(),
        createdAt: new Date().toISOString()
    };
}

// Formu doğrula
function validateForm() {
    if (!nameInput.value.trim()) {
        alert('Lütfen malzeme adını girin.');
        nameInput.focus();
        return false;
    }
    if (!branchSelect.value) {
        alert('Lütfen bir branş seçin.');
        branchSelect.focus();
        return false;
    }
    if (!categorySelect.value) {
        alert('Lütfen bir kategori seçin.');
        categorySelect.focus();
        return false;
    }
    if (!conditionSelect.value) {
        alert('Lütfen malzemenin durumunu seçin.');
        conditionSelect.focus();
        return false;
    }
    if (!quantityInput.value || parseInt(quantityInput.value) < 1) {
        alert('Lütfen geçerli bir adet girin.');
        quantityInput.focus();
        return false;
    }
    return true;
}

// Form submit olayını dinle
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            // Form verilerini al
            const itemData = getFormData();

            // Mevcut envanter verilerini al
            let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

            // Yeni ürünü ekle
            inventory.push(itemData);

            // Güncellenmiş envanteri kaydet
            localStorage.setItem('inventory', JSON.stringify(inventory));

            // Başarı mesajı göster
            alert('Malzeme başarıyla eklendi!');

            // Formu sıfırla
            form.reset();

            // Ana sayfaya yönlendir
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Hata:', error);
            alert('Malzeme eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Form elementinin varlığını kontrol et
    if (form) {
        // Select elementlerini doldur
        populateSelect(branchSelect, BRANCHES);
        populateSelect(categorySelect, CATEGORIES);
        populateSelect(conditionSelect, CONDITIONS);

        // Quantity input için minimum değer ayarla
        quantityInput.min = 1;
        quantityInput.value = 1;
    }
});
