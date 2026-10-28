import { WebhookNotificationPayload } from '../types/api';

export class NotificationService {
  private static slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  private static teamsWebhookUrl = process.env.TEAMS_WEBHOOK_URL;

  /**
   * Dispatch notification to corporate Slack channel
   */
  public static async sendSlackAlert(payload: WebhookNotificationPayload): Promise<boolean> {
    if (!this.slackWebhookUrl) {
      console.warn('[NotificationService] SLACK_WEBHOOK_URL is not configured.');
      return false;
    }

    const { ticket } = payload;
    const body = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `🎨 [${ticket.ticketNo}] New UX/UI Request: ${ticket.title}`,
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Department:*\n${ticket.department}` },
            { type: 'mrkdwn', text: `*Requester:*\n${ticket.requesterName}` },
            { type: 'mrkdwn', text: `*Type:*\n${ticket.type}` },
            { type: 'mrkdwn', text: `*Priority:*\n${ticket.priority}` }
          ]
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Ticket in Gallery' },
              url: ticket.url,
              style: 'primary'
            }
          ]
        }
      ]
    };

    try {
      const res = await fetch(this.slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return res.ok;
    } catch (err) {
      console.error('[NotificationService] Failed to send Slack alert:', err);
      return false;
    }
  }

  /**
   * Dispatch notification to Microsoft Teams channel via Adaptive Card
   */
  public static async sendTeamsAlert(payload: WebhookNotificationPayload): Promise<boolean> {
    if (!this.teamsWebhookUrl) {
      console.warn('[NotificationService] TEAMS_WEBHOOK_URL is not configured.');
      return false;
    }

    const { ticket } = payload;
    const body = {
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.4',
            body: [
              {
                type: 'TextBlock',
                text: `🎨 UX/UI Request: ${ticket.ticketNo}`,
                weight: 'Bolder',
                size: 'Medium',
                color: 'Good'
              },
              {
                type: 'TextBlock',
                text: ticket.title,
                weight: 'Bolder',
                size: 'Large'
              },
              {
                type: 'FactSet',
                facts: [
                  { title: 'Requester:', value: ticket.requesterName },
                  { title: 'Department:', value: ticket.department },
                  { title: 'Status:', value: ticket.status },
                  { title: 'Priority:', value: ticket.priority }
                ]
              }
            ],
            actions: [
              {
                type: 'Action.OpenUrl',
                title: 'Open in UX/UI Gallery',
                url: ticket.url
              }
            ]
          }
        }
      ]
    };

    try {
      const res = await fetch(this.teamsWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return res.ok;
    } catch (err) {
      console.error('[NotificationService] Failed to send Teams alert:', err);
      return false;
    }
  }
}
