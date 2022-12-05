-- CreateTable
CREATE TABLE "Condition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conditionID" INTEGER NOT NULL,
    "taskID" INTEGER NOT NULL,
    "groupCountId" INTEGER NOT NULL,
    CONSTRAINT "Group_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Group_conditionID_fkey" FOREIGN KEY ("conditionID") REFERENCES "Condition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupID" INTEGER NOT NULL,
    "counts" INTEGER NOT NULL,
    CONSTRAINT "GroupCount_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupCount_groupID_key" ON "GroupCount"("groupID");
