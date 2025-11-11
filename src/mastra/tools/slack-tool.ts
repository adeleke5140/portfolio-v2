import { createTool } from '@mastra/core'
import { WebClient } from '@slack/web-api'
import { z } from 'zod'

// Initialize Slack client (will use SLACK_TOKEN from environment)
const getSlackClient = () => {
  const token = process.env.SLACK_BOT_TOKEN || process.env.SLACK_TOKEN
  if (!token) {
    throw new Error('SLACK_BOT_TOKEN or SLACK_TOKEN environment variable is required')
  }
  return new WebClient(token)
}

export const getUnreadMessagesTool = createTool({
  id: 'slack-get-unread-messages',
  description: 'Get unread messages from Slack channels and direct messages',
  inputSchema: z.object({
    limit: z.number().optional().default(20).describe('Maximum number of unread messages to retrieve'),
  }),
  outputSchema: z.object({
    unreadMessages: z.array(
      z.object({
        channel: z.string(),
        channelName: z.string(),
        text: z.string(),
        user: z.string(),
        timestamp: z.string(),
      })
    ),
    totalUnread: z.number(),
  }),
  execute: async ({ context, input }) => {
    try {
      const slack = getSlackClient()
      const unreadMessages: any[] = []

      // Get list of conversations (channels, DMs, etc)
      const conversations = await slack.conversations.list({
        types: 'public_channel,private_channel,mpim,im',
        exclude_archived: true,
      })

      if (!conversations.channels) {
        return { unreadMessages: [], totalUnread: 0 }
      }

      // Check each conversation for unread messages
      for (const channel of conversations.channels.slice(0, input.limit)) {
        if (!channel.id) continue

        try {
          const info = await slack.conversations.info({ channel: channel.id })
          
          // Check if there are unread messages
          if (info.channel && info.channel.unread_count && info.channel.unread_count > 0) {
            // Get the latest messages
            const history = await slack.conversations.history({
              channel: channel.id,
              limit: info.channel.unread_count,
            })

            if (history.messages) {
              for (const message of history.messages) {
                unreadMessages.push({
                  channel: channel.id,
                  channelName: channel.name || 'Direct Message',
                  text: message.text || '',
                  user: message.user || 'Unknown',
                  timestamp: message.ts || '',
                })
              }
            }
          }
        } catch (error) {
          // Skip channels where we don't have permission
          console.error(`Error fetching messages for channel ${channel.id}:`, error)
          continue
        }
      }

      return {
        unreadMessages: unreadMessages.slice(0, input.limit),
        totalUnread: unreadMessages.length,
      }
    } catch (error) {
      console.error('Error fetching Slack unread messages:', error)
      throw new Error(
        `Failed to fetch unread messages: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  },
})

export const sendSlackMessageTool = createTool({
  id: 'slack-send-message',
  description: 'Send a message to a Slack channel or user',
  inputSchema: z.object({
    channel: z.string().describe('The channel ID or user ID to send the message to'),
    text: z.string().describe('The message text to send'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    timestamp: z.string().optional(),
  }),
  execute: async ({ context, input }) => {
    try {
      const slack = getSlackClient()
      
      const result = await slack.chat.postMessage({
        channel: input.channel,
        text: input.text,
      })

      return {
        success: result.ok || false,
        timestamp: result.ts,
      }
    } catch (error) {
      console.error('Error sending Slack message:', error)
      throw new Error(
        `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  },
})
