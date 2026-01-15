document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and language from localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentLang = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('lang', currentLang);
    
    // Update theme icon
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Update language text
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('.lang-text');
    if (currentLang === 'ar') {
        langText.textContent = 'EN';
        applyArabicTranslations();
    }
    
    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            if (newTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            themeIcon.style.transform = 'rotate(0deg)';
        }, 150);
    });
    
    // Language Toggle
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.getAttribute('lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        
        document.documentElement.setAttribute('lang', newLang);
        document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('language', newLang);
        
        // Update button text with animation
        langText.style.transform = 'scale(0)';
        setTimeout(() => {
            if (newLang === 'ar') {
                langText.textContent = 'EN';
                applyArabicTranslations();
            } else {
                langText.textContent = 'AR';
                applyEnglishTranslations();
            }
            langText.style.transform = 'scale(1)';
        }, 150);
    });
    
    // شاشة التحميل
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // القائمة المتنقلة
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
                mainContent.classList.remove('active');
            }
            
            // إضافة active للرابط الحالي
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // تأثير الكتابة
    const typed = new Typed('.typing-effect', {
        strings: [
            'Hisham Muhaneed',
            'Python Developer',
            'Team Leader',
            'Database Expert'
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        backDelay: 1500,
        showCursor: true,
        cursorChar: '|'
    });

    // تصفية المشاريع
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة active من جميع الأزرار
            filterBtns.forEach(item => item.classList.remove('active'));
            
            // إضافة active للزر الحالي
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // تأثيرات التمرير
    window.addEventListener('scroll', reveal);
    
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        const backToTop = document.querySelector('.back-to-top');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            }
        }
        
        // زر العودة للأعلى
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
    
    // تفعيل تأثيرات التمرير عند التحميل
    reveal();
    
    // إضافة تأثير reveal لجميع الأقسام
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });

    // إضافة active للرابط الحالي عند التمرير
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // إرسال النموذج
    const contactForm = document.querySelector('.contact-form .form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود إرسال النموذج
            alert('Your message has been sent successfully! I will contact you soon.');
            this.reset();
        });
    }
});

// Translation Functions
function applyArabicTranslations() {
    const translations = {
        // Navigation
        'Home': 'الرئيسية',
        'About': 'عني',
        'Skills': 'المهارات',
        'Experience': 'الخبرة',
        'Education': 'التعليم',
        'Contact': 'التواصل',
        
        // Home Section
        'Welcome to my Portfolio': 'مرحباً بك في معرض أعمالي',
        "I'm": 'أنا',
        'A fourth-year IT student and Python developer skilled in databases, project management, and team leadership. Founder of the Future Technology Students Club at the Technical Administrative College.': 'طالب في السنة الرابعة في تكنولوجيا المعلومات ومطور بايثون ماهر في قواعد البيانات وإدارة المشاريع وقيادة الفريق. مؤسس نادي طلاب تكنولوجيا المستقبل في الكلية التقنية الإدارية.',
        'View My Work': 'شاهد أعمالي',
        'Contact Me': 'تواصل معي',
        
        // About Section
        'About Me': 'من أنا',
        'My Journey in Technology and Development': 'رحلتي في التكنولوجيا والتطوير',
        'Python Developer & Team Leader': 'مطور بايثون وقائد فريق',
        'Name:': 'الاسم:',
        'Date of Birth:': 'تاريخ الميلاد:',
        'Major:': 'التخصص:',
        'Email:': 'البريد الإلكتروني:',
        'Phone:': 'الهاتف:',
        'Location:': 'الموقع:',
        'View LinkedIn Profile': 'عرض الملف الشخصي على LinkedIn',
        
        // Skills Section
        'My Technical Skills': 'مهاراتي التقنية',
        'Knowledge and expertise I possess': 'المعرفة والخبرة التي أمتلكها',
        'Professional Skills': 'مهارات احترافية',
        'and Expertise': 'وخبرات',
        'Years': 'سنوات',
        'Experience': 'خبرة',
        'Projects': 'مشاريع',
        'Completed': 'مكتملة',
        'Dedication': 'تفاني',
        '& Passion': 'وشغف',
        'Technologies I Use': 'التقنيات التي أستخدمها',
        
        // Experience Section
        'Work Experience': 'خبرة العمل',
        'My professional journey and achievements': 'رحلتي المهنية وإنجازاتي',
        
        // Education Section
        'Education & Certifications': 'التعليم والشهادات',
        'My academic journey and professional certificates': 'رحلتي الأكاديمية والشهادات المهنية',
        
        // Contact Section
        'Contact Me': 'تواصل معي',
        "I'm always available for exciting projects and opportunities": 'أنا متاح دائماً للمشاريع الجديدة والفرص المثيرة',
        'Get In Touch': 'ابقَ على تواصل',
        'Your Name': 'اسمك',
        'Your Email': 'بريدك الإلكتروني',
        'Subject': 'الموضوع',
        'Message': 'الرسالة',
        'Send Message': 'إرسال الرسالة',
        'Stay Connected': 'ابقَ على اتصال',
        'All rights reserved.': 'جميع الحقوق محفوظة.',
    };
    
    updatePageContent(translations);
}

