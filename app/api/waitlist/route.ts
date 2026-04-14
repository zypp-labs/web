// app/api/waitlist/route.ts
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

    // Get client info for analytics
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: email.toLowerCase().trim(),
          source: 'website',
          ip_address: ip,
          user_agent: userAgent
        }
      ])
      .select()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'Email already exists in waitlist' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined waitlist!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get waitlist count (optional)
export async function GET() {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ error: 'Failed to get count' }, { status: 500 })
  }

  return NextResponse.json({ count })
}