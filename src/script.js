if (window.screen.orientation && /Mobi|Android/i.test(navigator.userAgent)) {
        window.screen.orientation.lock('portrait').catch(() => { });
    }
    // Desktop nav
    const toggleBtn = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const fadeItems = dropdownMenu.querySelectorAll('.fade-item');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('h-0');
            dropdownMenu.classList.toggle('h-fit');
            dropdownMenu.classList.toggle('actived');
            if (dropdownMenu.classList.contains('actived')) {
                fadeItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('opacity-100');
                        item.classList.remove('opacity-0');
                    }, 100 + i * 100);
                });
            } else {
                fadeItems.forEach((item) => {
                    item.classList.remove('opacity-100');
                    item.classList.add('opacity-0');
                });
            }
        });
    }

    // Mobile nav dropdown (full screen height, keep header visible)
    const mobileToggleBtn = document.getElementById('mobile-dropdown-toggle');
    let mobileMenuOpen = false;
    mobileToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!mobileMenuOpen) {
            dropdownMenu.classList.remove('h-0');
            dropdownMenu.classList.add('h-fit');
            dropdownMenu.classList.add('actived');
            // Make dropdown full screen height below header on mobile
            if (window.innerWidth < 768) {
                const header = document.querySelector('nav.relative');
                const headerRect = header.getBoundingClientRect();
                dropdownMenu.style.position = 'fixed';
                dropdownMenu.style.top = `${headerRect.bottom}px`;
                dropdownMenu.style.left = '0';
                dropdownMenu.style.width = '100vw';
                dropdownMenu.style.height = 'fit-content';
                dropdownMenu.style.zIndex = '900';
                dropdownMenu.style.marginTop = '0';
            }
            fadeItems.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add('opacity-100');
                    item.classList.remove('opacity-0');
                }, 100 + i * 100);
            });
        } else {
            dropdownMenu.classList.add('h-0');
            dropdownMenu.classList.remove('h-fit');
            dropdownMenu.classList.remove('actived');
            // Reset dropdown style on close
            if (window.innerWidth < 768) {
                dropdownMenu.style.position = '';
                dropdownMenu.style.top = '';
                dropdownMenu.style.left = '';
                dropdownMenu.style.width = '';
                dropdownMenu.style.height = '';
                dropdownMenu.style.zIndex = '';
                dropdownMenu.style.marginTop = '';
            }
            fadeItems.forEach((item) => {
                item.classList.remove('opacity-100');
                item.classList.add('opacity-0');
            });
        }
        mobileMenuOpen = !mobileMenuOpen;
    });

    // Close dropdown when clicking outside (for both desktop and mobile)
    document.addEventListener('click', (e) => {
        if (
            !dropdownMenu.contains(e.target) &&
            e.target !== toggleBtn &&
            e.target !== mobileToggleBtn
        ) {
            dropdownMenu.classList.add('h-0');
            dropdownMenu.classList.remove('h-fit');
            dropdownMenu.classList.remove('actived');
            // Reset dropdown style on close (mobile)
            if (window.innerWidth < 768) {
                dropdownMenu.style.position = '';
                dropdownMenu.style.top = '';
                dropdownMenu.style.left = '';
                dropdownMenu.style.width = '';
                dropdownMenu.style.height = '';
                dropdownMenu.style.zIndex = '';
                dropdownMenu.style.marginTop = '';
            }
            fadeItems.forEach((item) => {
                item.classList.remove('opacity-100');
                item.classList.add('opacity-0');
            });
            mobileMenuOpen = false;
        }
    });