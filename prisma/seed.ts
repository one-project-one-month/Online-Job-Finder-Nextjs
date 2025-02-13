import {
  PrismaClient,
  Role,
  JobType,
  ApplicationStatus,
  ReviewEntityType,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // ----------------- STEP 1: CREATE USERS -----------------
  console.log("🔹 Creating Users...");

  const users = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.user.create({
        data: {
          id: faker.string.uuid(), // Simulating Clerk user ID
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: faker.helpers.arrayElement([
            Role.USER,
            Role.COMPANY,
            Role.ADMIN,
          ]),
        },
      })
    )
  );

  console.log(`✅ Created ${users.length} users`);

  // ----------------- STEP 2: CREATE COMPANIES -----------------
  console.log("🔹 Creating Companies...");

  const companyOwners = users.filter((user) => user.role === Role.COMPANY);
  const industries = [
    "Software Development",
    "Renewable Energy",
    "Healthcare",
    "E-commerce",
    "Finance",
  ];

  const companies = await Promise.all(
    companyOwners.map((owner) =>
      prisma.company.create({
        data: {
          id: faker.string.uuid(),
          name: faker.company.name(),
          description: faker.company.catchPhrase(),
          industry: faker.helpers.arrayElement(industries),
          location: faker.location.city(),
          website: faker.internet.url(),
          ownerId: owner.id,
        },
      })
    )
  );

  console.log(`✅ Created ${companies.length} companies`);

  // ----------------- STEP 3: CREATE JOBS -----------------
  console.log("🔹 Creating Jobs...");

  const jobTitles = [
    "Software Engineer",
    "Project Manager",
    "Marketing Specialist",
    "Data Scientist",
    "Cybersecurity Analyst",
    "HR Coordinator",
    "UX/UI Designer",
    "Accountant",
  ];

  const jobs = await Promise.all(
    companies.flatMap((company) =>
      Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() =>
        prisma.job.create({
          data: {
            id: faker.string.uuid(),
            title: faker.helpers.arrayElement(jobTitles),
            description: faker.lorem.paragraph(),
            location: faker.location.city(),
            salary: faker.number.float({
              min: 40000,
              max: 120000,
            }), // Salary range
            jobType: faker.helpers.arrayElement([
              JobType.FULL_TIME,
              JobType.PART_TIME,
              JobType.REMOTE,
              JobType.INTERNSHIP,
            ]),
            companyId: company.id,
            postedById: company.ownerId,
            savedBy: [],
          },
        })
      )
    )
  );

  console.log(`✅ Created ${jobs.length} jobs`);

  // ----------------- STEP 4: CREATE APPLICATIONS -----------------
  console.log("🔹 Creating Job Applications...");

  const jobSeekers = users.filter((user) => user.role === Role.USER);
  const applications = await Promise.all(
    jobSeekers.flatMap((seeker) =>
      Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => {
        const job = faker.helpers.arrayElement(jobs);
        return prisma.application.create({
          data: {
            id: faker.string.uuid(),
            jobId: job.id,
            applicantId: seeker.id,
            resume: `https://example.com/resume/${seeker.id}.pdf`,
            status: faker.helpers.arrayElement([
              ApplicationStatus.PENDING,
              ApplicationStatus.ACCEPTED,
              ApplicationStatus.REJECTED,
            ]),
          },
        });
      })
    )
  );

  console.log(`✅ Created ${applications.length} applications`);

  // ----------------- STEP 5: CREATE REVIEWS -----------------
  console.log("🔹 Creating Reviews...");

  const reviews = await Promise.all(
    jobSeekers.flatMap((reviewer) =>
      Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => {
        const company = faker.helpers.arrayElement(companies);
        return prisma.review.create({
          data: {
            id: faker.string.uuid(),
            reviewerId: reviewer.id,
            entityId: company.id,
            entityType: ReviewEntityType.COMPANY,
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.sentence(),
          },
        });
      })
    )
  );

  console.log(`✅ Created ${reviews.length} reviews`);

  console.log("🎉 Database seeding completed successfully!");
}

// ----------------- RUN THE SEED SCRIPT -----------------
main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
