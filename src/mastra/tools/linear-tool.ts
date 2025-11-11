import { createTool } from '@mastra/core'
import { LinearClient } from '@linear/sdk'
import { z } from 'zod'

// Initialize Linear client (will use LINEAR_API_KEY from environment)
const getLinearClient = () => {
  const apiKey = process.env.LINEAR_API_KEY
  if (!apiKey) {
    throw new Error('LINEAR_API_KEY environment variable is required')
  }
  return new LinearClient({ apiKey })
}

export const getMyIssues = createTool({
  id: 'linear-get-my-issues',
  description: 'Get the current user\'s assigned Linear issues/tickets',
  inputSchema: z.object({
    limit: z.number().optional().default(20).describe('Maximum number of issues to retrieve'),
    includeCompleted: z.boolean().optional().default(false).describe('Include completed issues'),
  }),
  outputSchema: z.object({
    issues: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        state: z.string(),
        priority: z.number(),
        priorityLabel: z.string(),
        assignee: z.string().optional(),
        createdAt: z.string(),
        updatedAt: z.string(),
        url: z.string(),
      })
    ),
    totalIssues: z.number(),
  }),
  execute: async ({ context, input }) => {
    try {
      const linear = getLinearClient()
      
      // Get the current user
      const viewer = await linear.viewer
      
      // Get issues assigned to the current user
      const issues = await linear.issues({
        filter: {
          assignee: { id: { eq: viewer.id } },
          ...(input.includeCompleted ? {} : { 
            state: { type: { nin: ['completed', 'canceled'] } } 
          }),
        },
        first: input.limit,
        orderBy: 'updatedAt',
      })

      const issueNodes = issues.nodes || []

      const formattedIssues = await Promise.all(
        issueNodes.map(async (issue) => {
          const state = await issue.state
          const assignee = await issue.assignee
          
          // Map priority number to label
          const priorityLabels: { [key: number]: string } = {
            0: 'No Priority',
            1: 'Urgent',
            2: 'High',
            3: 'Medium',
            4: 'Low',
          }

          return {
            id: issue.id,
            title: issue.title,
            description: issue.description || undefined,
            state: state?.name || 'Unknown',
            priority: issue.priority,
            priorityLabel: priorityLabels[issue.priority] || 'Unknown',
            assignee: assignee?.name,
            createdAt: issue.createdAt.toISOString(),
            updatedAt: issue.updatedAt.toISOString(),
            url: issue.url,
          }
        })
      )

      return {
        issues: formattedIssues,
        totalIssues: formattedIssues.length,
      }
    } catch (error) {
      console.error('Error fetching Linear issues:', error)
      throw new Error(
        `Failed to fetch issues: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  },
})

export const createLinearIssueTool = createTool({
  id: 'linear-create-issue',
  description: 'Create a new Linear issue/ticket',
  inputSchema: z.object({
    title: z.string().describe('The title of the issue'),
    description: z.string().optional().describe('The description of the issue'),
    teamId: z.string().optional().describe('The team ID to create the issue in'),
    priority: z.number().min(0).max(4).optional().default(3).describe('Priority: 0=None, 1=Urgent, 2=High, 3=Medium, 4=Low'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    issueId: z.string().optional(),
    url: z.string().optional(),
  }),
  execute: async ({ context, input }) => {
    try {
      const linear = getLinearClient()
      
      // If no team ID provided, get the first team
      let teamId = input.teamId
      if (!teamId) {
        const teams = await linear.teams()
        const firstTeam = teams.nodes[0]
        if (!firstTeam) {
          throw new Error('No teams found in Linear workspace')
        }
        teamId = firstTeam.id
      }

      const issuePayload = await linear.createIssue({
        title: input.title,
        description: input.description,
        teamId,
        priority: input.priority,
      })

      const issue = await issuePayload.issue

      return {
        success: !!issue,
        issueId: issue?.id,
        url: issue?.url,
      }
    } catch (error) {
      console.error('Error creating Linear issue:', error)
      throw new Error(
        `Failed to create issue: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  },
})
