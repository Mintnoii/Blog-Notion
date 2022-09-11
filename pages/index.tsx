import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'
import * as notion from '../lib/notion'
import { NotionPage } from '../components/NotionPage'
import * as config from '../lib/config'
import { resolveNotionPage } from '../lib/page'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(config.domain)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', config.domain, err)
    throw err
  }
}
// Notion Blog 首页
export default function NotionHomePage(props) {
	// props 包括 site recordMap pageId
  return(

		<div className='bg-red-400'>
			<main>
			 <NotionPage {...props} />
		</main>
		</div>
	)
}

