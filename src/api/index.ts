import {formatPageInfo, formatContent} from '@/lib/transformer'
import {queryDatabase, retrievePage, getAllBlockContent} from '@/lib/notion'
import { IArticle } from '@/types/data'
import { IPageObject } from '@/types/notion'

export const getPage = async (page_id:string) => {
  const page = await retrievePage(page_id)
  const pageInfo = formatPageInfo(page as IPageObject)
  const content = await getAllBlockContent(page_id)
  const contentInfo = content.map((block) => formatContent(block))
  return {
    ...pageInfo,
    contentInfo
  }
}
export const getBlogs = async (database_id:string):Promise<IArticle[]> => {
  const dbRes = await queryDatabase({
    database_id,
    filter: {
      property: 'Status',
      status: {
        equals: 'Blog',
      }
    }
  })
  return dbRes.results.map((page) => formatPageInfo(page as IPageObject))
}


export const getPageContent = async (pageId: string) => {
    const blocks = await getAllBlockContent(pageId);

    const blocksChildren = await Promise.all(
      blocks.map(async (block) => {
        const test = block as any
        const { id } = test;
        if (!['unsupported', 'child_page'].includes(block.type) && block.has_children) {
           const childrenContent = await getPageContent(id);
          test.children = childrenContent
        }

        return formatContent(test);
      }),
    );

    // return Promise.all(
    //   blocksChildren.map(async (block) => {
    //     // return BlockTypeTransformLookup[block.type as BlockType](block);
    //     return formatContent(block)
    //   }),
    // )
    // .then((blocks) => {
    //   return blocks.reduce((acc: any, curr) => {
    //     if (curr.type === 'bulleted_list_item') {
    //       if (acc[acc.length - 1]?.type === 'bulleted_list') {
    //         acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
    //       } else {
    //         acc.push({
    //           type: 'bulleted_list',
    //           bulleted_list: { children: [curr] },
    //         });
    //       }
    //     } else if (curr.type === 'numbered_list_item') {
    //       if (acc[acc.length - 1]?.type === 'numbered_list') {
    //         acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
    //       } else {
    //         acc.push({
    //           type: 'numbered_list',
    //           numbered_list: { children: [curr] },
    //         });
    //       }
    //     } else {
    //       acc.push(curr);
    //     }
    //     return acc;
    //   }, []);
    // });
    return blocksChildren

};
