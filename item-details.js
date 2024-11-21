document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
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

    // Detayları doldur
    document.getElementById('itemName').textContent = item.name;
    document.getElementById('itemCode').textContent = item.code;
    document.getElementById('category').textContent = item.category;
    document.getElementById('currentQuantity').textContent = item.currentQuantity;
    document.getElementById('minStock').textContent = item.minStock;
    document.getElementById('branch').textContent = item.branch;
    document.getElementById('manager').textContent = item.manager;
    document.getElementById('supplier').textContent = item.supplier;
    document.getElementById('purchaseDate').textContent = formatDate(item.purchaseDate);
    document.getElementById('warranty').textContent = item.warranty;
    document.getElementById('condition').textContent = item.condition;
    document.getElementById('usageFrequency').textContent = item.usageFrequency;
    document.getElementById('lastUsed').textContent = formatDate(item.lastUsed);
    document.getElementById('lastMaintenance').textContent = formatDate(item.lastMaintenance);
    document.getElementById('notes').value = item.notes;

    // Stok durumuna göre renklendirme
    const quantityElement = document.getElementById('currentQuantity');
    if (item.currentQuantity <= item.minStock) {
        quantityElement.classList.add('stock-critical');
    } else if (item.currentQuantity <= item.minStock * 1.5) {
        quantityElement.classList.add('stock-warning');
    } else {
        quantityElement.classList.add('stock-good');
    }
}

// Tarihi formatla
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

// Düzenleme sayfasına yönlendir
function editItem() {
    const itemCode = getItemCodeFromUrl();
    window.location.href = `edit-item.html?code=${itemCode}`;
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
