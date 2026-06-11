// خدمة إدارة المظهر الفاتح والداكن

export const themeService = {
  // الحصول على المظهر الحالي
  getCurrentTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // التحقق من تفضيل النظام
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  },

  // تعيين المظهر
  setTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // تحديث meta tags للألوان
    const themeColor = theme === 'dark' ? '#0b1120' : '#f5f7fa';
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = themeColor;
  },

  // تبديل المظهر
  toggleTheme() {
    const current = this.getCurrentTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  },

  // مراقبة تغييرات تفضيل النظام
  watchSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  // تهيئة المظهر
  init() {
    const theme = this.getCurrentTheme();
    this.setTheme(theme);
    this.watchSystemPreference();
  }
};

// تهيئة الخدمة عند التحميل
themeService.init();
