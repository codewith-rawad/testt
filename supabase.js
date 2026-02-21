// ============================================
// FILE: supabase.js
// ============================================

// --- إعدادات Supabase ---
window.SUPABASE_URL = 'https://qrznwrvfjacoepegjpov.supabase.co'
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyem53cnZmamFjb2VwZWdqcG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzgyMDQsImV4cCI6MjA4NzAxNDIwNH0.IR2axMtfUHV2784lNlTvQ-dPoDfAC2xTn5kz5qii_u0'

// إنشاء عميل Supabase وتعيينه في window (بعد التأكد من تحميل المكتبة)
if (typeof window.supabase !== 'undefined') {
    window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
} else {
    console.error('Supabase-Bibliothek nicht geladen. Bitte Supabase-Skript vor supabase.js laden.');
    window.supabaseClient = null;
}

// --- روابط ملفات الأسئلة (مرتبة ومنسقة) ---
window.QUESTIONS_FILES = {
    // المجاني
    lesen1: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen1.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuMS5qc29uIiwiaWF0IjoxNzcxNjI2NzYzLCJleHAiOjE4MDMxNjI3NjN9.WglJLV-TtydEsIOeGSy4fWfP-Hi16rk12Pv22I4Csmk',
    // المدفوعة - Lesen
    lesen2: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/Lesen2.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL0xlc2VuMi5qc29uIiwiaWF0IjoxNzcxNjI2NjY1LCJleHAiOjE4MDMxNjI2NjV9.U6MUwW-AIP6iG7z1_2nmIxmUSX-W1JUtxkNZCYYFxSw',
    lesen3: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen3.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuMy5qc29uIiwiaWF0IjoxNzcxNjc0ODU5LCJleHAiOjE4MDMyMTA4NTl9.uo94DqIWKoj1uB1CMtsiywf-Fp0HBAWYln7vOYignpk',
    lesen4: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen4.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuNC5qc29uIiwiaWF0IjoxNzcxNjI2NzIwLCJleHAiOjE4MDMxNjI3MjB9.BHQO3U1MOrNVmx6gQ2aOcgNeKMv12BmI_7Lqh2S2Osk',
    lesen5: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen5.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuNS5qc29uIiwiaWF0IjoxNzcxNjI2NzMwLCJleHAiOjE4MDMxNjI3MzB9.WJBDLqjzvlOXTHhqcvCw93oc4YG-AokMlQW250t0964',
    // المدفوعة - Hören
    horen1: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen1.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuMS5qc29uIiwiaWF0IjoxNzcxNjgxODczLCJleHAiOjE4MDMyMTc4NzN9.Az9KCBzquURS8bkb5eM9DkV-WR8hEmtXEeJ4NelWriY',
    horen2: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen2.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuMi5qc29uIiwiaWF0IjoxNzcxNjI2NTc5LCJleHAiOjE4MDMxNjI1Nzl9.2Crxe5kFHYKYgIBAc8FSrYoYYSUgGcFyh06tLXwDkpE',
    horen3: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen3.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuMy5qc29uIiwiaWF0IjoxNzcxNjI2NjMzLCJleHAiOjE4MDMxNjI2MzN9.B8qFtWS-g96JxFae-Iqcepo4YUxLlITAX6_BThsWUJg',
    horen4: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen4.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuNC5qc29uIiwiaWF0IjoxNzcxNjI2NjQ5LCJleHAiOjE4MDMxNjI2NDl9.7oBS6Ng3sKMC8ce2I50vjrx1bXWwQKwEa5Tjb0z1FUs'
};

// --- دوال التعامل مع الأسئلة ---

// دالة ذكية لتحميل ملف JSON بناءً على اسمه (lesen1, horen2, ...)
window.loadQuestionsFile = async function(fileKey) {
    const url = window.QUESTIONS_FILES[fileKey];
    if (!url) {
        console.error(`❌ لا يوجد ملف للمفتاح: ${fileKey}`);
        return null;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`فشل التحميل: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`❌ خطأ في تحميل ${fileKey}:`, error);
        return null;
    }
};

// --- دوال تسجيل الدخول والجهاز (كما طلبت سابقاً) ---

window.getDeviceId = function() {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
};

window.loginUser = async function(username, password) {
    try {
        if (!window.supabaseClient) {
            return { success: false, message: 'System nicht geladen. Bitte Seite neu laden.' };
        }
        const deviceId = window.getDeviceId();
        const { data: user, error } = await window.supabaseClient
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error || !user) {
            return { success: false, message: 'اسم المستخدم أو كلمة السر خطأ' };
        }

        if (user.device_id && user.device_id !== deviceId) {
            return { success: false, message: 'هذا الحساب مستخدم على جهاز آخر!' };
        }

        if (!user.device_id) {
            await window.supabaseClient
                .from('users')
                .update({ device_id: deviceId, last_login: new Date() })
                .eq('id', user.id);
        } else {
            await window.supabaseClient
                .from('users')
                .update({ last_login: new Date() })
                .eq('id', user.id);
        }

        sessionStorage.setItem('logged_in', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('user_device', deviceId); // تخزين الجهاز للاستخدام

        return { success: true, user: { username: user.username, id: user.id } };

    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'حدث خطأ في الاتصال بالسيرفر' };
    }
};

window.checkSession = function() {
    return sessionStorage.getItem('logged_in') === 'true';
};

window.logout = function() {
    sessionStorage.clear();
    window.location.href = 'index.html';
};

window.getCurrentUsername = function() {
    return sessionStorage.getItem('username') || 'Gast';
};