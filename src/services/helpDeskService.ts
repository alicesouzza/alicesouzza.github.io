import { supabase } from '@/lib/supabase'
import type { ApiResponse, HelpDeskTicket } from '@/types'

export const helpDeskService = {
  async getTickets(organizationId: string): Promise<ApiResponse<HelpDeskTicket[]>> {
    try {
      const { data, error } = await supabase
        .from('help_desk_tickets')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false })

      if (error) {
        return {
          success: false,
          error: {
            code: error.code || 'DB_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: data || [],
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async getTicket(ticketId: string): Promise<ApiResponse<HelpDeskTicket | null>> {
    try {
      const { data, error } = await supabase
        .from('help_desk_tickets')
        .select('*')
        .eq('id', ticketId)
        .single()

      if (error) {
        return {
          success: false,
          error: {
            code: error.code || 'DB_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async createTicket(
    organizationId: string,
    userId: string,
    data: {
      title: string
      description: string
      priority: 'low' | 'medium' | 'high'
    }
  ): Promise<ApiResponse<HelpDeskTicket>> {
    try {
      const { data: ticket, error } = await supabase
        .from('help_desk_tickets')
        .insert({
          organization_id: organizationId,
          user_id: userId,
          ...data,
          status: 'open',
        })
        .select()
        .single()

      if (error) {
        return {
          success: false,
          error: {
            code: error.code || 'DB_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: ticket,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async updateTicket(
    ticketId: string,
    updates: Partial<Omit<HelpDeskTicket, 'id' | 'created_at'>>
  ): Promise<ApiResponse<HelpDeskTicket>> {
    try {
      const { data: ticket, error } = await supabase
        .from('help_desk_tickets')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ticketId)
        .select()
        .single()

      if (error) {
        return {
          success: false,
          error: {
            code: error.code || 'DB_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: ticket,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async deleteTicket(ticketId: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('help_desk_tickets')
        .delete()
        .eq('id', ticketId)

      if (error) {
        return {
          success: false,
          error: {
            code: error.code || 'DB_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },
}
