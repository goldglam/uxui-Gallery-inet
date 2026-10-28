import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, User, Mail, Calendar, Briefcase } from 'lucide-react';
import { RequestFormData } from '../types';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectTitle?: string;
}

export const RequestModal: React.FC<RequestModalProps> = ({ 
  isOpen, 
  onClose,
  initialProjectTitle = ''
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RequestFormData>({
    projectName: initialProjectTitle,
    requesterName: '',
    requesterEmail: '',
    department: 'Software Engineering',
    projectType: 'Web Application',
    timeline: '1-2 months',
    brief: '',
  });

  // Sync initialProjectTitle whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        projectName: initialProjectTitle || prev.projectName
      }));
    }
  }, [isOpen, initialProjectTitle]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in text-left overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#131C2B] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close request modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-[#3BE29F]/20 text-[#059669] dark:text-[#3BE29F] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#202A45] dark:text-white">
              Request Submitted!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
              ขอบคุณครับคุณ <b className="text-emerald-600 dark:text-[#3BE29F]">{formData.requesterName || 'เพื่อนร่วมงาน'}</b> ทีม INET UX/UI Design Center ได้รับคำขอโครงการ <b className="text-slate-900 dark:text-white">{formData.projectName}</b> เรียบร้อยแล้ว และจะติดต่อกลับทาง <b className="text-slate-800 dark:text-slate-200">{formData.requesterEmail}</b> ภายใน 24 ชั่วโมง
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#3BE29F]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                INET UX/UI Consultation
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-[#202A45] dark:text-white mb-2">
              Request UX/UI Design Support
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              ส่งรายละเอียดโครงการของคุณ เพื่อให้ทีม UX/UI เข้ามาร่วมวางโครงสร้าง ออกแบบ Wireframe และสร้าง Design System มาตรฐาน
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Title */}
              <div>
                <label htmlFor="req-project-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  id="req-project-name"
                  name="projectName"
                  required
                  type="text"
                  placeholder="e.g. NextGen Cloud Portal, AI Assistant"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                />
              </div>

              {/* Requester Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-requester-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <User size={13} className="text-[#3BE29F]" />
                    <span>Requester Name *</span>
                  </label>
                  <input
                    id="req-requester-name"
                    name="requesterName"
                    required
                    type="text"
                    placeholder="ชื่อ-นามสกุล ผู้ขอรับบริการ"
                    value={formData.requesterName}
                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                  />
                </div>

                <div>
                  <label htmlFor="req-requester-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Mail size={13} className="text-[#3BE29F]" />
                    <span>Corporate Email *</span>
                  </label>
                  <input
                    id="req-requester-email"
                    name="requesterEmail"
                    required
                    type="email"
                    placeholder="user@inet.co.th"
                    value={formData.requesterEmail}
                    onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                  />
                </div>
              </div>

              {/* Department & Platform Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-department" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Department
                  </label>
                  <select
                    id="req-department"
                    name="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                  >
                    <option>Software Engineering</option>
                    <option>Product & Business</option>
                    <option>Data & AI Analytics</option>
                    <option>Cloud Infrastructure</option>
                    <option>Marketing & Sales</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="req-project-type" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Platform Type
                  </label>
                  <select
                    id="req-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                  >
                    <option>Web Application</option>
                    <option>Mobile App (iOS/Android)</option>
                    <option>Admin Dashboard</option>
                    <option>Design System & Tokens</option>
                    <option>UX/UI Audit & Redesign</option>
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="req-timeline" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <Calendar size={13} className="text-[#3BE29F]" />
                  <span>Target Launch / Desired Timeline</span>
                </label>
                <select
                  id="req-timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                >
                  <option>Urgent (&lt; 2 weeks)</option>
                  <option>1-2 months</option>
                  <option>3-4 months</option>
                  <option>Next Quarter</option>
                </select>
              </div>

              {/* Brief */}
              <div>
                <label htmlFor="req-brief" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Brief Requirements & Goal *
                </label>
                <textarea
                  id="req-brief"
                  name="brief"
                  required
                  rows={3}
                  placeholder="อธิบายกลุ่มผู้ใช้งาน ฟีเจอร์หลัก หรือปัญหาที่ต้องการให้ช่วยออกแบบ..."
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#3BE29F] hover:bg-[#34c98d] text-[#0B111B] font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>Submit Request to UX/UI Team</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
