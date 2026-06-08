document.addEventListener('DOMContentLoaded', function () {

    
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
    }

    
    const disc         = document.getElementById('disc');
    const discLabel    = document.getElementById('discLabel');
    const discPrev     = document.getElementById('discPrev');
    const discNext     = document.getElementById('discNext');

   
  
    if (disc && discLabel && discPrev && discNext) {
 
        
        const discItems = [
            { label: 'Log-in',   href: 'Register.html'    },
            { label: 'Register', href: 'Register.html' },
        ];
 
        let discIndex = 0;
 
        function renderDisc(direction) {
            const item = discItems[discIndex];
            disc.classList.remove('spin-right', 'spin-left');
            void disc.offsetWidth;
            disc.classList.add(direction === 'right' ? 'spin-right' : 'spin-left');
            
            discLabel.textContent = item.label;
        }
 
        discNext.addEventListener('click', function (e) {
            e.stopPropagation();
            discIndex = (discIndex + 1) % discItems.length;
            renderDisc('right');
        });
 
        discPrev.addEventListener('click', function (e) {
            e.stopPropagation();
            discIndex = (discIndex - 1 + discItems.length) % discItems.length;
            renderDisc('left');
        });
 
        
        disc.addEventListener('click', function () {
            window.location.href = discItems[discIndex].href;
        });
 
        
        let dragStartX = 0;
        let isDragging = false;
 
        disc.addEventListener('mousedown', function (e) {
            dragStartX = e.clientX;
            isDragging = true;
            disc.style.cursor = 'grabbing';
        });
 
        document.addEventListener('mouseup', function (e) {
            if (!isDragging) return;
            isDragging = false;
            disc.style.cursor = 'grab';
            const delta = e.clientX - dragStartX;
            if (Math.abs(delta) > 30) {
                discIndex = delta < 0
                    ? (discIndex + 1) % discItems.length                    : (discIndex - 1 + discItems.length) % discItems.length;
                renderDisc(delta < 0 ? 'right' : 'left');
            }
        });
 
        disc.addEventListener('touchstart', function (e) {
            dragStartX = e.touches[0].clientX;
        }, { passive: true });
 
        disc.addEventListener('touchend', function (e) {
            const delta = e.changedTouches[0].clientX - dragStartX;
            if (Math.abs(delta) > 30) {
                discIndex = delta < 0
                    ? (discIndex + 1) % discItems.length                    : (discIndex - 1 + discItems.length) % discItems.length;
                renderDisc(delta < 0 ? 'right' : 'left');
            }
        }, { passive: true });
 
        
        discLabel.textContent = discItems[0].label;
    }
 
    
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose   = document.getElementById('popupClose');
    const popupCta     = document.getElementById('popupCta');
 
    if (popupOverlay) {
        
        function closePopup() {
            popupOverlay.classList.add('hidden');
        }
 
        if (popupClose) popupClose.addEventListener('click', closePopup);
        if (popupCta)   popupCta.addEventListener('click', closePopup);
 
        
        popupOverlay.addEventListener('click', function (e) {
            if (e.target === popupOverlay) closePopup();
        });
 
        
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closePopup();
        });
    }
 
    
    const carouselContainer = document.querySelector('.carouselContainer');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slides  = document.querySelectorAll('.Ads-slide');
 
    if (carouselContainer && slides.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoPlayTimer;
 
        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            carouselContainer.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        }
 
        nextBtn.addEventListener('click', function () {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });
 
        prevBtn.addEventListener('click', function () {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });
 
        
        function startAutoPlay() {
            autoPlayTimer = setInterval(function () {
                goToSlide(currentIndex + 1);
            }, 4000);
        }
 
        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }
 
        goToSlide(0);
        startAutoPlay();
    }
 
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn   = document.getElementById('searchBtn');
 
    if (searchInput && searchBtn) {
        function doSearch() {
            const query = searchInput.ariaValueMax.trim();
            if (query.length > 0) {
                
                window.location.href = 'Troops.html?search=' + encodeURIComponent(query);
            }
        }
 
        searchBtn.addEventListener('click', doSearch);
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') doSearch();
        });
    }
 
    
    const tabBtns = document.querySelectorAll('.tab-btn');
 
    if (tabBtns.length > 0) {
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                
                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
 
                
                const allTabs = document.querySelectorAll('.gallery-masonry');
                allTabs.forEach(function (tab) { tab.classList.add('hidden'); });
 
                
                const target = document.getElementById('tab-' + btn.CDATA_SECTION_NODE.tab);
                if (target) target.classList.remove('hidden');
            });
        });
    }
 
    
    const troopsGrid = document.getElementById('troopsGrid');
 
    if (troopsGrid) {
        
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
 
        if (searchQuery) {
            filterTroops(searchQuery);
        }
 
        function filterTroops(query) {
            const cards = troopsGrid.querySelectorAll('.troop-card');
            const q = query.toLowerCase();
 
            cards.forEach(function (card) {
                const name = card.CDATA_SECTION_NODE.name.toLowerCase();
                if (name.includes(q)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
 
    
    const troopModalOverlay = document.getElementById('troopModalOverlay');
    const modalClose        = document.getElementById('modalClose');
    const modalNavPrev      = document.getElementById('modalNavPrev');
    const modalNavNext      = document.getElementById('modalNavNext');
 
    
    
    const troopData = {
        barbarian: {
            name: 'Barbarian',
            levelStats: [
                [1,  9,   45,  'None',          'None'],
                [2,  12,  54,  '30 second',     '1'],
                [3,  15,  65,  '1 menit',       '3'],
                [4,  18,  85,  '2 menit',       '5'],
                [5,  23,  105, '4 menit',       '6'],
                [6,  26,  125, '8 menit',       '7'],
                [7,  30,  160, '12 menit',      '8'],
                [8,  34,  205, '20 menit',      '9'],
                [9,  38,  230, '40 menit',      '10'],
                [10, 42,  250, '60 menit',      '12'],
                [11, 45,  270, '1 jam 10 menit','13'],
            ],
            spriteFolder: 'assets/troops/levelling_barbarian',
            spriteCount: 11,
        },
        archer: {
            name: 'Archer',
            levelStats: [
                [1,  7,   42,  'None',          'None'],
                [2,  10,  50,  '30 second',     '1'],
                [3,  13,  60,  '1 menit',       '3'],
                [4,  16,  76,  '2 menit',       '5'],
                [5,  20,  95,  '4 menit',       '6'],
                [6,  23,  115, '8 menit',       '7'],
                [7,  27,  148, '12 menit',      '8'],
                [8,  31,  190, '20 menit',      '9'],
                [9,  35,  214, '40 menit',      '10'],
                [10, 39,  232, '60 menit',      '12'],
                [11, 42,  252, '1 jam 10 menit','13'],
            ],
            spriteFolder: 'assets/troops/levelling_archer',
            spriteCount: 11,
        },
        goblin: {
            name: 'Goblin',
            levelStats: [
                [1,  11,  25,  'None',     'None'],
                [2,  15,  30,  '1 menit',  '1'],
                [3,  19,  38,  '2 menit',  '3'],
                [4,  25,  50,  '4 menit',  '5'],
                [5,  31,  63,  '8 menit',  '6'],
                [6,  37,  75,  '15 menit', '7'],
                [7,  45,  90,  '30 menit', '8'],
                [8,  54,  108, '45 menit', '9'],
            ],
            spriteFolder: 'assets/troops/levelling_goblin',
            spriteCount: 8,
        },
        giant: {
            name: 'Giant',
            levelStats: [
                [1,  11,  300,  'None',          'None'],
                [2,  14,  380,  '30 second',     '1'],
                [3,  19,  500,  '1 menit',       '3'],
                [4,  24,  640,  '2 menit',       '5'],
                [5,  30,  820,  '4 menit',       '6'],
                [6,  38,  1020, '8 menit',       '7'],
                [7,  47,  1260, '15 menit',      '8'],
                [8,  58,  1540, '30 menit',      '9'],
                [9,  70,  1860, '45 menit',      '10'],
                [10, 84,  2200, '60 menit',      '12'],
                [11, 100, 2580, '1 jam 10 menit','13'],
            ],
            spriteFolder: 'assets/troops/levelling_giant',
            spriteCount: 11,
        },
        electro: {
            name: 'Electro Dragon',
            levelStats: [
                [1, 240, 3200, 'None',     'None'],
                [2, 270, 3600, '3 hari',   '9'],
                [3, 300, 4000, '5 hari',   '10'],
                [4, 330, 4400, '7 hari',   '11'],
                [5, 360, 4800, '9 hari',   '12'],
                [6, 400, 5300, '11 hari',  '13'],
            ],
            spriteFolder: 'assets/troops/levelling_electro_dragon',
            spriteCount: 6,
        },
        hogrider: {
            name: 'Hog Rider',
            levelStats: [
                [1,  65,  135,  'None',     'None'],
                [2,  76,  158,  '2 menit',  '5'],
                [3,  90,  186,  '4 menit',  '6'],
                [4,  106, 219,  '8 menit',  '7'],
                [5,  125, 257,  '15 menit', '8'],
                [6,  147, 302,  '30 menit', '9'],
                [7,  172, 354,  '45 menit', '10'],
                [8,  202, 415,  '60 menit', '11'],
                [9,  237, 487,  '80 menit', '12'],
                [10, 278, 571,  '100 menit','13'],
            ],
            spriteFolder: 'assets/troops/levelling_hog_rider',
            spriteCount: 10,
        },
        pekka: {
            name: 'P.E.K.K.A',
            levelStats: [
                [1, 240,  2600, 'None',     'None'],
                [2, 278,  3000, '1 hari',   '7'],
                [3, 322,  3500, '2 hari',   '8'],
                [4, 374,  4000, '3 hari',   '9'],
                [5, 432,  4600, '5 hari',   '10'],
                [6, 502,  5200, '7 hari',   '11'],
                [7, 582,  5900, '9 hari',   '12'],
                [8, 675,  6600, '11 hari',  '13'],
            ],
            spriteFolder: 'assets/troops/levelling_pekka',
            spriteCount: 8,
        },
        healer: {
            name: 'Healer',
            levelStats: [
                [1, 0, 1300, 'None',     'None'],
                [2, 0, 1500, '1 hari',   '5'],
                [3, 0, 1750, '2 hari',   '7'],
                [4, 0, 2000, '3 hari',   '9'],
                [5, 0, 2300, '5 hari',   '11'],
                [6, 0, 2600, '7 hari',   '13'],
            ],
            spriteFolder: 'assets/troops/levelling_healer',
            spriteCount: 6,
        },
        wizard: {
            name: 'Wizard',
            levelStats: [
                [1,  75,  75,  'None',     'None'],
                [2,  94,  90,  '1 menit',  '3'],
                [3,  118, 107, '2 menit',  '5'],
                [4,  148, 127, '4 menit',  '6'],
                [5,  185, 151, '8 menit',  '7'],
                [6,  231, 178, '15 menit', '8'],
                [7,  289, 210, '30 menit', '9'],
                [8,  361, 247, '45 menit', '10'],
                [9,  451, 290, '60 menit', '11'],
                [10, 563, 341, '80 menit', '12'],
                [11, 704, 400, '100 menit','13'],
            ],
            spriteFolder: 'assets/troops/levelling_wizard',
            spriteCount: 11,
        },
    };
 
    let modalSectionIndex = 0;
    const TOTAL_SECTIONS  = 3;
 
    function showModalSection(idx) {
        modalSectionIndex = (idx + TOTAL_SECTIONS) % TOTAL_SECTIONS;
        for (var i = 0; i < TOTAL_SECTIONS; i++) {
            var sec = document.getElementById('modalSec' + i);
            if (sec) sec.classList.toggle('hidden', i !== modalSectionIndex);
        }
    }
 
    function buildLevelRows(stats, startRow, endRow) {
        var html = '';
        var rows = stats.slice(startRow, endRow);
        rows.forEach(function(r) {
            html += '<tr>' +
                '<td>' + r[0] + '</td>' +
                '<td>' + r[1] + '</td>' +
                '<td>' + r[2] + '</td>' +
                '<td>' + r[3] + '</td>' +
                '<td>' + r[4] + '</td>' +
                '</tr>';
        });
        return html;
    }
 
    
    window.openTroopModal = function(troopKey) {
        if (!troopModalOverlay) return;
        var troop = troopData[troopKey];
        if (!troop) return;
 
        
        var tbody0 = document.getElementById('modalTbody0');
        if (tbody0) tbody0.innerHTML = buildLevelRows(troop.levelStats, 0, 5);
 
        
        var sec1 = document.getElementById('modalSec1');
        var tbody1 = document.getElementById('modalTbody1');
        if (troop.levelStats.length > 5) {
            if (tbody1) tbody1.innerHTML = buildLevelRows(troop.levelStats, 5, troop.levelStats.length);
            if (sec1) sec1.dataset.available = '1';
        } else {
            if (sec1) sec1.dataset.available = '0';
        }
 
        
        var grid = document.getElementById('modalUpgradeGrid');
        if (grid) {
            grid.innerHTML = '';
            for (var i = 1; i <= troop.spriteCount; i++) {
                var img = document.createElement('img');
                
                img.src = troop.spriteFolder + '/' + i + '.png';
                img.alt = troop.name + ' level ' + i;
                img.title = 'Level ' + i;
                
                img.onerror = function() {
                    this.style.opacity = '0.3';
                    this.src = 'assets/troops/Barbarian_info.jpg';
                };
                grid.appendChild(img);
            }
        }
 
        
        showModalSection(0);
        troopModalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
 
    
    if (modalNavPrev) {
        modalNavPrev.addEventListener('click', function() {
            
            var newIdx = modalSectionIndex - 1;
            if (newIdx < 0) newIdx = TOTAL_SECTIONS - 1;
            var sec1 = document.getElementById('modalSec1');
            if (newIdx === 1 && sec1 && sec1.dataset.available === '0') newIdx = 0;
            showModalSection(newIdx);
        });
    }
 
    if (modalNavNext) {
        modalNavNext.addEventListener('click', function() {
            var newIdx = modalSectionIndex + 1;
            if (newIdx >= TOTAL_SECTIONS) newIdx = 0;
            var sec1 = document.getElementById('modalSec1');
            if (newIdx === 1 && sec1 && sec1.dataset.available === '0') newIdx = 2;
            showModalSection(newIdx);
        });
    }
 
    if (modalClose) {
        modalClose.addEventListener('click', closeTroopModal);
    }
 
    if (troopModalOverlay) {
        troopModalOverlay.addEventListener('click', function(e) {
            if (e.target === troopModalOverlay) closeTroopModal();
        });
    }
 
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && troopModalOverlay && !troopModalOverlay.classList.contains('hidden')) {
            closeTroopModal();
        }
    });
 
    function closeTroopModal() {
        if (troopModalOverlay) troopModalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
 
    
    const registerForm    = document.getElementById('registerForm');
    const submitBtn       = document.getElementById('submitBtn');
    const registerSuccess = document.getElementById('registerSuccess');
 
    if (submitBtn && registerForm) {
 
        
        function showError(fieldId, message) {
            const el = document.getElementById('err-' + fieldId);
            const input = document.getElementById(fieldId);
            if (el) el.textContent = message;
            if (input) {
                input.classList.add('error');
                input.classList.remove('valid');
            }
            return false;
        }
 
        function clearError(fieldId) {
            const el = document.getElementById('err-' + fieldId);
            const input = document.getElementById(fieldId);
            if (el) el.textContent = '';
            if (input) {
                input.classList.remove('error');
                input.classList.add('valid');
            }
            return true;
        }
 
        
        function validateUsername() {
            const val = document.getElementById('username').value.trim();
            if (val.length === 0) {
                return showError('username', '⚠️ Username tidak boleh kosong.');
            }
            if (val.length < 3) {
                return showError('username', '⚠️ Username minimal 3 karakter.');
            }
            if (val.length > 20) {
                return showError('username', '⚠️ Username maksimal 20 karakter.');
            }
            return clearError('username');
        }
 
        
        function validateEmail() {
            const val = document.getElementById('email').value.trim();
            if (val.length === 0) {
                return showError('email', '⚠️ Email tidak boleh kosong.');
            }
            
            const atIndex = val.indexOf('@');
            if (atIndex < 1) {
                return showError('email', '⚠️ Email harus mengandung karakter @.');
            }
            const afterAt = val.slice(atIndex + 1);
            const dotIndex = afterAt.indexOf('.');
            if (dotIndex < 1 || dotIndex === afterAt.length - 1) {
                return showError('email', '⚠️ Format email tidak valid (contoh: nama@email.com).');
            }
            return clearError('email');
        }
 
        
        function validatePassword() {
            const val = document.getElementById('password').value;
            if (val.length === 0) {
                return showError('password', '⚠️ Password tidak boleh kosong.');
            }
            if (val.length < 8) {
                return showError('password', '⚠️ Password minimal 8 karakter.');
            }
            return clearError('password');
        }
 
        
        function validateKota() {
            const val = document.getElementById('kota').value;
            if (val === '' || val === null) {
                return showError('kota', '⚠️ Pilih pusat komunitas terdekat.');
            }
            return clearError('kota');
        }
 
        
        function validateAlasan() {
            const val = document.getElementById('alasan').value.trim();
            if (val.length === 0) {
                return showError('alasan', '⚠️ Alasan bergabung tidak boleh kosong.');
            }
            
            const words = val.split(' ').filter(function (w) { return w.length > 0; });
            if (words.length < 5) {
                return showError('alasan', '⚠️ Tuliskan alasan minimal 5 kata.');
            }
            if (val.length > 200) {
                return showError('alasan', '⚠️ Alasan maksimal 200 karakter.');
            }
            return clearError('alasan');
        }
 
        
        function validateTerms() {
            const checked = document.getElementById('agreeTerms').checked;
            if (!checked) {
                document.getElementById('err-terms').textContent = '⚠️ Kamu harus menyetujui syarat & ketentuan.';
                return false;
            }
            document.getElementById('err-terms').textContent = '';
            return true;
        }
 
        
        const usernameInput  = document.getElementById('username');
        const emailInput     = document.getElementById('email');
        const passwordInput  = document.getElementById('password');
        const kotaSelect     = document.getElementById('kota');
        const alasanTextarea = document.getElementById('alasan');
        const agreeCheckbox  = document.getElementById('agreeTerms');
 
        if (usernameInput)  usernameInput.addEventListener('blur', validateUsername);
        if (emailInput)     emailInput.addEventListener('blur', validateEmail);
        if (passwordInput)  passwordInput.addEventListener('input', function () {
            validatePassword();
            updatePasswordStrength(this.value);
        });
        if (kotaSelect)     kotaSelect.addEventListener('change', validateKota);
        if (alasanTextarea) {
            alasanTextarea.addEventListener('input', function () {
                const len = this.value.length;
                const counter = document.getElementById('charCount');
                if (counter) counter.textContent = len + ' / 200 karakter';
                if (len > 0) validateAlasan();
            });
        }
        if (agreeCheckbox) agreeCheckbox.addEventListener('change', validateTerms);
 
        
        const togglePw = document.getElementById('togglePw');
        const passwordField = document.getElementById('password');
        if (togglePw && passwordField) {
            togglePw.addEventListener('click', function () {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    togglePw.textContent = '🙈';
                } else {
                    passwordField.type = 'password';
                    togglePw.textContent = '👁';
                }
            });
        }
 
        
        function updatePasswordStrength(val) {
            const fill  = document.getElementById('pwStrengthFill');
            const label = document.getElementById('pwStrengthLabel');
            if (!fill || !label) return;
 
            let score = 0;
            if (val.length >= 8)   score++;
            if (val.length >= 12)  score++;
 
            
            let hasUpper = false;
            let hasLower = false;
            let hasNum   = false;
            for (let i = 0; i < val.length; i++) {
                const c = val.charCodeAt(i);
                if (c >= 65 && c <= 90)  hasUpper = true;
                if (c >= 97 && c <= 122) hasLower = true;
                if (c >= 48 && c <= 57)  hasNum   = true;
            }
            if (hasUpper) score++;
            if (hasLower) score++;
            if (hasNum)   score++;
 
            const pct   = Math.min(100, (score / 5) * 100);
            fill.style.width = pct + '%';
 
            if (pct <= 30) {
                fill.style.background = '#e53e3e';
                label.textContent = 'Lemah';
                label.style.color = '#e53e3e';
            } else if (pct <= 60) {
                fill.style.background = '#f6ad55';
                label.textContent = 'Sedang';
                label.style.color = '#d97706';
            } else {
                fill.style.background = '#48bb78';
                label.textContent = 'Kuat 💪';
                label.style.color = '#276749';
            }
        }
 
        
        submitBtn.addEventListener('click', function () {
            const v1 = validateUsername();
            const v2 = validateEmail();
            const v3 = validatePassword();
            const v4 = validateKota();
            const v5 = validateAlasan();
            const v6 = validateTerms();
 
            if (v1 && v2 && v3 && v4 && v5 && v6) {
                
                const username = document.getElementById('username').value.trim();
                const successName = document.getElementById('successName');
                if (successName) {
                    successName.textContent = 'Selamat datang, ' + username + '! Kamu berhasil bergabung ke komunitas Clash of BaNG.';
                }
 
                registerForm.classList.add('hidden');
                if (registerSuccess) registerSuccess.classList.remove('hidden');
 
                
                document.querySelector('.register-card').scrollIntoView({ behavior: 'smooth' });
            } else {
                
                const firstError = registerForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
 
    
    
    
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', function () {
            this.classList.toggle('open');
        });
    }
 
});