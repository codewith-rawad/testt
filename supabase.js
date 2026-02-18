// supabase.js
const SUPABASE_URL = 'https://qrznwrvfjacoepegjpov.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyem53cnZmamFjb2VwZWdqcG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzgyMDQsImV4cCI6MjA4NzAxNDIwNH0.IR2axMtfUHV2784lNlTvQ-dPoDfAC2xTn5kz5qii_u0'

// إنشاء عميل Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// رابط ملف الأسئلة
const QUESTIONS_URL = 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/questions.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL3F1ZXN0aW9ucy5qc29uIiwiaWF0IjoxNzcxNDQzNjAyLCJleHAiOjE4MDI5Nzk2MDJ9.1pZMFb0cyCRlmbe5tSELO7535FrOuzmMKT-6CNcZBHs'

// دالة جلب الأسئلة من الرابط
async function fetchQuestions() {
    try {
        const response = await fetch(QUESTIONS_URL)
        if (!response.ok) throw new Error('فشل في تحميل الأسئلة')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('خطأ في جلب الأسئلة:', error)
        return []
    }
}

// دالة التحقق من المستخدم والجهاز
async function loginUser(username, password) {
    try {
        const deviceId = getDeviceId()
        
        // البحث عن المستخدم في Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single()
        
        if (error || !user) {
            return { 
                success: false, 
                message: 'اسم المستخدم أو كلمة السر خطأ' 
            }
        }
        
        // التحقق من الجهاز
        if (user.device_id && user.device_id !== deviceId) {
            return { 
                success: false, 
                message: 'هذا الحساب مستخدم على جهاز آخر! لا يمكن الدخول من جهازين.' 
            }
        }
        
        // إذا كان أول مرة يسجل دخول من هذا الجهاز
        if (!user.device_id) {
            const { error: updateError } = await supabase
                .from('users')
                .update({ 
                    device_id: deviceId,
                    last_login: new Date()
                })
                .eq('id', user.id)
            
            if (updateError) throw updateError
        } else {
            // تحديث وقت آخر دخول
            await supabase
                .from('users')
                .update({ last_login: new Date() })
                .eq('id', user.id)
        }
        
        // حفظ معلومات الجلسة
        sessionStorage.setItem('logged_in', 'true')
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('user_id', user.id)
        
        return { 
            success: true, 
            user: {
                username: user.username,
                id: user.id
            }
        }
        
    } catch (error) {
        console.error('Login error:', error)
        return { 
            success: false, 
            message: 'حدث خطأ في الاتصال بالسيرفر' 
        }
    }
}

// دالة معرف الجهاز
function getDeviceId() {
    let deviceId = localStorage.getItem('device_id')
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
        localStorage.setItem('device_id', deviceId)
    }
    return deviceId
}

// دالة التحقق من الجلسة
function checkSession() {
    return sessionStorage.getItem('logged_in') === 'true'
}

// دالة تسجيل الخروج
function logout() {
    sessionStorage.clear()
    window.location.reload()
}

// دالة جلب اسم المستخدم الحالي
function getCurrentUsername() {
    return sessionStorage.getItem('username') || 'Gast'
}

// دالة تسجيل مستخدم جديد (للمسؤول فقط)
async function addNewUser(username, password) {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
                { 
                    username: username, 
                    password: password,
                    device_id: null
                }
            ])
            .select()
        
        if (error) throw error
        return { success: true, user: data[0] }
    } catch (error) {
        console.error('Error adding user:', error)
        return { success: false, message: error.message }
    }
}