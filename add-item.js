// Sabit veriler
const BRANCHES = ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Yüzme'];
const CATEGORIES = ['Top', 'Forma', 'Ayakkabı', 'Ekipman', 'Aksesuar'];
const CONDITIONS = ['Yeni', 'Az Kullanılmış', 'Bakım Gerekli', 'Hasarlı'];

// Form elementlerini seç
const form = document.getElementById('itemForm');
const nameInput = document.getElementById('itemName');
const branchSelect = document.getElementById('itemBranch');
const categorySelect = document.getElementById('itemCategory');
const conditionSelect = document.getElementById('itemCondition');
const quantityInput = document.getElementById('itemQuantity');
const notesInput = document.getElementById('itemNotes');
const submitButton = document.getElementById('submitButton');

// Select elementlerini doldur
function populateSelect(selectElement, options) {
    if (!selectElement) return;
    
    selectElement.innerHTML = '<option value="">Seçiniz</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Başarı mesajını göster
function showSuccessMessage(message) {
    // Varsa eski mesajı kaldır
    const oldMessage = document.querySelector('.success-message');
    if (oldMessage) {
        oldMessage.remove();
    }

    // Yeni mesaj elementi oluştur
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <i class="material-icons">check_circle</i>
        <span>${message}</span>
    `;

    // Mesajı sayfaya ekle
    document.body.appendChild(messageDiv);

    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
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

// Form gönderme işleyicisi
function handleSubmit(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Submit butonunu devre dışı bırak
    if (submitButton) {
        submitButton.disabled = true;
    }
    
    if (!validateForm()) {
        if (submitButton) {
            submitButton.disabled = false;
        }
        return false;
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
        showSuccessMessage('Malzeme başarıyla eklendi!');

        // Formu sıfırla
        form.reset();

        // Select elementlerini tekrar doldur
        populateSelect(branchSelect, BRANCHES);
        populateSelect(categorySelect, CATEGORIES);
        populateSelect(conditionSelect, CONDITIONS);

        // Submit butonunu aktif et
        if (submitButton) {
            submitButton.disabled = false;
        }

        // 1 saniye sonra ana sayfaya yönlendir
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        console.error('Hata:', error);
        alert('Malzeme eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        
        // Submit butonunu aktif et
        if (submitButton) {
            submitButton.disabled = false;
        }
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Form elementinin varlığını kontrol et
    if (form) {
        // Select elementlerini doldur
        populateSelect(branchSelect, BRANCHES);
        populateSelect(categorySelect, CATEGORIES);
        populateSelect(conditionSelect, CONDITIONS);

        // Quantity input için varsayılan değer
        if (quantityInput) {
            quantityInput.value = 1;
        }

        // Form submit olayını dinle
        form.addEventListener('submit', handleSubmit);
    }
});
