import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Project, RequestFormData } from '../types';
import { PROJECTS as fallbackProjects } from '../data/mockData';

export const projectService = {
  /**
   * ดึงรายการ Projects ทั้งหมด
   * หากต่อ Supabase จะดึงจากตาราง `projects`
   * หากไม่ได้ต่อหรือเกิดข้อผิดพลาด จะ fallback ใช้ mockData เพื่อให้เว็บยังใช้งานได้ 100%
   */
  async getProjects(): Promise<Project[]> {
    if (!isSupabaseConfigured || !supabase) {
      return fallbackProjects;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false });

      if (error || !data || data.length === 0) {
        console.warn('Supabase projects fetch warning (using fallback data):', error?.message);
        return fallbackProjects;
      }

      // Map Supabase snake_case/json to Project interface if needed
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        client: item.client || '',
        tagline: item.tagline || '',
        description: item.description || '',
        detailedDescription: item.detailed_description || item.description || '',
        category: item.category || 'General',
        platform: item.platform || 'Website',
        duration: item.duration || 'N/A',
        type: item.type || '',
        year: item.year || 2026,
        featured: Boolean(item.featured),
        coverImage: item.cover_image || item.cover_image_url || '',
        screens: item.screens || [],
        tokens: item.tokens || item.design_tokens || {
          typography: 'Sukhumvit Set',
          primaryColor: { name: 'Green Mint', hex: '#3BE29F' },
          secondaryColors: []
        },
        metrics: item.metrics || {
          likes: item.like_count || 0,
          views: item.view_count || 0,
          rating: 5.0
        },
        tags: item.tags || []
      }));
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
      return fallbackProjects;
    }
  },

  /**
   * บันทึกคำขอออกแบบใหม่ (Submit Request / Ticket)
   * เข้าตาราง `requests` ใน Supabase
   */
  async createRequest(form: RequestFormData): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      // Local simulated response
      return { success: true, id: `LOCAL-${Date.now()}` };
    }

    try {
      const ticketNo = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const { data, error } = await supabase
        .from('requests')
        .insert([
          {
            ticket_no: ticketNo,
            title: form.projectName || 'Design Request',
            description: form.brief || '',
            department: form.department || 'General',
            project_type: form.projectType || 'Web Application',
            timeline: form.timeline || '1-2 months',
            requester_name: form.requesterName,
            requester_email: form.requesterEmail,
            status: 'SUBMITTED'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: data.id };
    } catch (err: any) {
      console.error('Failed to submit request to Supabase:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * บันทึกการกดถูกใจ (Like / Favorite)
   */
  async toggleFavorite(projectId: string, isFav: boolean): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      if (isFav) {
        await supabase.rpc('increment_likes', { project_id: projectId });
      } else {
        await supabase.rpc('decrement_likes', { project_id: projectId });
      }
    } catch (err) {
      // Non-blocking
      console.debug('Favorite sync err:', err);
    }
  }
};
