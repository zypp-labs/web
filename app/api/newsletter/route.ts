// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email: email.toLowerCase().trim(),
          source: 'blog',
          ip_address: ip,
          user_agent: userAgent
        }
      ])
      .select()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}