// Örnek envanter verileri
let inventoryItems = [
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
    },
    {
        code: "BB001",
        name: "Basketbol Topu",
        category: "Basketbol",
        currentQuantity: 3,
        minStock: 8,
        branch: "İstanbul Şube",
        manager: "Mehmet Demir",
        supplier: "BasketCo",
        purchaseDate: "2023-02-20",
        warranty: "2 yıl",
        condition: "Az Kullanılmış",
        usageFrequency: "Orta",
        lastUsed: "2023-05-18",
        lastMaintenance: "2023-03-10",
        notes: "NBA standartlarında profesyonel toplar"
    },
    {
        code: "VB001",
        name: "Voleybol Topu",
        category: "Voleybol",
        currentQuantity: 10,
        minStock: 6,
        branch: "İzmir Şube",
        manager: "Ayşe Yıldız",
        supplier: "VolleyCo",
        purchaseDate: "2023-03-15",
        warranty: "1 yıl",
        condition: "Bakım Gereken",
        usageFrequency: "Az",
        lastUsed: "2023-05-15",
        lastMaintenance: "2023-02-20",
        notes: "Antrenman topları"
    },
    {
        code: "TN001",
        name: "Tenis Raketi",
        category: "Tenis",
        currentQuantity: 2,
        minStock: 5,
        branch: "Ankara Şube",
        manager: "Ahmet Yılmaz",
        supplier: "TennisPro",
        purchaseDate: "2023-04-10",
        warranty: "2 yıl",
        condition: "Hasarlı",
        usageFrequency: "Yoğun",
        lastUsed: "2023-05-22",
        lastMaintenance: "2023-05-01",
        notes: "Profesyonel tenis raketleri"
    },
    {
        code: 'BT001',
        name: 'Basketbol Topu',
        category: 'Basketbol',
        currentQuantity: 15,
        minStock: 10,
        branch: 'Kadıköy Şubesi',
        condition: 'Yeni',
        supplier: 'Sports Co.',
        purchaseDate: '2023-01-15',
        warranty: '2 yıl',
        usageFrequency: 'Yoğun',
        lastUsed: '2024-01-20',
        lastMaintenance: '2024-01-01',
        manager: 'Ahmet Yılmaz',
        notes: 'Düzenli bakım yapılıyor.'
    },
    // Daha fazla örnek veri eklenebilir
];

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    loadInventoryData();
    populateBranchFilter();
});

// Mobil menü için
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });
}

// Şube filtresini doldur
function populateBranchFilter() {
    const branches = [...new Set(inventoryItems.map(item => item.branch))];
    const branchFilter = document.getElementById('branchFilter');
    
    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.textContent = branch;
        branchFilter.appendChild(option);
    });
}

// Durum rengini belirle
function getConditionClass(condition) {
    switch(condition) {
        case 'Yeni':
            return 'condition-new';
        case 'Az Kullanılmış':
            return 'condition-used';
        case 'Bakım Gereken':
            return 'condition-maintenance';
        case 'Hasarlı':
            return 'condition-damaged';
        default:
            return '';
    }
}

// Envanter verilerini yükle
function loadInventoryData() {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    const filteredItems = filterInventoryItems();

    filteredItems.forEach(item => {
        const row = document.createElement('tr');
        
        // Stok durumuna göre satır rengi
        const stockStatus = getStockStatus(item);
        row.classList.add(stockStatus);

        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.currentQuantity}</td>
            <td>${item.minStock}</td>
            <td>${item.branch}</td>
            <td><span class="condition-badge ${getConditionClass(item.condition)}">${item.condition}</span></td>
            <td>
                <button onclick="editItem('${item.code}')" class="btn btn-primary btn-sm">
                    <i class="material-icons">edit</i>
                    Düzenle
                </button>
                <button onclick="deleteItem('${item.code}')" class="btn btn-danger btn-sm">
                    <i class="material-icons">delete</i>
                    Sil
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Stok durumunu belirle
function getStockStatus(item) {
    const ratio = item.currentQuantity / item.minStock;
    
    if (ratio <= 0.5) return 'critical-stock';
    if (ratio <= 1) return 'low-stock';
    if (ratio <= 2) return 'normal-stock';
    return 'high-stock';
}

// Filtreleme işlemi
function filterInventoryItems() {
    const branch = document.getElementById('branchFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const condition = document.getElementById('conditionFilter').value;
    const stockLevel = document.getElementById('stockFilter').value;

    return inventoryItems.filter(item => {
        // Şube filtresi
        if (branch && item.branch !== branch) return false;
        
        // Kategori filtresi
        if (category && item.category !== category) return false;
        
        // Durum filtresi
        if (condition && item.condition !== condition) return false;
        
        // Stok seviyesi filtresi
        if (stockLevel) {
            const status = getStockStatus(item);
            switch(stockLevel) {
                case 'critical':
                    if (status !== 'critical-stock') return false;
                    break;
                case 'low':
                    if (status !== 'low-stock') return false;
                    break;
                case 'normal':
                    if (status !== 'normal-stock') return false;
                    break;
                case 'high':
                    if (status !== 'high-stock') return false;
                    break;
            }
        }
        
        return true;
    });
}

// Filtreleri sıfırla
function resetFilters() {
    document.getElementById('branchFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('conditionFilter').value = '';
    document.getElementById('stockFilter').value = '';
    filterItems();
}

// Filtreleme butonuna tıklandığında
function filterItems() {
    loadInventoryData();
}

// Düzenleme sayfasına yönlendir
function editItem(code) {
    window.location.href = `edit-item.html?code=${code}`;
}

// Malzeme silme işlemi
function deleteItem(code) {
    if (confirm('Bu malzemeyi silmek istediğinizden emin misiniz?')) {
        const index = inventoryItems.findIndex(item => item.code === code);
        if (index !== -1) {
            inventoryItems.splice(index, 1);
            loadInventoryData();
        }
    }
}

// Malzeme detaylarını göster
function showItemDetails(itemCode) {
    const item = inventoryItems.find(i => i.code === itemCode);
    if (!item) return;

    // Modal içeriğini doldur
    document.getElementById('modalItemName').textContent = item.name;
    document.getElementById('modalItemCode').textContent = item.code;
    document.getElementById('modalCategory').textContent = item.category;
    document.getElementById('modalQuantity').textContent = item.currentQuantity;
    document.getElementById('modalMinStock').textContent = item.minStock;
    document.getElementById('modalBranch').textContent = item.branch;
    document.getElementById('modalManager').textContent = item.manager;
    document.getElementById('modalSupplier').textContent = item.supplier;
    document.getElementById('modalPurchaseDate').textContent = item.purchaseDate;
    document.getElementById('modalWarranty').textContent = item.warranty;
    document.getElementById('modalCondition').textContent = item.condition;
    document.getElementById('modalUsageFrequency').textContent = item.usageFrequency;
    document.getElementById('modalLastUsed').textContent = item.lastUsed;
    document.getElementById('modalLastMaintenance').textContent = item.lastMaintenance;
    document.getElementById('modalNotes').value = item.notes;

    // Modalı göster
    document.getElementById('itemModal').style.display = 'block';
}

// Modal kapatma işlemleri
function setupModalClose() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Çarpı butonuna tıklama
    closeButtons.forEach(button => {
        button.onclick = function() {
            button.closest('.modal').style.display = 'none';
        }
    });

    // Modal dışına tıklama
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
}
