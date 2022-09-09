import * as React from 'react'
import { GetStaticProps } from 'next'
import { domain } from '../lib/config'
import { getSiteMap } from '../lib/site'
import { resolveNotionPage } from '../lib/page'
import { PageProps, Params } from '../types'
import { NotionPage } from 'components'

// 此函数在构建时被调用
export const getStaticProps: GetStaticProps<PageProps, Params> = async (context) => {
  const rawPageId = context.params.pageId as string
  try {
    const props = await resolveNotionPage(domain, rawPageId)
    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)
    throw err
  }
}

export async function getStaticPaths() {
  const siteMap = await getSiteMap()
  console.log(siteMap,'siteMap')
  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    // paths: [],
    fallback: true
  }

  console.log(staticPaths.paths)
  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}
