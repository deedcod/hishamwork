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
            
            // Check current language
            const currentLang = document.documentElement.getAttribute('lang');
            const successMessage = currentLang === 'ar' 
                ? 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.'
                : 'Your message has been sent successfully! I will contact you soon.';
            
            alert(successMessage);
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
        'Hisham Muhaneed': 'هشام مهند',
        'Python Developer': 'مطور بايثون',
        'Team Leader': 'قائد فريق',
        'Database Expert': 'خبير قواعد البيانات',
        'A fourth-year IT student and Python developer skilled in databases, project management, and team leadership. Founder of the Future Technology Students Club at the Technical Administrative College.': 'طالب في السنة الرابعة في تكنولوجيا المعلومات ومطور بايثون ماهر في قواعد البيانات وإدارة المشاريع وقيادة الفريق. مؤسس نادي طلاب تكنولوجيا المستقبل في الكلية التقنية الإدارية.',
        'View My Work': 'شاهد أعمالي',
        'Contact Me': 'تواصل معي',
        
        // About Section
        'About Me': 'من أنا',
        'My Journey in Technology and Development': 'رحلتي في التكنولوجيا والتطوير',
        'Python Developer & Team Leader': 'مطور بايثون وقائد فريق',
        'I am a fourth-year university student pursuing a Bachelor\'s degree in IT at the Administrative Technical College (2023-2027). As a passionate Python developer, I have developed multiple personal projects and created practical solutions using modern technologies.': 'أنا طالب في السنة الرابعة في الجامعة أسعى للحصول على درجة البكالوريوس في تكنولوجيا المعلومات في الكلية التقنية الإدارية (2023-2027). كمطور بايثون شغوف، قمت بتطوير عدة مشاريع شخصية وإنشاء حلول عملية باستخدام التقنيات الحديثة.',
        'I founded and lead the Future Technology Students Club at my college, demonstrating strong leadership and project management skills. My expertise includes Python development, database management, web development, and C++ programming. I\'m dedicated to continuous learning through various certifications and courses.': 'أسست وأقود نادي طلاب تكنولوجيا المستقبل في كليتي، مما يظهر مهارات قيادية قوية في إدارة المشاريع. تشمل خبرتي تطوير بايثون وإدارة قواعد البيانات وتطوير الويب وبرمجة C++. أنا ملتزم بالتعلم المستمر من خلال مختلف الشهادات والدورات.',
        'Name:': 'الاسم:',
        'Date of Birth:': 'تاريخ الميلاد:',
        'January 9, 2004': '9 يناير 2004',
        'Major:': 'التخصص:',
        'IT, Bachelor\'s': 'تكنولوجيا المعلومات، بكالوريوس',
        'Email:': 'البريد الإلكتروني:',
        'Phone:': 'الهاتف:',
        'Location:': 'الموقع:',
        'Baghdad, Iraq (Althalba)': 'بغداد، العراق (الثعلبة)',
        'View LinkedIn Profile': 'عرض الملف الشخصي على LinkedIn',
        
        // Skills Section
        'My Technical Skills': 'مهاراتي التقنية',
        'Knowledge and expertise I possess': 'المعرفة والخبرة التي أمتلكها',
        'Professional Skills': 'مهارات احترافية',
        'and Expertise': 'وخبرات',
        'I have comprehensive experience in Python development, database management, and creating web applications. I am proficient in using Microsoft Office 365 for productivity, and possess strong project management and team leadership abilities. My creativity drives me to develop innovative solutions and lead successful projects.': 'لدي خبرة شاملة في تطوير بايثون وإدارة قواعد البيانات وإنشاء تطبيقات الويب. أنا بارع في استخدام Microsoft Office 365 للإنتاجية، وأمتلك قدرات قوية في إدارة المشاريع وقيادة الفريق. إبداعي يدفعني لتطوير حلول مبتكرة وقيادة مشاريع ناجحة.',
        'Years': 'سنوات',
        'Experience': 'خبرة',
        'Projects': 'مشاريع',
        'Completed': 'مكتملة',
        'Dedication': 'تفاني',
        '& Passion': 'وشغف',
        'Python Development': 'تطوير بايثون',
        'Database Management': 'إدارة قواعد البيانات',
        'Web Development': 'تطوير الويب',
        'C++ Development': 'تطوير C++',
        'Team Leadership & Project Management': 'قيادة الفريق وإدارة المشاريع',
        'Technologies I Use': 'التقنيات التي أستخدمها',
        
        // Experience Section
        'Work Experience': 'خبرة العمل',
        'My professional journey and achievements': 'رحلتي المهنية وإنجازاتي',
        'Dream Media': 'دريم ميديا',
        'Marketing & Media Solutions': 'حلول التسويق والإعلام',
        'View Project': 'عرض المشروع',
        'Mostafa Muwafaq': 'مصطفى موفق',
        'Business Trainer Portfolio': 'معرض أعمال مدرب الأعمال',
        'Dream Media Company': 'شركة دريم ميديا',
        'Company Website & Services': 'موقع الشركة والخدمات',
        'FTSC Bio Link': 'رابط نادي FTSC',
        'Future Technology Student Club': 'نادي طلاب تكنولوجيا المستقبل',
        'Workshop Registration': 'تسجيل الورشة',
        'Event Registration System': 'نظام تسجيل الفعاليات',
        
        // Education Section
        'Education & Certifications': 'التعليم والشهادات',
        'My academic journey and professional certificates': 'رحلتي الأكاديمية والشهادات المهنية',
        'Bachelor\'s Degree in IT': 'درجة البكالوريوس في تكنولوجيا المعلومات',
        'Administrative Technical College - Currently in fourth year, pursuing Bachelor\'s degree in Information Technology': 'الكلية التقنية الإدارية - حالياً في السنة الرابعة، أسعى للحصول على درجة البكالوريوس في تكنولوجيا المعلومات',
        'Solution Challenge - GDSC': 'تحدي الحلول - GDSC',
        'Professional Certificate from Google Developer Student Clubs': 'شهادة احترافية من نوادي طلاب مطوري جوجل',
        'Machine Learning Course': 'دورة التعلم الآلي',
        'GDSC UOT - Comprehensive Machine Learning course and certification': 'GDSC UOT - دورة شاملة في التعلم الآلي والشهادة',
        'Object-Oriented Programming (OOP)': 'البرمجة الشيئية (OOP)',
        'GDSC UOT - Advanced OOP concepts and practices': 'GDSC UOT - مفاهيم وممارسات OOP المتقدمة',
        'CS50 - Harvard\'s Computer Science': 'CS50 - علوم الحاسوب من هارفارد',
        'Mega Academy - Harvard\'s prestigious introduction to computer science': 'أكاديمية ميجا - مقدمة هارفارد المرموقة لعلوم الحاسوب',
        'Marketing Course': 'دورة التسويق',
        'BHTCS - Professional marketing and business strategies': 'BHTCS - استراتيجيات التسويق والأعمال الاحترافية',
        'Python Programming': 'برمجة بايثون',
        'Foundation course in Python programming and development': 'دورة أساسية في برمجة وتطوير بايثون',
        
        // Contact Section
        'Contact Me': 'تواصل معي',
        "I'm always available for exciting projects and opportunities": 'أنا متاح دائماً للمشاريع الجديدة والفرص المثيرة',
        'Get In Touch': 'ابقَ على تواصل',
        'If you\'re looking for a dedicated Python developer for your project or have any inquiries, feel free to contact me through any of the following channels:': 'إذا كنت تبحث عن مطور بايثون متفاني لمشروعك أو لديك أي استفسارات، لا تتردد في الاتصال بي من خلال أي من القنوات التالية:',
        'Location': 'الموقع',
        'Your Name': 'اسمك',
        'Your Email': 'بريدك الإلكتروني',
        'Subject': 'الموضوع',
        'Message': 'الرسالة',
        'Send Message': 'إرسال الرسالة',
        'Stay Connected': 'ابقَ على اتصال',
        'All rights reserved.': 'جميع الحقوق محفوظة.',
    };
    
    updatePageContent(translations);
    
    // Update Typed.js strings for Arabic
    if (window.typed) {
        window.typed.destroy();
    }
    window.typed = new Typed('.typing-effect', {
        strings: [
            'هشام مهند',
            'مطور بايثون',
            'قائد فريق',
            'خبير قواعد البيانات'
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        backDelay: 1500,
        showCursor: true,
        cursorChar: '|'
    });
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
        'هشام مهند': 'Hisham Muhaneed',
        'مطور بايثون': 'Python Developer',
        'قائد فريق': 'Team Leader',
        'خبير قواعد البيانات': 'Database Expert',
        'طالب في السنة الرابعة في تكنولوجيا المعلومات ومطور بايثون ماهر في قواعد البيانات وإدارة المشاريع وقيادة الفريق. مؤسس نادي طلاب تكنولوجيا المستقبل في الكلية التقنية الإدارية.': 'A fourth-year IT student and Python developer skilled in databases, project management, and team leadership. Founder of the Future Technology Students Club at the Technical Administrative College.',
        'شاهد أعمالي': 'View My Work',
        'تواصل معي': 'Contact Me',
        
        // About Section
        'من أنا': 'About Me',
        'رحلتي في التكنولوجيا والتطوير': 'My Journey in Technology and Development',
        'مطور بايثون وقائد فريق': 'Python Developer & Team Leader',
        'أنا طالب في السنة الرابعة في الجامعة أسعى للحصول على درجة البكالوريوس في تكنولوجيا المعلومات في الكلية التقنية الإدارية (2023-2027). كمطور بايثون شغوف، قمت بتطوير عدة مشاريع شخصية وإنشاء حلول عملية باستخدام التقنيات الحديثة.': 'I am a fourth-year university student pursuing a Bachelor\'s degree in IT at the Administrative Technical College (2023-2027). As a passionate Python developer, I have developed multiple personal projects and created practical solutions using modern technologies.',
        'أسست وأقود نادي طلاب تكنولوجيا المستقبل في كليتي، مما يظهر مهارات قيادية قوية في إدارة المشاريع. تشمل خبرتي تطوير بايثون وإدارة قواعد البيانات وتطوير الويب وبرمجة C++. أنا ملتزم بالتعلم المستمر من خلال مختلف الشهادات والدورات.': 'I founded and lead the Future Technology Students Club at my college, demonstrating strong leadership and project management skills. My expertise includes Python development, database management, web development, and C++ programming. I\'m dedicated to continuous learning through various certifications and courses.',
        'الاسم:': 'Name:',
        'تاريخ الميلاد:': 'Date of Birth:',
        '9 يناير 2004': 'January 9, 2004',
        'التخصص:': 'Major:',
        'تكنولوجيا المعلومات، بكالوريوس': 'IT, Bachelor\'s',
        'البريد الإلكتروني:': 'Email:',
        'الهاتف:': 'Phone:',
        'الموقع:': 'Location:',
        'بغداد، العراق (الثعلبة)': 'Baghdad, Iraq (Althalba)',
        'عرض الملف الشخصي على LinkedIn': 'View LinkedIn Profile',
        
        // Skills Section
        'مهاراتي التقنية': 'My Technical Skills',
        'المعرفة والخبرة التي أمتلكها': 'Knowledge and expertise I possess',
        'مهارات احترافية': 'Professional Skills',
        'وخبرات': 'and Expertise',
        'لدي خبرة شاملة في تطوير بايثون وإدارة قواعد البيانات وإنشاء تطبيقات الويب. أنا بارع في استخدام Microsoft Office 365 للإنتاجية، وأمتلك قدرات قوية في إدارة المشاريع وقيادة الفريق. إبداعي يدفعني لتطوير حلول مبتكرة وقيادة مشاريع ناجحة.': 'I have comprehensive experience in Python development, database management, and creating web applications. I am proficient in using Microsoft Office 365 for productivity, and possess strong project management and team leadership abilities. My creativity drives me to develop innovative solutions and lead successful projects.',
        'سنوات': 'Years',
        'خبرة': 'Experience',
        'مشاريع': 'Projects',
        'مكتملة': 'Completed',
        'تفاني': 'Dedication',
        'وشغف': '& Passion',
        'تطوير بايثون': 'Python Development',
        'إدارة قواعد البيانات': 'Database Management',
        'تطوير الويب': 'Web Development',
        'تطوير C++': 'C++ Development',
        'قيادة الفريق وإدارة المشاريع': 'Team Leadership & Project Management',
        'التقنيات التي أستخدمها': 'Technologies I Use',
        
        // Experience Section
        'خبرة العمل': 'Work Experience',
        'رحلتي المهنية وإنجازاتي': 'My professional journey and achievements',
        'دريم ميديا': 'Dream Media',
        'حلول التسويق والإعلام': 'Marketing & Media Solutions',
        'عرض المشروع': 'View Project',
        'مصطفى موفق': 'Mostafa Muwafaq',
        'معرض أعمال مدرب الأعمال': 'Business Trainer Portfolio',
        'شركة دريم ميديا': 'Dream Media Company',
        'موقع الشركة والخدمات': 'Company Website & Services',
        'رابط نادي FTSC': 'FTSC Bio Link',
        'نادي طلاب تكنولوجيا المستقبل': 'Future Technology Student Club',
        'تسجيل الورشة': 'Workshop Registration',
        'نظام تسجيل الفعاليات': 'Event Registration System',
        
        // Education Section
        'التعليم والشهادات': 'Education & Certifications',
        'رحلتي الأكاديمية والشهادات المهنية': 'My academic journey and professional certificates',
        'درجة البكالوريوس في تكنولوجيا المعلومات': 'Bachelor\'s Degree in IT',
        'الكلية التقنية الإدارية - حالياً في السنة الرابعة، أسعى للحصول على درجة البكالوريوس في تكنولوجيا المعلومات': 'Administrative Technical College - Currently in fourth year, pursuing Bachelor\'s degree in Information Technology',
        'تحدي الحلول - GDSC': 'Solution Challenge - GDSC',
        'شهادة احترافية من نوادي طلاب مطوري جوجل': 'Professional Certificate from Google Developer Student Clubs',
        'دورة التعلم الآلي': 'Machine Learning Course',
        'GDSC UOT - دورة شاملة في التعلم الآلي والشهادة': 'GDSC UOT - Comprehensive Machine Learning course and certification',
        'البرمجة الشيئية (OOP)': 'Object-Oriented Programming (OOP)',
        'GDSC UOT - مفاهيم وممارسات OOP المتقدمة': 'GDSC UOT - Advanced OOP concepts and practices',
        'CS50 - علوم الحاسوب من هارفارد': 'CS50 - Harvard\'s Computer Science',
        'أكاديمية ميجا - مقدمة هارفارد المرموقة لعلوم الحاسوب': 'Mega Academy - Harvard\'s prestigious introduction to computer science',
        'دورة التسويق': 'Marketing Course',
        'BHTCS - استراتيجيات التسويق والأعمال الاحترافية': 'BHTCS - Professional marketing and business strategies',
        'برمجة بايثون': 'Python Programming',
        'دورة أساسية في برمجة وتطوير بايثون': 'Foundation course in Python programming and development',
        
        // Contact Section
        'تواصل معي': 'Contact Me',
        'أنا متاح دائماً للمشاريع الجديدة والفرص المثيرة': "I'm always available for exciting projects and opportunities",
        'ابقَ على تواصل': 'Get In Touch',
        'إذا كنت تبحث عن مطور بايثون متفاني لمشروعك أو لديك أي استفسارات، لا تتردد في الاتصال بي من خلال أي من القنوات التالية:': 'If you\'re looking for a dedicated Python developer for your project or have any inquiries, feel free to contact me through any of the following channels:',
        'الموقع': 'Location',
        'اسمك': 'Your Name',
        'بريدك الإلكتروني': 'Your Email',
        'الموضوع': 'Subject',
        'الرسالة': 'Message',
        'إرسال الرسالة': 'Send Message',
        'ابقَ على اتصال': 'Stay Connected',
        'جميع الحقوق محفوظة.': 'All rights reserved.',
    };
    
    updatePageContent(translations);
    
    // Reset Typed.js strings for English
    if (window.typed) {
        window.typed.destroy();
    }
    window.typed = new Typed('.typing-effect', {
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
}

function updatePageContent(translations) {
    // Function to recursively get text content ignoring child elements
    function getDirectText(element) {
        let text = '';
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
            }
        }
        return text.trim();
    }
    
    // Update all text nodes with proper handling
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span:not(.typing-effect), a, button, label, .detail-label, .detail-value, .info-title, .info-text');
    
    elements.forEach(element => {
        // Skip typing effect element
        if (element.classList.contains('typing-effect')) return;
        
        // For elements with only text (no child elements)
        if (element.children.length === 0) {
            const text = element.textContent.trim();
            if (text && translations[text]) {
                element.textContent = translations[text];
            }
        } else {
            // For elements with mixed content (text + elements)
            const directText = getDirectText(element);
            if (directText && translations[directText]) {
                // Replace only the direct text node
                for (let node of element.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.textContent = translations[directText];
                        break;
                    }
                }
            }
        }
        
        // Handle placeholders for inputs and textareas
        if (element.placeholder && translations[element.placeholder]) {
            element.placeholder = translations[element.placeholder];
        }
        
        // Handle aria-labels
        if (element.hasAttribute('aria-label') && translations[element.getAttribute('aria-label')]) {
            element.setAttribute('aria-label', translations[element.getAttribute('aria-label')]);
        }
    });
}