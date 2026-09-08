import type { ImageMetadata } from 'astro';

import anestDashboard from './anest-dashboard.webp';
import gsbMakerApprover from './gsb-maker-approver.svg';

/**
 * ทะเบียนรูปของโปรเจกต์
 *
 * ไฟล์ i18n เก็บแค่ "คีย์" ของรูป ไม่ใช่ path จริง เพื่อให้เนื้อหายังอยู่ใน JSON ทั้งหมด
 * ส่วนตัวไฟล์ถูก import เข้ามาที่นี่ Astro จึงปรับขนาด/สร้าง srcset ให้อัตโนมัติ
 */
export const projectImages: Record<string, ImageMetadata> = {
  'anest-dashboard': anestDashboard,
  'gsb-maker-approver': gsbMakerApprover,
};
