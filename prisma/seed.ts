import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    { name: "職涯討論", slug: "career", type: "FORUM" },
    { name: "校友活動", slug: "events", type: "FORUM" },
    { name: "自由交流", slug: "free-talk", type: "FORUM" },
    { name: "科技業", slug: "tech-jobs", type: "JOB" },
    { name: "金融業", slug: "finance-jobs", type: "JOB" },
    { name: "餐飲優惠", slug: "food-deals", type: "PROMOTION" },
    { name: "住宿優惠", slug: "stay-deals", type: "PROMOTION" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Create admin user
  const adminEmail = "admin@iti.edu.tw";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const bcrypt = await import("bcryptjs");
    await prisma.user.create({
      data: {
        name: "ITI 管理員",
        email: adminEmail,
        passwordHash: await bcrypt.hash("admin123", 12),
        role: "ADMIN",
        isVerified: true,
      },
    });
  }

  console.log("✅ 種子資料建立完成");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
