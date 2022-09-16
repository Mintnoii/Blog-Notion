import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { NotionRenderer } from 'react-notion-x'
import { getPageTitle } from 'notion-utils'
import * as types from 'types'
import { Page404 } from './Page404'
import { PageHeader } from './PageHeader'
import { themeModeState } from '@/model'
import { useRecoilValue } from 'recoil'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // 默认支持 js、ts、css, 其他的手动添加 也可以改成一个配置项
    await Promise.all([
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-uri.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-json.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-jsx.js'),
      import('prismjs/components/prism-tsx.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js'),
    ])
    return m.Code
  })
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
// const Pdf = dynamic(
//   () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
//   {
//     ssr: false
//   }
// )
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
)

/**
 * Notion 页面组件
 * site
 * recordMap 内容
 * error 错误信息
 * pageId 页面 id
 */
export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId,
}) => {
  const router = useRouter()
  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value
  const isDarkMode = useRecoilValue(themeModeState)

  console.log(error, site, block)
  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  // if (router.isFallback) {
  //   return <Loading />
  // }

  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  // console.log(title, recordMap)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={isDarkMode}
        rootDomain={site.domain}
        rootPageId={site.rootNotionPageId}
        // previewImages={previewImagesEnabled}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          // Pdf,
          Modal,
          Header: PageHeader,
        }}
      />
    </>
  )
}
