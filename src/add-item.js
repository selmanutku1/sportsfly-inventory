document.addEventListener('DOMContentLoaded', function() {
    setupCategoryNavigation();
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

// Form gönderme işlemi
function handleAddItem(event) {
    event.preventDefault();

    const newItem = {
        code: document.getElementById('itemCode').value,
        name: document.getElementById('itemName').value,
        category: document.getElementById('category').value,
        currentQuantity: parseInt(document.getElementById('currentQuantity').value),
        minStock: parseInt(document.getElementById('minStock').value),
        branch: document.getElementById('branch').value,
        manager: document.getElementById('manager').value,
        supplier: document.getElementById('supplier').value,
        purchaseDate: document.getElementById('purchaseDate').value,
        warranty: document.getElementById('warranty').value,
        condition: document.getElementById('condition').value,
        usageFrequency: document.getElementById('usageFrequency').value,
        lastUsed: new Date().toISOString().split('T')[0],
        lastMaintenance: new Date().toISOString().split('T')[0],
        notes: document.getElementById('notes').value
    };

    // Malzeme kodunun benzersiz olduğunu kontrol et
    if (inventoryItems.some(item => item.code === newItem.code)) {
        alert('Bu malzeme kodu zaten kullanılıyor. Lütfen başka bir kod girin.');
        return;
    }

    // Yeni malzemeyi listeye ekle
    inventoryItems.push(newItem);
    
    // Başarı mesajı göster
    alert('Yeni malzeme başarıyla eklendi!');
    
    // Ana sayfaya yönlendir
    window.location.href = 'index.html';
}

// Form doğrulama
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}
