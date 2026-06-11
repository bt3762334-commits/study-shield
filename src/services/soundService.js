// خدمة إدارة أصوات التنبيهات

export const soundService = {
  // إنشاء سياق الصوت
  audioContext: null,
  isEnabled: localStorage.getItem('soundEnabled') !== 'false',

  // تهيئة الخدمة
  init() {
    if (!this.audioContext) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
      } catch (e) {
        console.log('Web Audio API not supported');
      }
    }
  },

  // تفعيل/تعطيل الأصوات
  toggle() {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('soundEnabled', this.isEnabled);
    return this.isEnabled;
  },

  // تشغيل صوت نجاح
  playSuccess() {
    if (!this.isEnabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    // نغمة صاعدة
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
  },

  // تشغيل صوت تنبيه
  playNotification() {
    if (!this.isEnabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.5);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.5);
  },

  // تشغيل صوت Pomodoro
  playPomodoro() {
    if (!this.isEnabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;

    // نغمتان قصيرتان
    for (let i = 0; i < 2; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      const startTime = now + i * 0.2;
      osc.frequency.setValueAtTime(800, startTime);
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    }
  },

  // تشغيل صوت خطأ
  playError() {
    if (!this.isEnabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    // نغمة منخفضة
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
  },

  // تشغيل صوت إنجاز
  playAchievement() {
    if (!this.isEnabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;

    // ثلاث نغمات صاعدة
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      const startTime = now + index * 0.15;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }
};

// تهيئة الخدمة عند التحميل
soundService.init();
