'use client'

import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
export const assistantStateAtom = atomWithStorage('assistantState', false)
export const chatModeAtom = atomWithStorage('chatMode', 'floating')
