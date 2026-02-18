// supabase.js - لا تقم بتعريف أي شيء هنا باستخدام const أو let

// إنشاء عميل Supabase مباشرة على window
window.SUPABASE_URL = 'https://qrznwrvfjacoepegjpov.supabase.co'
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyem53cnZmamFjb2VwZWdqcG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzgyMDQsImV4cCI6MjA4NzAxNDIwNH0.IR2axMtfUHV2784lNlTvQ-dPoDfAC2xTn5kz5qii_u0'

// إنشاء عميل Supabase وتعيينه في window
window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY)

// رابط ملف الأسئلة
window.QUESTIONS_URL = 'https://qrznwrvfjacoepegjpov.supabase.co/storage/v1/object/sign/teil1lesen/questions.json?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83N2Q1N2Q3NC04MDA2LTRhZDctOTNlNS0yZmYyM2U2YmI1ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWlsMWxlc2VuL3F1ZXN0aW9ucy5qc29uIiwiaWF0IjoxNzcxNDQzNjAyLCJleHAiOjE4MDI5Nzk2MDJ9.1pZMFb0cyCRlmbe5tSELO7535FrOuzmMKT-6CNcZBHs'

// دوال Supabase - تعريفها على window
window.fetchQuestions = async function() {
    try {
        const response = await fetch(window.QUESTIONS_URL)
        if (!response.ok) throw new Error('فشل في تحميل الأسئلة')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('خطأ في جلب الأسئلة:', error)
        return []
    }
}

window.getDeviceId = function() {
    let deviceId = localStorage.getItem('device_id')
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
        localStorage.setItem('device_id', deviceId)
    }
    return deviceId
}

window.loginUser = async function(username, password) {
    try {
        const deviceId = window.getDeviceId()
        
        const { data: users, error } = await window.supabaseClient
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single()
        
        if (error || !users) {
            return { 
                success: false, 
                message: 'اسم المستخدم أو كلمة السر خطأ' 
            }
        }
        
        if (users.device_id && users.device_id !== deviceId) {
            return { 
                success: false, 
                message: 'هذا الحساب مستخدم على جهاز آخر! لا يمكن الدخول من جهازين.' 
            }
        }
        
        if (!users.device_id) {
            const { error: updateError } = await window.supabaseClient
                .from('users')
                .update({ 
                    device_id: deviceId,
                    last_login: new Date()
                })
                .eq('id', users.id)
            
            if (updateError) throw updateError
        } else {
            await window.supabaseClient
                .from('users')
                .update({ last_login: new Date() })
                .eq('id', users.id)
        }
        
        sessionStorage.setItem('logged_in', 'true')
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('user_id', users.id)
        
        return { 
            success: true, 
            users: {
                username: users.username,
                id: users.id
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

window.checkSession = function() {
    return sessionStorage.getItem('logged_in') === 'true'
}

window.logout = function() {
    sessionStorage.clear()
    window.location.reload()
}

window.getCurrentUsername = function() {
    return sessionStorage.getItem('username') || 'Gast'
}