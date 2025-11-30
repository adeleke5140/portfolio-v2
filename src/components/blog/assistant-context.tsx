'use client'

import { atom } from 'jotai'
export const isMaximizedAtom = atom(false)
export const isSidebarOpenAtom = atom(false)
export const isPopoverOpenAtom = atom(false)
export const chatModeAtom = atom<'floating' | 'sidebar'>('floating')
