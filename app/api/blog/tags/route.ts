// app/api/blog/tags/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: tags, error } = await supabase
      .from('blog_tags')
      .select('name')
      .order('name')

    if (error) throw error

    const tagNames = tags?.map(tag => tag.name) || []

    return NextResponse.json({ tags: tagNames })

  } catch (error) {
    console.error('Tags fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}