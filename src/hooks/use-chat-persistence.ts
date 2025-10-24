import { useEffect, useCallback } from 'react'

const STORAGE_KEY = 'kenny-chat-history'

export interface PersistedMessage {
  id: string
  role: 'user' | 'assistant'
  content?: string
  parts?: any[]
}

export function useChatPersistence() {
  // Load messages from localStorage
  const loadMessages = useCallback((): PersistedMessage[] => {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load chat history:', error)
    }
    return []
  }, [])

  // Save messages to localStorage
  const saveMessages = useCallback((messages: PersistedMessage[]) => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (error) {
      console.error('Failed to save chat history:', error)
    }
  }, [])

  // Clear chat history
  const clearMessages = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear chat history:', error)
    }
  }, [])

  return {
    loadMessages,
    saveMessages,
    clearMessages,
  }
}
