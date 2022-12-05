import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import matter from "gray-matter";

const prisma = new PrismaClient();

const taskDirectory = join(process.cwd(), "_contents/tasks");

async function main() {
  return await prisma.$transaction(async (tx) => {
    await tx.group.deleteMany();
    await tx.task.deleteMany();
    await tx.condition.deleteMany({});

    // Insert condition seeds
    // createMany() isn't supported for SQLite.
    await tx.condition.create({ data: { id: 1, name: "purpose" } });
    await tx.condition.create({ data: { id: 2, name: "icon" } });
    await tx.condition.create({ data: { id: 3, name: "ratio" } });
    await tx.condition.create({ data: { id: 4, name: "control" } });

    // Insert task, group, group count seeds
    const pathes = fs.readdirSync(taskDirectory);
    for (let p of pathes) {
      const fullPath = join(taskDirectory, p);
      const contents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(contents);

      const task = await tx.task.create({
        data: {
          id: data["id"],
          title: data["title"] || "",
          query: data["query"] || "",
          description: data["description"] || "",
        },
      });

      await tx.group.create({ data: { conditionID: 1, taskID: task.id, counts: 0 } });
      await tx.group.create({ data: { conditionID: 2, taskID: task.id, counts: 0 } });
      await tx.group.create({ data: { conditionID: 3, taskID: task.id, counts: 0 } });
      await tx.group.create({ data: { conditionID: 4, taskID: task.id, counts: 0 } });
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // Automatically rollback
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
