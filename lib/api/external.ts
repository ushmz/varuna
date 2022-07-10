const pages = [
  {
    id: 0,
    title: "Sample page title",
    url: "https://example.com/",
    snippet: "Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet",
    attributes: [
      { name: "Third Party Tracking", value: "Yes", color: "#22C55E" },
      { name: "Data Retention", value: "limited", color: "#3B82F6" },
      { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
    ],
  },
  {
    id: 1,
    title: "Sample page title",
    url: "https://example.com/",
    snippet: "Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet",
    attributes: [
      { name: "Third Party Tracking", value: "Yes", color: "#22C55E" },
      { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
      { name: "Data Retention", value: "limited", color: "#3B82F6" },
    ],
  },
  {
    id: 2,
    title: "Sample page title",
    url: "https://example.com/",
    snippet: "Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet",
    attributes: [
      { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
      { name: "Third Party Tracking", value: "Yes", color: "#22C55E" },
      { name: "Data Retention", value: "limited", color: "#3B82F6" },
    ],
  },
  {
    id: 3,
    title: "Sample page title",
    url: "https://example.com/",
    snippet: "Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet",
    attributes: [
      { name: "Data Retention", value: "limited", color: "#3b82f6" },
      { name: "Third Party Tracking", value: "Yes", color: "#22c55e" },
      { name: "Access Scope", value: "Edit / Delete", color: "#ef4444" },
    ],
  },
];

type Attribute = {
  name: string;
  value: string;
  color: string;
};

export type SearchPage = {
  id: number;
  title: string;
  url: string;
  snippet: string;
  attributes: Attribute[];
};

export const getSearchResults = async (taskID: number, offset: number): Promise<SearchPage[]> => {
  console.log(taskID, offset);
  return [...pages];
};

export type ClickLog = {
  userID: string;
  taskID: number;
  pageID: number;
  isFirstClick?: boolean;
  dwellTime: number;
};

export const postClickLog = async (p: ClickLog): Promise<void> => {
  console.log(p);
  return;
};

export type DwellTimeLog = {
  userID: string;
  taskID: number;
  pageID: number;
};

export const postDwellTimeLog = async (p: DwellTimeLog): Promise<void> => {
  console.log(p);
  return;
};
