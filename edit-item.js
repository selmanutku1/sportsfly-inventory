document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupCategoryNavigation();
    loadItemDetails();
});

// Mobil menü için
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });
}

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

// URL'den malzeme kodunu al
function getItemCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
}

// Malzeme detaylarını yükle
function loadItemDetails() {
    const itemCode = getItemCodeFromUrl();
    if (!itemCode) {
        alert('Malzeme kodu bulunamadı!');
        window.location.href = 'index.html';
        return;
    }

    // Malzemeyi bul (normalde API'den gelecek)
    const item = inventoryItems.find(item => item.code === itemCode);
    if (!item) {
        alert('Malzeme bulunamadı!');
        window.location.href = 'index.html';
        return;
    }

    // Form alanlarını doldur
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCode').value = item.code;
    document.getElementById('category').value = item.category;
    document.getElementById('currentQuantity').value = item.currentQuantity;
    document.getElementById('minStock').value = item.minStock;
    document.getElementById('branch').value = item.branch;
    document.getElementById('manager').value = item.manager;
    document.getElementById('supplier').value = item.supplier;
    document.getElementById('purchaseDate').value = item.purchaseDate;
    document.getElementById('warranty').value = item.warranty;
    document.getElementById('condition').value = item.condition;
    document.getElementById('usageFrequency').value = item.usageFrequency;
    document.getElementById('notes').value = item.notes;
}

// Form gönderme işlemi
function handleEditItem(event) {
    event.preventDefault();

    const itemCode = getItemCodeFromUrl();
    const updatedItem = {
        code: itemCode,
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

    // Malzemeyi güncelle (normalde API'ye gönderilecek)
    const index = inventoryItems.findIndex(item => item.code === itemCode);
    if (index !== -1) {
        inventoryItems[index] = updatedItem;
        alert('Malzeme başarıyla güncellendi!');
        window.location.href = 'index.html';
    } else {
        alert('Malzeme güncellenirken bir hata oluştu!');
    }
}

// Örnek veri (normalde API'den gelecek)
const inventoryItems = [
    {
        code: "FB001",
        name: "Futbol Topu",
        category: "Futbol",
        currentQuantity: 15,
        minStock: 5,
        branch: "Ankara Şube",
        manager: "Ahmet Yılmaz",
        supplier: "Sports Co.",
        purchaseDate: "2023-01-15",
        warranty: "1 yıl",
        condition: "Yeni",
        usageFrequency: "Yoğun",
        lastUsed: "2023-05-20",
        lastMaintenance: "2023-04-15",
        notes: "Profesyonel maçlar için kullanılan FIFA onaylı toplar"
    }
];
