/**
 * One-off migration: populate sections.formatId using SectionCodeRules.
 * The first digit of a section's sectionCode determines the format.
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const db = new PrismaClient({ adapter });

async function main() {
  const rules = await db.sectionCodeRule.findMany({ include: { format: true } });
  const ruleMap = new Map(rules.map((r) => [r.digit, r.formatId]));

  const sections = await db.section.findMany({ select: { id: true, sectionCode: true } });

  let updated = 0;
  let skipped = 0;

  for (const section of sections) {
    const firstDigit = section.sectionCode.match(/\d/)?.[0];
    const formatId = firstDigit ? ruleMap.get(firstDigit) : undefined;

    if (formatId) {
      await db.section.update({ where: { id: section.id }, data: { formatId } });
      updated++;
    } else {
      skipped++;
      console.log(`  Skipped ${section.sectionCode} — no rule for digit "${firstDigit ?? "none"}"`);
    }
  }

  console.log(`Done: ${updated} updated, ${skipped} skipped.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
