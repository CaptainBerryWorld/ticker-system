'use server'

import { supabase } from '@/lib/supabase'
import { NewTicket, UpdateTicket } from '@/lib/database.types'
import { revalidatePath } from 'next/cache'

export async function createTicket(data: NewTicket) {
  try {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert(data)
      .select()
      .single()

    if (error) {
      console.error('Error creating ticket:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin')
    return { success: true, data: ticket }
  } catch (error) {
    console.error('Error creating ticket:', error)
    return { success: false, error: 'Failed to create ticket' }
  }
}

export async function getTickets() {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tickets:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return { success: false, error: 'Failed to fetch tickets' }
  }
}

export async function updateTicket(id: string, data: UpdateTicket) {
  try {
    const updateData = { ...data, updated_at: new Date().toISOString() }
    const { data: ticket, error } = await supabase
      .from('tickets')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating ticket:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin')
    return { success: true, data: ticket }
  } catch (error) {
    console.error('Error updating ticket:', error)
    return { success: false, error: 'Failed to update ticket' }
  }
}

export async function deleteTicket(id: string) {
  try {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting ticket:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error deleting ticket:', error)
    return { success: false, error: 'Failed to delete ticket' }
  }
}