function applyEnglishTranslations() {
    const translations = {
        // Navigation
        'الرئيسية': 'Home',
        'عني': 'About',
        'المهارات': 'Skills',
        'الخبرة': 'Experience',
        'التعليم': 'Education',
        'التواصل': 'Contact',
        
        // Home Section
        'مرحباً بك في معرض أعمالي': 'Welcome to my Portfolio',
        'أنا': "I'm",
        'طالب في السنة الرابعة في تكنولوجيا المعلومات ومطور بايثون ماهر في قواعد البيانات وإدارة المشاريع وقيادة الفريق. مؤسس نادي طلاب تكنولوجيا المستقبل في الكلية التقنية الإدارية.': 'A fourth-year IT student and Python developer skilled in databases, project management, and team leadership. Founder of the Future Technology Students Club at the Technical Administrative College.',
        'شاهد أعمالي': 'View My Work',
        'تواصل معي': 'Contact Me',
        
        // About Section
        'من أنا': 'About Me',
        'رحلتي في التكنولوجيا والتطوير': 'My Journey in Technology and Development',
        'مطور بايثون وقائد فريق': 'Python Developer & Team Leader',
        'الاسم:': 'Name:',
        'تاريخ الميلاد:': 'Date of Birth:',
        'التخصص:': 'Major:',
        'البريد الإلكتروني:': 'Email:',
        'الهاتف:': 'Phone:',
        'الموقع:': 'Location:',
        'عرض الملف الشخصي على LinkedIn': 'View LinkedIn Profile',
        
        // Skills Section
        'مهاراتي التقنية': 'My Technical Skills',
        'المعرفة والخبرة التي أمتلكها': 'Knowledge and expertise I possess',
        'مهارات احترافية': 'Professional Skills',
        'وخبرات': 'and Expertise',
        'سنوات': 'Years',
        'خبرة': 'Experience',
        'مشاريع': 'Projects',
        'مكتملة': 'Completed',
        'تفاني': 'Dedication',
        'وشغف': '& Passion',
        'التقنيات التي أستخدمها': 'Technologies I Use',
        
        // Experience Section
        'خبرة العمل': 'Work Experience',
        'رحلتي المهنية وإنجازاتي': 'My professional journey and achievements',
        
        // Education Section
        'التعليم والشهادات': 'Education & Certifications',
        'رحلتي الأكاديمية والشهادات المهنية': 'My academic journey and professional certificates',
        
        // Contact Section
        'تواصل معي': 'Contact Me',
        'أنا متاح دائماً للمشاريع الجديدة والفرص المثيرة': "I'm always available for exciting projects and opportunities",
        'ابقَ على تواصل': 'Get In Touch',
        'اسمك': 'Your Name',
        'بريدك الإلكتروني': 'Your Email',
        'الموضوع': 'Subject',
        'الرسالة': 'Message',
        'إرسال الرسالة': 'Send Message',
        'ابقَ على اتصال': 'Stay Connected',
        'جميع الحقوق محفوظة.': 'All rights reserved.',
    };
    
    updatePageContent(translations);
}

function updatePageContent(translations) {
    // Update all text nodes
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, input, textarea, .detail-label');
    
    elements.forEach(element => {
        // Skip if element has children (except text nodes)
        if (element.children.length > 0 && element.tagName !== 'A' && element.tagName !== 'BUTTON') return;
        
        const text = element.textContent.trim();
        if (translations[text]) {
            element.textContent = translations[text];
        }
        
        // Handle placeholders
        if (element.placeholder && translations[element.placeholder]) {
            element.placeholder = translations[element.placeholder];
        }
    });
}