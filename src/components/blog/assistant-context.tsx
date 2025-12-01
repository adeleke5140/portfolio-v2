'use client'

import { atom } from 'jotai'
export const assistantStateAtom = atom(false)
export const chatModeAtom = atom<'floating' | 'sidebar'>('floating')
