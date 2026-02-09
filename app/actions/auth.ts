'use server'

import { cookies } from 'next/headers'

// Change this password in production!
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function login(password: string) {
  try {
    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      
      // Set auth cookie that expires in 24 hours
      cookieStore.set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })

      return { success: true }
    } else {
      return { success: false, error: 'Invalid password' }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Login failed' }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_auth')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'Logout failed' }
  }
}

export async function checkAuth() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')
    return { isAuthenticated: authCookie?.value === 'true' }
  } catch (error) {
    console.error('Auth check error:', error)
    return { isAuthenticated: false }
  }
}
