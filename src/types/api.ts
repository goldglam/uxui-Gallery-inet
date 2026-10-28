import { UserRole, ProjectStatus, TicketType, TicketStatus, TicketPriority } from '@prisma/client';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatarUrl?: string;
}

export interface CreateProjectDTO {
  slug: string;
  title: string;
  category: string;
  platform: string;
  duration?: string;
  type?: string;
  client?: string;
  context: string;
  dosDonts?: {
    dos: string[];
    donts: string[];
  };
  figmaUrl: string;
  coverImageUrl: string;
  screens: {
    title: string;
    description?: string;
    image: string;
    type: 'register' | 'dashboard' | 'landing' | 'admin' | 'mobile';
  }[];
  designTokens: {
    typography: string;
    primaryColor: { name: string; hex: string };
    secondaryColors: { name: string; hex: string }[];
  };
  tags?: string[];
}

export interface CreateTicketDTO {
  type: TicketType;
  title: string;
  description: string;
  department: string;
  priority?: TicketPriority;
  dueDate?: string;
  referenceProjectId?: string;
}

export interface UpdateTicketStatusDTO {
  status: TicketStatus;
  comment?: string;
}

export interface WebhookNotificationPayload {
  event: 'ticket.created' | 'ticket.assigned' | 'ticket.status_changed';
  ticket: {
    id: string;
    ticketNo: string;
    title: string;
    type: string;
    requesterName: string;
    department: string;
    priority: string;
    status: string;
    url: string;
  };
}
