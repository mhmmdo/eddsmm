// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Package Data
const packages = {
    instagram: [
        { name: "1K Followers | Best High Quality", price: 12000 },
        { name: "500 Followers | Best High Quality", price: 6000 },
        { name: "1K Followers | Real Account", price: 27000 },
        { name: "500 Followers | Real Account", price: 14000 },
        { name: "1K Likes | Real Indonesia ", price: 5000 },
        { name: "5K Views Story", price: 2000 },
        { name: "Request berapa Followers, Likes, Views.", price: 1 }
    ],
    twitter: [
        { name: "1K Followers | Best Speed", price: 8000 },
        { name: "500 Followers | Best Speed", price: 4000 },
        { name: "1K Likes", price: 4000 },
        { name: "Likes 500", price: 25000 },
        { name: "5K Views Tweet / Video", price: 3000 },
        { name: "1K Retweet", price: 4000 },
        { name: "Request berapa Followers, Likes, Views, dll.", price: 5000 }
    ],
    tiktok: [
        { name: "1K Followers | Real, Always Fast", price: 21000 },
        { name: "1K Followers | Real", price: 17000 },
        { name: "Likes 1K", price: 3000 },
        { name: "Views 10K", price: 1000 },
        { name: "Request berapa Followers, Likes, Views.", price: 1 }
    ],
    youtube: [
        { name: "1K Subscribers | Instant Bot Quality", price: 7000 },
        { name: "1K Views", price: 10000 },
        { name: "1,5K Likes", price: 5000 },
        { name: "1K Views Live Streaming | 15 Menit", price: 5000 },
        { name: "Request berapa Subscribers, Likes, Views.", price: 1 }
    ],
    telegram: [
        { name: "1K Member Grup / CH | Mixed", price: 9000 },
        { name: "1K Member Grup / CH | Real", price: 15000 },
        { name: "5K Reaction Grup Channel | Mixed", price: 3000 },
        { name: "Request berapa member grup / ch, dll.", price: 40000 }
    ],
    shopee: [
        { name: "1K Followers | Indonesia", price: 9000 },
        { name: "1K Followers | Bot", price: 4000 },
        { name: "1K Shopee Favorite", price: 5000 },
        { name: "2K Views", price: 2000 },
        { name: "Request berapa Followers, Likes, Views", price: 1 }
    ]
};

// Modal Elements
const modal = document.getElementById('packageModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const whatsappBtn = document.getElementById('whatsappOrder');
const closeModal = document.querySelector('.close-modal');

// Current selected package
let currentService = '';
let selectedPackage = '';
let quantity = 1;

// Show package modal
document.querySelectorAll('.btn-service').forEach(button => {
    button.addEventListener('click', (e) => {
        currentService = e.target.getAttribute('data-service');
        const serviceName = e.target.parentElement.querySelector('h3').textContent;
        
        // Set modal title
        modalTitle.textContent = `Paket ${serviceName}`;
        
        // Generate package options
        modalBody.innerHTML = `
            <h4>Pilih Paket:</h4>
            <div class="package-options" id="packageOptions"></div>
            <div class="quantity-selector">
                <button id="decreaseQty">-</button>
                <input type="number" id="quantity" value="1" min="1">
                <button id="increaseQty">+</button>
            </div>
            <div class="total-price">Total: Rp 0</div>
        `;
        
        // Add package options
        const packageOptions = document.getElementById('packageOptions');
        packages[currentService].forEach((pkg, index) => {
            const option = document.createElement('div');
            option.className = 'package-option';
            option.innerHTML = `
                <input type="radio" name="package" id="pkg-${index}" value="${pkg.name}">
                <label for="pkg-${index}">${pkg.name} <span>Rp ${pkg.price.toLocaleString()}</span></label>
            `;
            packageOptions.appendChild(option);
        });
        
        // Show modal
        modal.style.display = 'block';
        
        // Set up event listeners for radio buttons
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', updateSelection);
        });
        
        // Quantity controls
        document.getElementById('decreaseQty').addEventListener('click', () => {
            const qtyInput = document.getElementById('quantity');
            if (qtyInput.value > 1) {
                qtyInput.value--;
                updateSelection();
            }
        });
        
        document.getElementById('increaseQty').addEventListener('click', () => {
            const qtyInput = document.getElementById('quantity');
            qtyInput.value++;
            updateSelection();
        });
        
        document.getElementById('quantity').addEventListener('change', updateSelection);
    });
});

