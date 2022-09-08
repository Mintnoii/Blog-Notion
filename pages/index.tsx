import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'
import * as notion from '../lib/notion'
import { NotionPage } from '../components/NotionPage'
import * as config from '../lib/config'

export const getStaticProps = async () => {
	console.log(config.rootNotionPageId,'config.rootNotionPageId')
  const recordMap = await notion.getPage(config.rootNotionPageId)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
    />
  )
}


