'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Loader2, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Pixel art icons
const PixelSlack = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Slack-style hash pattern */}
    <rect x="4" y="12" width="6" height="8" fill="currentColor"/>
    <rect x="14" y="4" width="6" height="10" fill="currentColor"/>
    <rect x="14" y="18" width="6" height="10" fill="currentColor"/>
    <rect x="24" y="12" width="6" height="8" fill="currentColor"/>
  </svg>
)

const PixelLinear = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Linear-style grid/graph */}
    <rect x="6" y="22" width="4" height="6" fill="currentColor"/>
    <rect x="12" y="16" width="4" height="12" fill="currentColor"/>
    <rect x="18" y="10" width="4" height="18" fill="currentColor"/>
    <rect x="24" y="4" width="4" height="24" fill="currentColor"/>
  </svg>
)

interface ConnectionStatus {
  name: string
  status: 'connected' | 'disconnected' | 'checking'
  message: string
  icon: typeof PixelSlack
  color: string
}

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<ConnectionStatus[]>([
    {
      name: 'SLACK',
      status: 'checking',
      message: 'Checking connection...',
      icon: PixelSlack,
      color: '#E01E5A',
    },
    {
      name: 'LINEAR',
      status: 'checking',
      message: 'Checking connection...',
      icon: PixelLinear,
      color: '#5E6AD2',
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkConnections = async () => {
    setIsRefreshing(true)
    
    try {
      const response = await fetch('/api/alfred/status')
      const data = await response.json()

      setConnections([
        {
          name: 'SLACK',
          status: data.slack?.connected ? 'connected' : 'disconnected',
          message: data.slack?.message || 'Unknown status',
          icon: PixelSlack,
          color: '#E01E5A',
        },
        {
          name: 'LINEAR',
          status: data.linear?.connected ? 'connected' : 'disconnected',
          message: data.linear?.message || 'Unknown status',
          icon: PixelLinear,
          color: '#5E6AD2',
        },
      ])
    } catch (error) {
      setConnections(prev => prev.map(conn => ({
        ...conn,
        status: 'disconnected' as const,
        message: 'Failed to check connection',
      })))
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    checkConnections()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />
      case 'disconnected':
        return <XCircle className="w-6 h-6 text-red-500" />
      case 'checking':
        return <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'CONNECTED'
      case 'disconnected':
        return 'DISCONNECTED'
      case 'checking':
        return 'CHECKING...'
      default:
        return 'UNKNOWN'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500'
      case 'disconnected':
        return 'bg-red-500'
      case 'checking':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a]" style={{ imageRendering: 'pixelated' }}>
      {/* Header */}
      <header className="border-b-4 border-black dark:border-white bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/alfred"
                className="w-10 h-10 bg-[#6B46C1] text-white flex items-center justify-center border-2 border-black dark:border-white hover:bg-[#7C3AED] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-mono text-2xl font-bold text-black dark:text-white tracking-tight">
                  CONNECTIONS
                </h1>
                <p className="font-mono text-xs text-gray-600 dark:text-gray-400 tracking-wide">
                  INTEGRATION STATUS
                </p>
              </div>
            </div>
            <button
              onClick={checkConnections}
              disabled={isRefreshing}
              className="px-4 py-2 bg-[#6B46C1] border-4 border-black dark:border-white text-white font-mono font-bold hover:bg-[#7C3AED] disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              REFRESH
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Connection Cards */}
          {connections.map((connection) => {
            const Icon = connection.icon
            return (
              <div
                key={connection.name}
                className="bg-white dark:bg-[#2a2a2a] border-4 border-black dark:border-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-16 h-16 flex items-center justify-center border-2 border-black dark:border-white"
                      style={{ 
                        backgroundColor: connection.color,
                        imageRendering: 'pixelated' 
                      }}
                    >
                      <Icon size={48} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-mono text-xl font-bold text-black dark:text-white">
                          {connection.name}
                        </h2>
                        <span
                          className={`px-3 py-1 ${getStatusColor(connection.status)} text-white font-mono text-xs font-bold border-2 border-black dark:border-white`}
                        >
                          {getStatusText(connection.status)}
                        </span>
                      </div>
                      <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                        {connection.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(connection.status)}
                  </div>
                </div>

                {/* Configuration Info */}
                <div className="mt-4 pt-4 border-t-2 border-gray-300 dark:border-gray-700">
                  <div className="font-mono text-xs space-y-1 text-gray-600 dark:text-gray-400">
                    {connection.name === 'SLACK' && (
                      <>
                        <div>&gt; TOKEN: {process.env.NEXT_PUBLIC_SLACK_CONFIGURED ? '✓ CONFIGURED' : '✗ NOT SET'}</div>
                        <div>&gt; TRANSPORT: STDIO</div>
                        <div>&gt; TOOLS: conversations_history, conversations_search, channels_list</div>
                      </>
                    )}
                    {connection.name === 'LINEAR' && (
                      <>
                        <div>&gt; API KEY: {process.env.NEXT_PUBLIC_LINEAR_CONFIGURED ? '✓ CONFIGURED' : '✗ NOT SET'}</div>
                        <div>&gt; TRANSPORT: SSE (REMOTE)</div>
                        <div>&gt; ENDPOINT: mcp.linear.app/sse</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {connection.status === 'disconnected' && (
                  <div className="mt-4">
                    <a
                      href={connection.name === 'SLACK' 
                        ? 'https://api.slack.com/apps' 
                        : 'https://linear.app/settings/api'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white font-mono font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      CONFIGURE {connection.name}
                    </a>
                  </div>
                )}
              </div>
            )
          })}

          {/* Help Section */}
          <div className="bg-white dark:bg-[#2a2a2a] border-4 border-black dark:border-white p-6">
            <h3 className="font-mono text-lg font-bold text-black dark:text-white mb-3">
              SETUP INSTRUCTIONS
            </h3>
            <div className="font-mono text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>&gt; 1. Add environment variables to .env.local:</p>
              <div className="ml-4 bg-gray-100 dark:bg-[#1a1a1a] p-3 border-2 border-gray-400 dark:border-gray-600 overflow-x-auto">
                <code className="text-xs">
                  SLACK_BOT_TOKEN=xoxb-your-token<br/>
                  LINEAR_API_KEY=lin_api_your-key<br/>
                  ANTHROPIC_API_KEY=sk-ant-your-key
                </code>
              </div>
              <p>&gt; 2. Restart the development server</p>
              <p>&gt; 3. Return to this page to verify connections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
