export type PersonaType =
  | "ALL"
  | "BOARD" // Ban Giám hiệu
  | "HOMEROOM_TEACHER" // Giáo viên chủ nhiệm
  | "SUBJECT_TEACHER" // Giáo viên bộ môn
  | "ADMIN_STAFF" // Nhân viên hành chính
  | "STUDENT" // Học sinh
  | "PARENT"; // Phụ huynh

export interface PersonaInfo {
  id: PersonaType;
  title: string;
  shortTitle: string;
  roleDescription: string;
  badgeColor: string;
  iconName: string;
  focusAreas: string[];
}

export interface AdvisorMessage {
  id: string;
  sender: "user" | "ai" | "system";
  timestamp: string;
  personaContext?: PersonaType;
  rawText: string;
  parsedSections?: {
    contextRecognition?: string;
    strategicSolution?: string;
    actionableSteps?: string[];
    securityNote?: string;
    visualSuggestion?: string;
  };
  mode?: "online-gemini" | "offline-fallback";
}

export interface StudentProfile {
  id: string;
  studentCode: string;
  fullName: string;
  className: string;
  avatar: string;
  dob: string;
  gender: "Nam" | "Nữ";
  parentName: string;
  parentPhone: string;
  gpa: number;
  conduct: "Tốt" | "Khá" | "Trung bình";
  attendanceRate: number;
  sentimentRisk: "Thấp" | "Trung bình" | "Cao";
  sentimentNotes: string;
  skills: {
    logic: number;
    creativity: number;
    collaboration: number;
    autonomy: number;
    communication: number;
    digital: number;
  };
  blockchainPassports: BlockchainCredential[];
}

export interface BlockchainCredential {
  id: string;
  title: string;
  issuedDate: string;
  issuer: string;
  category: "Học thuật" | "STEM & Sáng tạo" | "Kỹ năng mềm" | "Thể thao & Nghệ thuật";
  scoreOrGrade: string;
  txHash: string;
  blockNumber: number;
  merkleRoot: string;
  status: "Verified" | "Immutable";
}

export interface TimetableSlot {
  id: string;
  day: "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7";
  period: 1 | 2 | 3 | 4 | 5;
  subject: string;
  teacher: string;
  room: string;
  className: string;
  hasConflict?: boolean;
  conflictReason?: string;
}

export interface FacilityAsset {
  id: string;
  name: string;
  category: "Phòng Lab STEM" | "Phòng Máy tính" | "Hội trường" | "Sân Thể thao" | "Phòng Học thông minh";
  capacity: number;
  utilizationRate: number;
  status: "Đang sử dụng" | "Trống" | "Bảo trì";
  currentBooking?: string;
  smartSensors: {
    temperature: number;
    powerConsumptionKwh: number;
    airQualityAqi: number;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  uniqueId: string;
  mfaVerified: boolean;
  ipAddress: string;
  sha256Hash: string;
  status: "Success" | "Alert" | "Blocked";
}

export interface DataConflictItem {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  excelField: string;
  sqlField: string;
  nationalDbField: string;
  status: "Chưa xử lý" | "Đã đồng bộ" | "Cần duyệt e-Signature";
  suggestedResolution: string;
}

export interface BusTrackingInfo {
  busId: string;
  licensePlate: string;
  driverName: string;
  driverPhone: string;
  route: string;
  speedKmH: number;
  currentStop: string;
  nextStop: string;
  etaMinutes: number;
  studentsOnBoard: number;
  capacity: number;
  status: "Đang di chuyển" | "Đã đến trường" | "Hoàn thành";
  coords: { x: number; y: number };
}

export interface EWalletTransaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "Học phí" | "Bữa ăn bán trú" | "Bảo hiểm y tế" | "Dã ngoại STEM";
  status: "Đã thanh toán" | "Chờ thanh toán" | "Hoàn tất qua QR";
  receiptHash: string;
}

export interface ESignatureRequest {
  id: string;
  title: string;
  type: "Đơn xin nghỉ phép" | "Đăng ký ngoại khóa" | "Sổ liên lạc học kỳ" | "Biên bản phúc khảo";
  studentName: string;
  className: string;
  createdDate: string;
  status: "Chờ ký" | "Đã ký số" | "Từ chối";
  signedBy?: string;
  signedTimestamp?: string;
  digitalCertificateId?: string;
}

export interface OnlineClass {
  id: string;
  classCode: string;
  className: string;
  subject: string;
  teacherName: string;
  schedule: string;
  meetingUrl: string;
  studentCount: number;
  status: "LIVE" | "UPCOMING" | "ENDED";
  notes?: string;
  lastUpdated?: string;
}

export interface GoogleSheetConfig {
  sheetUrl: string;
  sheetId: string;
  gid: string;
  lastSyncedAt?: string;
  isAutoSyncEnabled: boolean;
  status: "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "ERROR";
  errorMessage?: string;
}

