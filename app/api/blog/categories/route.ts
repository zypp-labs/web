// app/api/blog/categories/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get categories with post counts
    const { data: categories, error } = await supabase
      .from('blog_categories')
      .select(`
        id,
        name,
        slug,
        blog_posts!inner(id)
      `)
      .eq('blog_posts.is_published', true)
      .lte('blog_posts.published_at', new Date().toISOString())

    if (error) throw error

    // Transform to count posts per category
    const categoryCounts = categories?.reduce((acc, category) => {
      const slug = category.slug
      if (!acc[slug]) {
        acc[slug] = {
          id: slug,
          name: category.name,
          count: 0
        }
      }
      acc[slug].count += 1
      return acc
    }, {} as Record<string, { id: string; name: string; count: number }>)

    const allCount = Object.values(categoryCounts || {}).reduce((sum, cat) => sum + cat.count, 0)

    const result = [
      { id: 'all', name: 'All Posts', count: allCount },
      ...Object.values(categoryCounts || {})
    ]

    return NextResponse.json({ categories: result })

  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}