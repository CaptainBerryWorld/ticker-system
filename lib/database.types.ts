export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type TicketType =
  | 'PRINTER'
  | 'LAPTOP'
  | 'DESKTOP'
  | 'NETWORK'
  | 'INTERNET'
  | 'OFFICE SUITE'
  | 'EMAIL PASSWORD RESET'
  | 'PHONE APP INSTALLATIONS'

export interface Database {
  public: {
    Tables: {
      tickets: {
        Row: {
          id: string
          created_at: string
          date: string
          staff_name: string
          department: string
          position: string
          email: string
          ticket_type: TicketType
          description: string
          location: string
          is_resolved: boolean
          needs_escalation: boolean
          solution: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          staff_name: string
          department: string
          position: string
          email: string
          ticket_type: TicketType
          description: string
          location: string
          is_resolved?: boolean
          needs_escalation?: boolean
          solution?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          date?: string
          staff_name?: string
          department?: string
          position?: string
          email?: string
          ticket_type?: TicketType
          description?: string
          location?: string
          is_resolved?: boolean
          needs_escalation?: boolean
          solution?: string | null
          updated_at?: string
        }
      }
    }
  }
}

export type Ticket = Database['public']['Tables']['tickets']['Row']
export type NewTicket = Database['public']['Tables']['tickets']['Insert']
export type UpdateTicket = Database['public']['Tables']['tickets']['Update']
