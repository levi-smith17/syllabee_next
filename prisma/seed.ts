/**
 * Registration data seed — imports term lengths, terms, courses, and sections
 * from the legacy MySQL dump (registration.sql).
 *
 * Run with:  npx tsx prisma/seed.ts
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config({ path: ".env" });

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

// ── Term Lengths ──────────────────────────────────────────────────────────────

const TERM_LENGTHS = [
  { legacyId: 1, label: "16-Week Term", weeks: 16, canHaveMidpointBreak: true },
  { legacyId: 2, label: "8-Week Term",  weeks: 8,  canHaveMidpointBreak: false },
  { legacyId: 3, label: "4-Week Term",  weeks: 4,  canHaveMidpointBreak: false },
];

// ── Terms ─────────────────────────────────────────────────────────────────────

const TERMS = [
  { legacyId: 1,  code: "2021SS", name: "Spring 2022",          startDate: "2022-01-17", endDate: "2022-05-14", hasMidpointBreak: true,  supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 1 },
  { legacyId: 2,  code: "2021FS", name: "Fall 2021",            startDate: "2021-08-23", endDate: "2021-12-11", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 1 },
  { legacyId: 3,  code: "2021US", name: "Summer 2022",          startDate: "2022-06-06", endDate: "2022-07-30", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 5,  code: "2022FS", name: "Fall 2022",            startDate: "2022-08-29", endDate: "2022-12-17", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 1 },
  { legacyId: 7,  code: "2022FE", name: "Fall 2022 (Early)",    startDate: "2022-08-29", endDate: "2022-10-22", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 8,  code: "2023FS", name: "Fall 2023",            startDate: "2023-08-28", endDate: "2023-12-16", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 1 },
  { legacyId: 10, code: "2022SS", name: "Spring 2023",          startDate: "2023-01-23", endDate: "2023-05-20", hasMidpointBreak: true,  supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 1 },
  { legacyId: 14, code: "2021FE", name: "Fall 2021 (Early)",    startDate: "2021-08-23", endDate: "2021-10-16", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 15, code: "2022SE", name: "Spring 2023 (Early)",  startDate: "2023-01-23", endDate: "2023-03-18", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 16, code: "2022US", name: "Summer 2023",          startDate: "2023-06-05", endDate: "2023-07-29", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 17, code: "2023FL", name: "Fall 2023 (Late)",     startDate: "2023-10-23", endDate: "2023-12-16", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 18, code: "2023SE", name: "Spring 2024 (Early)",  startDate: "2024-01-15", endDate: "2024-03-09", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 19, code: "2023SS", name: "Spring 2024",          startDate: "2024-01-15", endDate: "2024-05-11", hasMidpointBreak: true,  supportsMasterSyllabi: true,  isActive: false, termLengthLegacyId: 1 },
  { legacyId: 20, code: "2023SL", name: "Spring 2024 (Late)",   startDate: "2024-03-18", endDate: "2024-05-11", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 21, code: "2023US", name: "Summer 2024",          startDate: "2024-06-03", endDate: "2024-07-27", hasMidpointBreak: false, supportsMasterSyllabi: true,  isActive: false, termLengthLegacyId: 2 },
  { legacyId: 22, code: "2024FS", name: "Fall 2024",            startDate: "2024-08-26", endDate: "2024-12-14", hasMidpointBreak: false, supportsMasterSyllabi: true,  isActive: false, termLengthLegacyId: 1 },
  { legacyId: 23, code: "2024SS", name: "Spring 2025",          startDate: "2025-01-20", endDate: "2025-05-17", hasMidpointBreak: true,  supportsMasterSyllabi: true,  isActive: false, termLengthLegacyId: 1 },
  { legacyId: 24, code: "2024FL", name: "Fall 2024 (Late)",     startDate: "2024-10-21", endDate: "2024-12-14", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 25, code: "2024SE", name: "Spring 2025 (Early)",  startDate: "2025-01-20", endDate: "2025-03-15", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 26, code: "2024SL", name: "Spring 2025 (Late)",   startDate: "2025-03-24", endDate: "2025-05-17", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 27, code: "2024US", name: "Summer 2025",          startDate: "2025-06-02", endDate: "2025-07-26", hasMidpointBreak: false, supportsMasterSyllabi: true,  isActive: false, termLengthLegacyId: 2 },
  { legacyId: 28, code: "2024FE", name: "Fall 2024 (Early)",    startDate: "2024-08-26", endDate: "2024-10-19", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 30, code: "2025FS", name: "Fall 2025",            startDate: "2025-08-25", endDate: "2025-12-13", hasMidpointBreak: false, supportsMasterSyllabi: true,  isActive: false, termLengthLegacyId: 1 },
  { legacyId: 31, code: "2025FL", name: "Fall 2025 (Late)",     startDate: "2025-10-20", endDate: "2025-12-13", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: false, termLengthLegacyId: 2 },
  { legacyId: 32, code: "2025SS", name: "Spring 2026",          startDate: "2026-01-19", endDate: "2026-05-16", hasMidpointBreak: true,  supportsMasterSyllabi: true,  isActive: true,  termLengthLegacyId: 1 },
  { legacyId: 33, code: "2025SL", name: "Spring 2026 (Late)",   startDate: "2026-03-23", endDate: "2026-05-16", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: true,  termLengthLegacyId: 2 },
  { legacyId: 34, code: "2025US", name: "Summer 2026",          startDate: "2026-06-08", endDate: "2026-08-01", hasMidpointBreak: false, supportsMasterSyllabi: false, isActive: true,  termLengthLegacyId: 2 },
];

// ── Courses (active only, deduplicating by course_code — keep latest id) ─────

const COURSES_RAW = [
  // Active courses (inactive=0) — where duplicates exist, use the higher id
  { legacyId: 1,  code: "CIS-110S", title: "Computer Concepts and Applications",      creditHours: 3 },
  { legacyId: 2,  code: "CIS-116S", title: "Foundations of Software Testing",         creditHours: 1 },
  { legacyId: 4,  code: "CIS-211S", title: "Operating System Concepts",               creditHours: 3 },
  { legacyId: 5,  code: "CIS-212S", title: "Linux Administration",                    creditHours: 3 },
  { legacyId: 7,  code: "CIS-216S", title: "Systems Administration",                  creditHours: 3 },
  { legacyId: 8,  code: "CIS-221S", title: "Java Programming I",                      creditHours: 3 },
  { legacyId: 9,  code: "CIS-222S", title: "Java Programming II",                     creditHours: 3 },
  { legacyId: 16, code: "CYB-246S", title: "Introduction to Networks",                creditHours: 3 },
  { legacyId: 17, code: "IMD-101S", title: "Introduction to Interactive Media",       creditHours: 1 },
  { legacyId: 21, code: "IMD-133S", title: "Typography and Layout",                   creditHours: 2 },
  { legacyId: 25, code: "IMD-225S", title: "User Experience Design",                  creditHours: 3 },
  { legacyId: 26, code: "IMD-290S", title: "Capstone Project",                        creditHours: 3 },
  { legacyId: 27, code: "IMD-291L", title: "Internship Experience",                   creditHours: 2 },
  { legacyId: 28, code: "IMD-291R", title: "Internship Seminar",                      creditHours: 1 },
  { legacyId: 29, code: "IMD-292S", title: "Portfolio Development",                   creditHours: 1 },
  { legacyId: 43, code: "IMD-232S", title: "Digital Illustration",                    creditHours: 3 },
  { legacyId: 45, code: "CIS-117S", title: "Cloud Foundations",                       creditHours: 1 },
  { legacyId: 46, code: "CIS-126S", title: "Software Testing in Python",              creditHours: 2 },
  { legacyId: 47, code: "CIS-227S", title: "Cloud Development",                       creditHours: 3 },
  { legacyId: 52, code: "CIS-217S", title: "Cloud Architecting",                      creditHours: 3 }, // active (replaces inactive 35)
  { legacyId: 56, code: "IMD-231S", title: "Photo Editing",                           creditHours: 3 },
  { legacyId: 57, code: "IMD-235S", title: "2-D Animation",                           creditHours: 3 },
  { legacyId: 58, code: "GEN-101S", title: "First Year Experience",                   creditHours: 1 },
  { legacyId: 59, code: "ENG-121S", title: "Composition I",                           creditHours: 3 },
  { legacyId: 60, code: "COM-121S", title: "Introduction to Communication",           creditHours: 3 },
  { legacyId: 61, code: "IMD-233S", title: "Electronic Publishing",                   creditHours: 3 },
  { legacyId: 62, code: "CIS-214S", title: "Network Essentials",                      creditHours: 3 },
  { legacyId: 63, code: "IMD-215S", title: "Social Media Management",                 creditHours: 3 },
  { legacyId: 64, code: "CIS-100S", title: "Introduction to Computers",               creditHours: 1 }, // active (replaces inactive 85)
  { legacyId: 65, code: "ZZZ-101S", title: "Social/Behavioral Science Elective",      creditHours: 3 },
  { legacyId: 66, code: "ZZZ-102S", title: "Humanities Elective",                     creditHours: 3 },
  { legacyId: 67, code: "ZZZ-131",  title: "Math Elective",                           creditHours: 3 },
  { legacyId: 79, code: "CIS-290S", title: "Capstone Project",                        creditHours: 3 },
  { legacyId: 81, code: "ZZZ-031",  title: "Concentration Course I",                  creditHours: 3 },
  { legacyId: 82, code: "ZZZ-032",  title: "Concentration Course II",                 creditHours: 3 },
  { legacyId: 83, code: "ZZZ-033",  title: "Concentration Course III",                creditHours: 2 },
  { legacyId: 84, code: "ZZZ-034",  title: "Concentration Course IV",                 creditHours: 3 },
  { legacyId: 87, code: "ZZZ-035",  title: "Concentration Course I",                  creditHours: 3 },
  { legacyId: 88, code: "ZZZ-036",  title: "Concentration Course II",                 creditHours: 3 },
  { legacyId: 89, code: "CIS-291L", title: "Internship Experience",                   creditHours: 2 },
  { legacyId: 90, code: "CIS-291R", title: "Internship Seminar",                      creditHours: 1 },
  { legacyId: 91, code: "CIS-233S", title: "Database Management Concepts",            creditHours: 3 },
  { legacyId: 92, code: "IMD-121S", title: "Introduction to Web Development",         creditHours: 3 }, // active (replaces inactive 19)
  { legacyId: 93, code: "IMD-131S", title: "Introduction to Graphic Design",          creditHours: 3 }, // active (replaces inactive 20)
  { legacyId: 94, code: "IMD-221S", title: "Full Stack Web Development",              creditHours: 3 }, // active (replaces inactive 23)
  { legacyId: 95, code: "IMD-224S", title: "Web App Development",                    creditHours: 3 },
  { legacyId: 48, code: "CIS-121S", title: "Introduction to Programming",             creditHours: 3 }, // active (replaces inactive 3)
];

// ── Sections ──────────────────────────────────────────────────────────────────

// All sections from the dump — filtered at runtime to only those whose
// course_id and term_id map to seeded records.
const SECTIONS_RAW = [
  { legacyId: 2,   sectionCode: "401SS", format: "Web-Flex",         archivedSyllabusPath: "sections/2/CIS-211S_-_Operating_System_Concepts_-_Spring_2022.pdf",         hash: "",                                   legacyCourseId: 4,  legacyTermId: 1  },
  { legacyId: 3,   sectionCode: "401SS", format: "Web-Flex",         archivedSyllabusPath: "sections/3/CIS-212S_-_Linux_Administration_-_Spring_2022.pdf",               hash: "",                                   legacyCourseId: 5,  legacyTermId: 1  },
  { legacyId: 4,   sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/4/CIS-211S_-_Operating_System_Concepts_-_Spring_2022.pdf",         hash: "",                                   legacyCourseId: 4,  legacyTermId: 1  },
  { legacyId: 5,   sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/5/CIS-212S_-_Linux_Administration_-_Spring_2022.pdf",               hash: "",                                   legacyCourseId: 5,  legacyTermId: 1  },
  { legacyId: 6,   sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/6/CIS-226S_-_Python_Programming_-_Spring_2022.pdf",                 hash: "",                                   legacyCourseId: 11, legacyTermId: 1  },
  { legacyId: 7,   sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/7/CIS-217S_-_Cloud_Administration_-_Spring_2022.pdf",               hash: "",                                   legacyCourseId: 35, legacyTermId: 1  },
  { legacyId: 8,   sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/8/IMD-101S_-_Introduction_to_Interactive_Media_-_Spring_2022.pdf",   hash: "",                                   legacyCourseId: 17, legacyTermId: 1  },
  { legacyId: 9,   sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/9/IMD-111S_-_Principles_of_Interactive_Design_-_Spring_2022.pdf",    hash: "",                                   legacyCourseId: 18, legacyTermId: 1  },
  { legacyId: 10,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/10/IMD-121S_-_Fundamentals_of_Web_Development_-_Spring_2022.pdf",    hash: "",                                   legacyCourseId: 19, legacyTermId: 1  },
  { legacyId: 11,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/11/IMD-131S_-_Fundamentals_of_Graphic_Design_-_Spring_2022.pdf",     hash: "",                                   legacyCourseId: 20, legacyTermId: 1  },
  { legacyId: 12,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/12/IMD-222S_-_Back-End_Web_Development_-_Spring_2022.pdf",            hash: "",                                   legacyCourseId: 24, legacyTermId: 1  },
  { legacyId: 13,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/13/IMD-291R_-_Internship_Seminar_-_Spring_2022.pdf",                  hash: "",                                   legacyCourseId: 28, legacyTermId: 1  },
  { legacyId: 14,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: "sections/14/IMD-292S_-_Portfolio_Development_-_Spring_2022.pdf",               hash: "",                                   legacyCourseId: 29, legacyTermId: 1  },
  { legacyId: 15,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: "sections/15/CIS-211S_-_Operating_System_Concepts_-_Fall_2022.pdf",            hash: "",                                   legacyCourseId: 4,  legacyTermId: 5  },
  { legacyId: 16,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/16/CIS-116S_-_Foundations_of_Software_Testing_-_Fall_2022_Early.pdf",hash: "",                                   legacyCourseId: 2,  legacyTermId: 7  },
  { legacyId: 19,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/19/IMD-232S_-_Digital_Illustration_-_Fall_2022.pdf",                  hash: "",                                   legacyCourseId: 43, legacyTermId: 5  },
  { legacyId: 20,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/20/CIS-211S_-_Operating_System_Concepts_-_Fall_2022.pdf",            hash: "",                                   legacyCourseId: 4,  legacyTermId: 5  },
  { legacyId: 22,  sectionCode: "401SS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 4,  legacyTermId: 10 },
  { legacyId: 24,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 4,  legacyTermId: 10 },
  { legacyId: 25,  sectionCode: "401SS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 5,  legacyTermId: 10 },
  { legacyId: 26,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 5,  legacyTermId: 10 },
  { legacyId: 27,  sectionCode: "501SS", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 6,  legacyTermId: 10 },
  { legacyId: 28,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 35, legacyTermId: 10 },
  { legacyId: 29,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 9,  legacyTermId: 10 },
  { legacyId: 30,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 11, legacyTermId: 10 },
  { legacyId: 31,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 24, legacyTermId: 10 },
  { legacyId: 32,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 26, legacyTermId: 10 },
  { legacyId: 33,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 29, legacyTermId: 10 },
  { legacyId: 34,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: "sections/34/CIS-213S_-_Database_Management_Concepts_-_Fall_2022.pdf",          hash: "",                                   legacyCourseId: 6,  legacyTermId: 5  },
  { legacyId: 35,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/35/CIS-213S_-_Database_Management_Concepts_-_Fall_2022.pdf",          hash: "",                                   legacyCourseId: 6,  legacyTermId: 5  },
  { legacyId: 36,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/36/CIS-216S_-_Systems_Administration_-_Fall_2022.pdf",               hash: "",                                   legacyCourseId: 7,  legacyTermId: 5  },
  { legacyId: 37,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/37/IMD-101S_-_Introduction_to_Interactive_Media_-_Fall_2022.pdf",     hash: "",                                   legacyCourseId: 17, legacyTermId: 5  },
  { legacyId: 38,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/38/IMD-121S_-_Fundamentals_of_Web_Development_-_Fall_2022.pdf",       hash: "",                                   legacyCourseId: 19, legacyTermId: 5  },
  { legacyId: 39,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/39/IMD-131S_-_Fundamentals_of_Graphic_Design_-_Fall_2022.pdf",        hash: "",                                   legacyCourseId: 20, legacyTermId: 5  },
  { legacyId: 40,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/40/IMD-211S_-_Technical_Media_Communication_-_Fall_2022.pdf",         hash: "",                                   legacyCourseId: 22, legacyTermId: 5  },
  { legacyId: 41,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/41/IMD-221S_-_Front-End_Web_Development_-_Fall_2022.pdf",             hash: "",                                   legacyCourseId: 23, legacyTermId: 5  },
  { legacyId: 42,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/42/IMD-225S_-_User_Experience_Design_-_Fall_2022.pdf",                hash: "",                                   legacyCourseId: 25, legacyTermId: 5  },
  { legacyId: 43,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/43/CIS-116S_-_Foundations_of_Software_Testing_-_Summer_2022.pdf",     hash: "",                                   legacyCourseId: 2,  legacyTermId: 3  },
  { legacyId: 44,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/44/CIS-211S_-_Operating_System_Concepts_-_Summer_2022.pdf",           hash: "",                                   legacyCourseId: 4,  legacyTermId: 3  },
  { legacyId: 45,  sectionCode: "501US", format: "Independent Study",archivedSyllabusPath: "sections/45/CIS-216S_-_Systems_Administration_-_Summer_2022.pdf",              hash: "",                                   legacyCourseId: 7,  legacyTermId: 3  },
  { legacyId: 46,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/46/CIS-226S_-_Python_Programming_-_Summer_2022.pdf",                  hash: "",                                   legacyCourseId: 11, legacyTermId: 3  },
  { legacyId: 47,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/47/IMD-101S_-_Introduction_to_Interactive_Media_-_Summer_2022.pdf",   hash: "",                                   legacyCourseId: 17, legacyTermId: 3  },
  { legacyId: 48,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/48/IMD-121S_-_Fundamentals_of_Web_Development_-_Summer_2022.pdf",     hash: "",                                   legacyCourseId: 19, legacyTermId: 3  },
  { legacyId: 49,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/49/IMD-131S_-_Fundamentals_of_Graphic_Design_-_Summer_2022.pdf",      hash: "",                                   legacyCourseId: 20, legacyTermId: 3  },
  { legacyId: 50,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: "sections/50/IMD-111S_-_Principles_of_Interactive_Design_-_Summer_2022.pdf",    hash: "",                                   legacyCourseId: 18, legacyTermId: 3  },
  { legacyId: 51,  sectionCode: "801FE", format: "Online",           archivedSyllabusPath: "sections/51/CIS-116S_-_Foundations_of_Software_Testing_-_Fall_2021_Early.pdf", hash: "",                                   legacyCourseId: 2,  legacyTermId: 14 },
  { legacyId: 52,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: "sections/52/CIS-211S_-_Operating_System_Concepts_-_Fall_2021.pdf",             hash: "",                                   legacyCourseId: 4,  legacyTermId: 2  },
  { legacyId: 53,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/53/CIS-211S_-_Operating_System_Concepts_-_Fall_2021.pdf",             hash: "",                                   legacyCourseId: 4,  legacyTermId: 2  },
  { legacyId: 54,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: "sections/54/CIS-213S_-_Database_Management_Concepts_-_Fall_2021.pdf",          hash: "",                                   legacyCourseId: 6,  legacyTermId: 2  },
  { legacyId: 55,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/55/CIS-213S_-_Database_Management_Concepts_-_Fall_2021.pdf",          hash: "",                                   legacyCourseId: 6,  legacyTermId: 2  },
  { legacyId: 56,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/56/CIS-216S_-_Systems_Administration_-_Fall_2021.pdf",               hash: "",                                   legacyCourseId: 7,  legacyTermId: 2  },
  { legacyId: 57,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: "sections/57/CIS-221S_-_Java_Programming_I_-_Fall_2021.pdf",                    hash: "",                                   legacyCourseId: 8,  legacyTermId: 2  },
  { legacyId: 58,  sectionCode: "501FS", format: "Independent Study",archivedSyllabusPath: "sections/58/CYB-246S_-_Introduction_to_Networks_-_Fall_2021.pdf",              hash: "",                                   legacyCourseId: 16, legacyTermId: 2  },
  { legacyId: 59,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/59/IMD-101S_-_Introduction_to_Interactive_Media_-_Fall_2021.pdf",     hash: "",                                   legacyCourseId: 17, legacyTermId: 2  },
  { legacyId: 60,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/60/IMD-111S_-_Principles_of_Interactive_Design_-_Fall_2021.pdf",      hash: "",                                   legacyCourseId: 18, legacyTermId: 2  },
  { legacyId: 61,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/61/IMD-121S_-_Fundamentals_of_Web_Development_-_Fall_2021.pdf",       hash: "",                                   legacyCourseId: 19, legacyTermId: 2  },
  { legacyId: 62,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/62/IMD-131S_-_Fundamentals_of_Graphic_Design_-_Fall_2021.pdf",        hash: "",                                   legacyCourseId: 20, legacyTermId: 2  },
  { legacyId: 63,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/63/IMD-211S_-_Technical_Media_Communication_-_Fall_2021.pdf",         hash: "",                                   legacyCourseId: 22, legacyTermId: 2  },
  { legacyId: 64,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/64/IMD-221S_-_Front-End_Web_Development_-_Fall_2021.pdf",             hash: "",                                   legacyCourseId: 23, legacyTermId: 2  },
  { legacyId: 65,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: "sections/65/IMD-225S_-_User_Experience_Design_-_Fall_2021.pdf",                hash: "",                                   legacyCourseId: 25, legacyTermId: 2  },
  { legacyId: 66,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 17, legacyTermId: 10 },
  { legacyId: 67,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 19, legacyTermId: 10 },
  { legacyId: 68,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 21, legacyTermId: 10 },
  { legacyId: 71,  sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 20, legacyTermId: 10 },
  { legacyId: 72,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 2,  legacyTermId: 16 },
  { legacyId: 73,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 45, legacyTermId: 16 },
  { legacyId: 74,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 4,  legacyTermId: 16 },
  { legacyId: 75,  sectionCode: "501US", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 5,  legacyTermId: 16 },
  { legacyId: 76,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 11, legacyTermId: 16 },
  { legacyId: 77,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 17, legacyTermId: 16 },
  { legacyId: 78,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 19, legacyTermId: 16 },
  { legacyId: 79,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 20, legacyTermId: 16 },
  { legacyId: 80,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 18, legacyTermId: 16 },
  { legacyId: 81,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 28, legacyTermId: 16 },
  { legacyId: 82,  sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 29, legacyTermId: 16 },
  { legacyId: 83,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 4,  legacyTermId: 8  },
  { legacyId: 84,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 4,  legacyTermId: 8  },
  { legacyId: 85,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 5,  legacyTermId: 8  },
  { legacyId: 86,  sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 6,  legacyTermId: 8  },
  { legacyId: 87,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 6,  legacyTermId: 8  },
  { legacyId: 88,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 7,  legacyTermId: 8  },
  { legacyId: 89,  sectionCode: "851FL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 45, legacyTermId: 17 },
  { legacyId: 95,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 17, legacyTermId: 8  },
  { legacyId: 96,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 19, legacyTermId: 8  },
  { legacyId: 97,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 20, legacyTermId: 8  },
  { legacyId: 98,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 22, legacyTermId: 8  },
  { legacyId: 99,  sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 24, legacyTermId: 8  },
  { legacyId: 100, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "",                                   legacyCourseId: 43, legacyTermId: 8  },
  { legacyId: 101, sectionCode: "401SS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "3deffc626a699c81e57f8d93fd690875",    legacyCourseId: 4,  legacyTermId: 19 },
  { legacyId: 102, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "4bb3976fa0d292efc9ffbcb08aeba478",    legacyCourseId: 4,  legacyTermId: 19 },
  { legacyId: 103, sectionCode: "851SE", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "facb6cfded5a94e293f26df6ea7c67ff",    legacyCourseId: 2,  legacyTermId: 18 },
  { legacyId: 104, sectionCode: "851SE", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "df3a934f861678ad22cc079f087c0092",    legacyCourseId: 45, legacyTermId: 18 },
  { legacyId: 105, sectionCode: "851SL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "e07cffa42c4e781547da889caf61a876",    legacyCourseId: 45, legacyTermId: 20 },
  { legacyId: 106, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "b6b617a69cab01e256530ea9260cc468",    legacyCourseId: 48, legacyTermId: 19 },
  { legacyId: 107, sectionCode: "851SL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "e454f2569277c1ce9bf43cc00048b19d",    legacyCourseId: 46, legacyTermId: 20 },
  { legacyId: 108, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "ebad613b4321a7231618fcb458c25ecd",    legacyCourseId: 52, legacyTermId: 19 },
  { legacyId: 109, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "216855c59c7f5b9d845e0725a143bffb",    legacyCourseId: 9,  legacyTermId: 19 },
  { legacyId: 110, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "f4de3cb6ff5f18fafe1577694e142964",    legacyCourseId: 47, legacyTermId: 19 },
  { legacyId: 111, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "1121a81a54a6bfb99b476fff99183f3c",    legacyCourseId: 17, legacyTermId: 19 },
  { legacyId: 112, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "d2a380fbcdfb2b984de09954730c361c",    legacyCourseId: 19, legacyTermId: 19 },
  { legacyId: 113, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "c6217988fd8dceb75ccb4a2f2f4aca35",    legacyCourseId: 20, legacyTermId: 19 },
  { legacyId: 114, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "80ff17e5a9e318c4bed9b6e4e6d6553a",    legacyCourseId: 23, legacyTermId: 19 },
  { legacyId: 115, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "9968eb064a89ae0ec9a2a6c9930980db",    legacyCourseId: 57, legacyTermId: 19 },
  { legacyId: 116, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "deff19ef6db1bfee6d24a933377b86de",    legacyCourseId: 26, legacyTermId: 19 },
  { legacyId: 117, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "7e9e68d087f19e0967ce58f12e2a8776",    legacyCourseId: 28, legacyTermId: 19 },
  { legacyId: 118, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "47f96952240004510251cbf92d1c8dca",    legacyCourseId: 29, legacyTermId: 19 },
  { legacyId: 119, sectionCode: "451SL", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "ef3a3fe04a9c6ac662c6281dd9cdf45e",    legacyCourseId: 4,  legacyTermId: 20 },
  { legacyId: 120, sectionCode: "501SS", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "ad191591aa842cf76f521b95d5651b10",    legacyCourseId: 7,  legacyTermId: 19 },
  { legacyId: 127, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "dae0d75db9979f91b275129287cae8d5",    legacyCourseId: 48, legacyTermId: 21 },
  { legacyId: 128, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "54732784bf4c0957df31a0059ee1ad2f",    legacyCourseId: 4,  legacyTermId: 21 },
  { legacyId: 129, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "2317591e3fd41814db6ec264c8a0bcdf",    legacyCourseId: 2,  legacyTermId: 21 },
  { legacyId: 130, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "c4d881b00d3e72335ea8074d0cc65768",    legacyCourseId: 45, legacyTermId: 21 },
  { legacyId: 131, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "b5d8b605020347209a9694b0f9027951",    legacyCourseId: 17, legacyTermId: 21 },
  { legacyId: 132, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a4a2e989c8ec442b2289757e23a2a008",    legacyCourseId: 19, legacyTermId: 21 },
  { legacyId: 133, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "916857e4cb5b368ca81b2e8ca0d78072",    legacyCourseId: 20, legacyTermId: 21 },
  { legacyId: 134, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "67ce4350b4411e9a8437981e5a9d787b",    legacyCourseId: 19, legacyTermId: 22 },
  { legacyId: 135, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a1b0bc967778922210628a1d433f53c0",    legacyCourseId: 20, legacyTermId: 22 },
  { legacyId: 136, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "4973d091bd6a57624509b2afc036f246",    legacyCourseId: 22, legacyTermId: 22 },
  { legacyId: 137, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "5bb8ee5a698e3e62163d050cc3fe9b46",    legacyCourseId: 28, legacyTermId: 21 },
  { legacyId: 138, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "44c5029d9faa2815a011c954c166976c",    legacyCourseId: 29, legacyTermId: 21 },
  { legacyId: 139, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a20be9658d79cf5aef08f7528bd41022",    legacyCourseId: 5,  legacyTermId: 22 },
  { legacyId: 140, sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "893cd1439bd19472d42112fe1ddf3eaa",    legacyCourseId: 4,  legacyTermId: 22 },
  { legacyId: 141, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "ed086979f75ad33c9cb129c9ece55655",    legacyCourseId: 4,  legacyTermId: 22 },
  { legacyId: 142, sectionCode: "001FS", format: "Lecture",          archivedSyllabusPath: null,                                                                           hash: "42b87f54bb6fd806d69e4a19567f6cb5",    legacyCourseId: 6,  legacyTermId: 22 },
  { legacyId: 143, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "f572cef6dd26390bb31aeba3f906cdaf",    legacyCourseId: 6,  legacyTermId: 22 },
  { legacyId: 144, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "0d7aac3a362d39c60c2a53f03c504223",    legacyCourseId: 7,  legacyTermId: 22 },
  { legacyId: 145, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "6076b61c8241bfb738bcec50666d867d",    legacyCourseId: 17, legacyTermId: 22 },
  { legacyId: 146, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a55bf64095222c6a8d7d3edc68edada7",    legacyCourseId: 24, legacyTermId: 22 },
  { legacyId: 147, sectionCode: "501FS", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "d9df30f02accdbc82d89ceb496d7c086",    legacyCourseId: 56, legacyTermId: 22 },
  { legacyId: 148, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a2dcbc8717c22351dc36d52904a2e0cd",    legacyCourseId: 43, legacyTermId: 22 },
  { legacyId: 149, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "67cf97927d8b431fe4a610a496f67dc9",    legacyCourseId: 28, legacyTermId: 22 },
  { legacyId: 150, sectionCode: "851FL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "6684b0decf3c048d20774b23e4223ea3",    legacyCourseId: 45, legacyTermId: 24 },
  { legacyId: 151, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a450ada776cf4e2c3127eac16bf2ae12",    legacyCourseId: 29, legacyTermId: 22 },
  { legacyId: 152, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "cbe0fa7af6ef42b20bfeaa1d5b9bcc04",    legacyCourseId: 52, legacyTermId: 22 },
  { legacyId: 153, sectionCode: "851SE", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "c2fd15e8489f5eff1f85091743dd799b",    legacyCourseId: 2,  legacyTermId: 25 },
  { legacyId: 154, sectionCode: "851SE", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "a1640f1c3c503b7f3a84f96025a52a5e",    legacyCourseId: 45, legacyTermId: 25 },
  { legacyId: 155, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "f3202bb9870a0cb3da8c09cf593eef95",    legacyCourseId: 48, legacyTermId: 23 },
  { legacyId: 156, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "dc24d0f643f272507dc2c045304f5cc2",    legacyCourseId: 4,  legacyTermId: 23 },
  { legacyId: 157, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "65f03cabc50d53ce675b435d92f54310",    legacyCourseId: 52, legacyTermId: 23 },
  { legacyId: 158, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "ea2b6dc3b40e3c9dfcb616a1fb4ca687",    legacyCourseId: 9,  legacyTermId: 23 },
  { legacyId: 159, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "c081fd1d74fdd8f65f39cead6507e50b",    legacyCourseId: 47, legacyTermId: 23 },
  { legacyId: 161, sectionCode: "801SS", format: "Internship",       archivedSyllabusPath: null,                                                                           hash: "c3ce1cf503887d04c0babe5d06a10b6f",    legacyCourseId: 90, legacyTermId: 23 },
  { legacyId: 162, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "fdfd2c00efd1293dfac77eba7a7ab0ad",    legacyCourseId: 17, legacyTermId: 23 },
  { legacyId: 163, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "ee13e297c0ea93a42bec69a3663dec50",    legacyCourseId: 19, legacyTermId: 23 },
  { legacyId: 164, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "c7bb544153e19faf351dee49297b5098",    legacyCourseId: 20, legacyTermId: 23 },
  { legacyId: 165, sectionCode: "501SS", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "c99de489be3469740752c1f339a3e220",    legacyCourseId: 25, legacyTermId: 23 },
  { legacyId: 166, sectionCode: "801SS", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "073a1e1361279de647228819357af201",    legacyCourseId: 43, legacyTermId: 23 },
  { legacyId: 167, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "ae5f78b05abafa6a85acbe1062ca6e3c",    legacyCourseId: 57, legacyTermId: 23 },
  { legacyId: 168, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "025c8d21bc4951be5e9b99616c03b3a3",    legacyCourseId: 26, legacyTermId: 23 },
  { legacyId: 169, sectionCode: "801SS", format: "Lecture",          archivedSyllabusPath: null,                                                                           hash: "c3dbd0b3f92d2dcada039fe3f75a4ea5",    legacyCourseId: 28, legacyTermId: 23 },
  { legacyId: 170, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "55bd616f7fc9d0ca63e422eae10fb0e0",    legacyCourseId: 29, legacyTermId: 23 },
  { legacyId: 171, sectionCode: "551SL", format: "Independent Study",archivedSyllabusPath: null,                                                                           hash: "89272c1de376b9d4be1f843f7214cb08",    legacyCourseId: 57, legacyTermId: 26 },
  { legacyId: 172, sectionCode: "851SL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "b128642960c20b035e8e140e950349f4",    legacyCourseId: 46, legacyTermId: 26 },
  { legacyId: 173, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "9b20a8f40e104232cfcc6dbba9e336e8",    legacyCourseId: 45, legacyTermId: 27 },
  { legacyId: 174, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "540bc813aa63315e1c36a799a01907ed",    legacyCourseId: 48, legacyTermId: 27 },
  { legacyId: 175, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "17132eedf93292744de07ff192507fe5",    legacyCourseId: 4,  legacyTermId: 27 },
  { legacyId: 176, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "121024984ddf6823e60eacdc47d89127",    legacyCourseId: 17, legacyTermId: 27 },
  { legacyId: 177, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "0b26f5b3bff1daec80c4579bd790dd60",    legacyCourseId: 19, legacyTermId: 27 },
  { legacyId: 178, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "7554eb69ebad1d5fa137a844f8c5577b",    legacyCourseId: 20, legacyTermId: 27 },
  { legacyId: 179, sectionCode: "501US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "434d1159d8eeb086129c5a6c69f9119e",    legacyCourseId: 57, legacyTermId: 27 },
  { legacyId: 180, sectionCode: "801US", format: "Internship",       archivedSyllabusPath: null,                                                                           hash: "a5139605417d83e40f77a721e30c3580",    legacyCourseId: 28, legacyTermId: 27 },
  { legacyId: 181, sectionCode: "801US", format: "Internship",       archivedSyllabusPath: null,                                                                           hash: "37bfbf2dcac19a9d9cd93d0d190c4d90",    legacyCourseId: 90, legacyTermId: 27 },
  { legacyId: 182, sectionCode: "801US", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "571223c41e4442d22c1dcb237f825c26",    legacyCourseId: 29, legacyTermId: 27 },
  { legacyId: 183, sectionCode: "801FS", format: "Internship",       archivedSyllabusPath: null,                                                                           hash: "87bd2c01debaf9ac99b0516557b6d692",    legacyCourseId: 89, legacyTermId: 30 },
  { legacyId: 184, sectionCode: "401FS", format: "Web-Flex",         archivedSyllabusPath: null,                                                                           hash: "4cdcc167a0c37ec45d543554f77ee3f9",    legacyCourseId: 4,  legacyTermId: 30 },
  { legacyId: 185, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "3918338e60135dd8c94d1146e73355a7",    legacyCourseId: 4,  legacyTermId: 30 },
  { legacyId: 186, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "44de13bbb472360c2e552fe865198ea1",    legacyCourseId: 5,  legacyTermId: 30 },
  { legacyId: 187, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "2cee1973dbfd561ff1601e2eb886c636",    legacyCourseId: 7,  legacyTermId: 30 },
  { legacyId: 188, sectionCode: "001FS", format: "Lecture",          archivedSyllabusPath: null,                                                                           hash: "2bff147561828f3d90d3af4fc42077d6",    legacyCourseId: 91, legacyTermId: 30 },
  { legacyId: 189, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "7d76b5d71fb1f5c90ace406493e9aead",    legacyCourseId: 91, legacyTermId: 30 },
  { legacyId: 190, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "b0d8cb0745c0ad9dfc89722c92cf9f5b",    legacyCourseId: 17, legacyTermId: 30 },
  { legacyId: 191, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "f39d00dd5f532343d90390e87d6e7736",    legacyCourseId: 92, legacyTermId: 30 },
  { legacyId: 192, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "06b409df8d6f80ec672e6472e6859bbd",    legacyCourseId: 94, legacyTermId: 30 },
  { legacyId: 193, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "0c1a061ef5e28b963315807bfd45a0a9",    legacyCourseId: 43, legacyTermId: 30 },
  { legacyId: 194, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "37d0c8560a21ca34dd8b33fb3e49778d",    legacyCourseId: 29, legacyTermId: 30 },
  { legacyId: 195, sectionCode: "801FS", format: "Internship",       archivedSyllabusPath: null,                                                                           hash: "358f3ef50cb846a198f4131b8c055156",    legacyCourseId: 27, legacyTermId: 30 },
  { legacyId: 196, sectionCode: "851FL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "4c3d3a469ad13cfeffcac0c94d87687a",    legacyCourseId: 45, legacyTermId: 31 },
  { legacyId: 197, sectionCode: "801FS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "04b3aad13443167811e511c5b083f2c1",    legacyCourseId: 93, legacyTermId: 30 },
  { legacyId: 198, sectionCode: "851SE", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "780269b0a610643dbe09b9444b68358c",    legacyCourseId: 2,  legacyTermId: 32 },
  { legacyId: 199, sectionCode: "851SE", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "dc904777857b10cac50a9e6a6b3d1bda",    legacyCourseId: 45, legacyTermId: 32 },
  { legacyId: 200, sectionCode: "001SS", format: "Lecture",          archivedSyllabusPath: null,                                                                           hash: "91d9389fc99e928445eea21e072efffe",    legacyCourseId: 48, legacyTermId: 32 },
  { legacyId: 201, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "9e8bc3bdb80db65beae98657ec0ae3e7",    legacyCourseId: 48, legacyTermId: 32 },
  { legacyId: 202, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "cf2236494bf6e55524aa1f7307ccf8d0",    legacyCourseId: 4,  legacyTermId: 32 },
  { legacyId: 203, sectionCode: "001SS", format: "Lecture",          archivedSyllabusPath: null,                                                                           hash: "a4cb2fcf0cf58d1fa420916e52bce167",    legacyCourseId: 9,  legacyTermId: 32 },
  { legacyId: 204, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "0dce4f0d6578b92154b996a11ff88dd6",    legacyCourseId: 9,  legacyTermId: 32 },
  { legacyId: 205, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "95e68a103a6459b375fcaf5518614299",    legacyCourseId: 17, legacyTermId: 32 },
  { legacyId: 206, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "dc3b6d0820da8a3e074f05a1257e57f5",    legacyCourseId: 92, legacyTermId: 32 },
  { legacyId: 207, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "7d49463b208dc7991189053c4b6cf10d",    legacyCourseId: 56, legacyTermId: 32 },
  { legacyId: 208, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "256de8bd5bdb6f0ba577310ba2794340",    legacyCourseId: 26, legacyTermId: 32 },
  { legacyId: 209, sectionCode: "801SS", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "437f2520b7bf51975a23fdaf59129e44",    legacyCourseId: 29, legacyTermId: 32 },
  { legacyId: 210, sectionCode: "851SL", format: "Online",           archivedSyllabusPath: null,                                                                           hash: "21767fb2d0ad5db8b41486493c260403",    legacyCourseId: 46, legacyTermId: 33 },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Seeding registration data…");

  // 1. Term Lengths
  console.log("  → Term lengths…");
  const termLengthIdMap = new Map<number, string>();
  for (const tl of TERM_LENGTHS) {
    const record = await db.termLength.upsert({
      where: { id: tl.label }, // use label as unique identifier for upsert
      update: { weeks: tl.weeks, canHaveMidpointBreak: tl.canHaveMidpointBreak },
      create: { label: tl.label, weeks: tl.weeks, canHaveMidpointBreak: tl.canHaveMidpointBreak },
    });
    termLengthIdMap.set(tl.legacyId, record.id);
  }

  // 2. Terms
  console.log("  → Terms…");
  const termIdMap = new Map<number, string>();
  for (const t of TERMS) {
    const termLengthId = termLengthIdMap.get(t.termLengthLegacyId);
    const record = await db.term.upsert({
      where: { code: t.code },
      update: {
        name: t.name,
        startDate: new Date(t.startDate),
        endDate: new Date(t.endDate),
        hasMidpointBreak: t.hasMidpointBreak,
        supportsMasterSyllabi: t.supportsMasterSyllabi,
        isActive: t.isActive,
        termLengthId,
      },
      create: {
        code: t.code,
        name: t.name,
        startDate: new Date(t.startDate),
        endDate: new Date(t.endDate),
        hasMidpointBreak: t.hasMidpointBreak,
        supportsMasterSyllabi: t.supportsMasterSyllabi,
        isActive: t.isActive,
        termLengthId,
      },
    });
    termIdMap.set(t.legacyId, record.id);
  }

  // 3. Courses
  console.log("  → Courses…");
  const courseIdMap = new Map<number, string>();
  for (const c of COURSES_RAW) {
    const record = await db.course.upsert({
      where: { code: c.code },
      update: { title: c.title, creditHours: c.creditHours, isActive: true },
      create: { code: c.code, title: c.title, creditHours: c.creditHours, isActive: true },
    });
    courseIdMap.set(c.legacyId, record.id);
  }

  // 4. Sections — only those whose course and term both exist in our maps
  console.log("  → Sections…");
  let skipped = 0;
  let created = 0;

  // Build a label → id map for SectionFormats so we can resolve legacy format strings to FKs.
  const sectionFormats = await db.sectionFormat.findMany();
  const formatIdByLabel = new Map(sectionFormats.map((f) => [f.label, f.id]));

  // Legacy course IDs that map to inactive courses (not in COURSES_RAW) — sections referencing
  // these will be skipped. Build a set of all legacy course IDs we imported.
  const importedCourseLegacyIds = new Set(COURSES_RAW.map((c) => c.legacyId));

  for (const s of SECTIONS_RAW) {
    const courseId = courseIdMap.get(s.legacyCourseId);
    const termId = termIdMap.get(s.legacyTermId);

    // Skip if course or term wasn't imported (e.g. inactive course, missing term)
    if (!courseId || !termId) {
      skipped++;
      continue;
    }

    // Use existing hash from legacy system if present, otherwise let Prisma default generate one
    const hashData = s.hash ? { hash: s.hash } : {};

    try {
      await db.section.upsert({
        where: { courseId_termId_sectionCode: { courseId, termId, sectionCode: s.sectionCode } },
        update: {
          formatId: s.format ? (formatIdByLabel.get(s.format) ?? null) : null,
          archivedSyllabusPath: s.archivedSyllabusPath ?? null,
          ...(s.hash ? { hash: s.hash } : {}),
        },
        create: {
          courseId,
          termId,
          sectionCode: s.sectionCode,
          formatId: s.format ? (formatIdByLabel.get(s.format) ?? null) : null,
          archivedSyllabusPath: s.archivedSyllabusPath ?? null,
          isActive: true,
          ...hashData,
        },
      });
      created++;
    } catch (err: any) {
      // Hash collision (e.g. duplicate non-empty hash) — skip gracefully
      if (err.code === "P2002") {
        skipped++;
      } else {
        throw err;
      }
    }
  }

  console.log(`  → Sections: ${created} created/updated, ${skipped} skipped.`);
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
