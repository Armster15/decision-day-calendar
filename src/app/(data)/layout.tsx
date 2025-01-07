import { PropsWithChildren } from "react";
import { JSDOM } from "jsdom";
import { DataContextProvider, type Data } from "$/lib/context";
import { dummyData } from "./dummy-data";

// Refetch every day
export let revalidate = 60 * 60 * 24;

// ChatGPT
function tableToJson(table: HTMLTableElement) {
  const rows = table.querySelectorAll("tr");
  const headers = Array.from(rows[0].querySelectorAll("th")).map(
    (header) => header.textContent || ""
  );

  const jsonData = [];
  for (let i = 1; i < rows.length; i++) {
    // Skip the header row
    const cells = Array.from(rows[i].querySelectorAll("td"));
    const rowData = {};
    cells.forEach((cell, index) => {
      const content = getTextWithSpaces(cell);

      // @ts-expect-error
      rowData[headers[index]] = content || "";
    });
    jsonData.push(rowData);
  }

  return jsonData;
}

// ChatGPT
function getTextWithSpaces(node: Node) {
  // Initialize an empty array to hold the text
  let textArray: string[] = [];

  // Iterate over the child nodes
  node.childNodes.forEach((child) => {
    // Node.TEXT_NODE
    if (child.nodeType === 3) {
      // Add text nodes directly, trimming whitespace
      if (child.textContent) {
        const text = child.textContent.trim();
        textArray.push(text);
      }
    }

    // Node.ELEMENT_NODE
    else if (child.nodeType === 1) {
      // Recursively handle element nodes
      textArray.push(getTextWithSpaces(child));
    }
  });

  // Join the collected text with a space
  return textArray.join(" ");
}

export default async function Layout({ children }: PropsWithChildren) {
  // So we don't make a ton of fetch requests in dev mode
  if (process.env.NODE_ENV === "development") {
    return (
      <DataContextProvider
        value={{ data: dummyData, revalidateDate: new Date(0) }}
      >
        {children}
      </DataContextProvider>
    );
  }

  const res = await fetch(
    "https://applyingto.college/decision-calendar/class-of-2029"
  );
  const resDateStr = res.headers.get("Date");
  const revalidateDate = resDateStr ? new Date(resDateStr) : new Date();

  console.log("Refetch", revalidateDate);

  const html = await res.text();
  const dom = new JSDOM(html);

  const table = dom.window.document.querySelector("table");
  if (!table) {
    throw new Error("No table!");
  }

  const rawJson = tableToJson(table) as Data;

  const json = rawJson.map((val) => ({
    ...val,
    Name: val.Name.startsWith("🎓 ")
      ? val.Name.substring("🎓 ".length)
      : val.Name,
  })) satisfies Data;

  return (
    <DataContextProvider value={{ data: json, revalidateDate }}>
      {children}
    </DataContextProvider>
  );
}
