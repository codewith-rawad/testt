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
    lesen3: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen3.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuMy5qc29uIiwiaWF0IjoxNzcxNzkxNzQxLCJleHAiOjE4MDMzMjc3NDF9.Eox_hlAOeo-f2cIO-6lnhKpqND2byXaASU5IwmknooI',
    lesen4: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen4.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuNC5qc29uIiwiaWF0IjoxNzcxNzkxNzg0LCJleHAiOjE4MDMzMjc3ODR9.O3PBaFuqeV6cfFDiPNMnoT9R9ZCHxOegVA6u6h_NNtw',
    lesen5: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/lesen5.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2xlc2VuNS5qc29uIiwiaWF0IjoxNzcxNjI2NzMwLCJleHAiOjE4MDMxNjI3MzB9.WJBDLqjzvlOXTHhqcvCw93oc4YG-AokMlQW250t0964',
    // المدفوعة - Hören
    horen1: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen1.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuMS5qc29uIiwiaWF0IjoxNzcxNzg3NDc4LCJleHAiOjE4MDMzMjM0Nzh9.zKTcsYDbgLVZLg2WeV7gtBEuiG1llLNv-H6MpVt8Y64',
    horen2: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen2.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuMi5qc29uIiwiaWF0IjoxNzcxNzg3NTQ1LCJleHAiOjE4MDMzMjM1NDV9.r6jS0Qsd_A35UnV4CGHLQzdWKlq11Yn5dh72nUunKpc',
    horen3: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen3.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuMy5qc29uIiwiaWF0IjoxNzcxNzg3NTY5LCJleHAiOjE4MDMzMjM1Njl9.OrUPMu_o5mjXsu-jmb1mdz56ploqOqJ1KMHB7Uvpeqo',
    horen4: 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/horen4.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL2hvcmVuNC5qc29uIiwiaWF0IjoxNzcxNzg3NTkzLCJleHAiOjE4MDMzMjM1OTN9.NN1815rJkWRHxy00buRouACTwWRvQjwHbEDEGIxx0ts'
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