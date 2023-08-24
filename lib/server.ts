import { Client } from "@notionhq/client";
const auth = 'secret_tMcpxQhFciONgHBqE0g1eg7eCFdEcYhexiAEI57qz9W';
const database = ""
  const notion = new Client({ auth })

const query = async () => {
  const response = await notion.databases.query({
    database_id: 'a75a91d3c30b4bb694c833c9cc0a960f',
  });
  console.log(notion.databases.query,'notion',response);

  return  response.results;
}

export {query}