// Update package selection
function updateSelection() {
    const selected = document.querySelector('input[name="package"]:checked');
    if (selected) {
        selectedPackage = selected.value;
        quantity = parseInt(document.getElementById('quantity').value);
        
        // Find the selected package price
        const pkg = packages[currentService].find(p => p.name === selectedPackage);
        const total = pkg.price * quantity;
        
        // Update total price
        document.querySelector('.total-price').textContent = `Total: Rp ${total.toLocaleString()}`;
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// WhatsApp order button
whatsappBtn.addEventListener('click', () => {
    if (!selectedPackage) {
        alert('Silakan pilih paket terlebih dahulu');
        return;
    }
    
    const serviceName = modalTitle.textContent.replace('Paket ', '');
    const quantity = document.getElementById('quantity').value;
    const totalElement = document.querySelector('.total-price');
    const total = totalElement.textContent.replace('Total: Rp ', '');
    
    const message = `Hai min, saya ingin pesan:\n\n*Layanan:* ${serviceName}\n*Paket:* ${selectedPackage}\n*Jumlah:* ${quantity}\n*Total:* Rp ${total}\n\nMohon info lanjut untuk pembayaran. Terima kasih.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285117024857?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    modal.style.display = 'none';
});

// Close service details when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        document.querySelectorAll('.service-details').forEach(details => {
            details.classList.remove('active');
        });
    }
});

// Update the smooth scrolling code to:
document.querySelectorAll('a[href^="#"]:not([href^="#http"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced Theme Toggle with System Preference
const themeToggle = document.querySelector('.theme-toggle');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

// Check for saved theme preference or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    lightIcon.style.opacity = '0';
    darkIcon.style.opacity = '1';
    localStorage.setItem('theme', 'dark');
}

function enableLightMode() {
    document.body.classList.remove('dark-mode');
    lightIcon.style.opacity = '1';
    darkIcon.style.opacity = '0';
    localStorage.setItem('theme', 'light');
}

// Initialize theme on load
initializeTheme();

// Toggle theme
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
});

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
});

// WhatsApp Form Submission

document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    Swal.fire({
        title: 'Konfirmasi Pengiriman',
        text: 'Anda akan diarahkan ke WhatsApp untuk mengirim pesan. Lanjutkan?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4361ee',
        cancelButtonColor: '#f72585',
        confirmButtonText: 'Ya, Kirim via WhatsApp',
        cancelButtonText: 'Batal',
        backdrop: `
            rgba(0,0,0,0.7)
            url("https://media.giphy.com/media/xULW8DcQGODuFk5Vk4/giphy.gif")
            center top
            no-repeat
        `
    }).then((result) => {
        if (result.isConfirmed) {
            const nama = encodeURIComponent(this.nama.value);
            const email = encodeURIComponent(this.email.value);
            const subjek = encodeURIComponent(this.subjek.value);
            const pesan = encodeURIComponent(this.pesan.value);
            
            const whatsappMessage = 
                `Halo BoostMedia!%0A%0A` +
                `*Nama:* ${nama}%0A` +
                `*Email:* ${email}%0A` +
                `*Subjek:* ${subjek}%0A` +
                `*Pesan:* ${pesan}`;
            
            window.open(`https://wa.me/6285117024857?text=${whatsappMessage}`, '_blank');
            
            // Reset form setelah kirim
            this.reset();
            
            // Notifikasi sukses
            Swal.fire(
                'Berhasil!',
                'Silahkan lanjutkan pengiriman pesan di WhatsApp',
                'success'
            );
        }
    });
});