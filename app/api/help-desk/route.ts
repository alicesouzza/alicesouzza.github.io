import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organization_id')

    if (!organizationId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'MISSING_PARAM', message: 'organization_id é obrigatório' },
        },
        { status: 400 }
      )
    }

    const { data: tickets, error } = await supabase
      .from('help_desk_tickets')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: { code: error.code, message: error.message },
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: tickets,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organization_id, user_id, title, description, priority } = body

    if (!organization_id || !user_id || !title || !description || !priority) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'MISSING_PARAMS', message: 'Parâmetros obrigatórios não fornecidos' },
        },
        { status: 400 }
      )
    }

    const { data: ticket, error } = await supabase
      .from('help_desk_tickets')
      .insert({
        organization_id,
        user_id,
        title,
        description,
        priority,
        status: 'open',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: { code: error.code, message: error.message },
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: ticket,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
      },
      { status: 500 }
    )
  }
}
