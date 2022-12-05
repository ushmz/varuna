/*
  Warnings:

  - You are about to drop the `GroupCount` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupCountId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Group` table. All the data in the column will be lost.
  - Added the required column `counts` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GroupCount_groupID_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GroupCount";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "conditionID" INTEGER NOT NULL,
    "taskID" INTEGER NOT NULL,
    "counts" INTEGER NOT NULL,

    PRIMARY KEY ("conditionID", "taskID"),
    CONSTRAINT "Group_conditionID_fkey" FOREIGN KEY ("conditionID") REFERENCES "Condition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Group_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("conditionID", "taskID") SELECT "conditionID", "taskID" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
