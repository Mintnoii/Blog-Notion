import React, {Fragment} from 'react'
import {Text} from '@/components/typography'
import {AnchorLink} from '@/components/links'
import {CodeBlock,Link} from '@/components/ui'

//TODO: improve types here, cleanup the code
export const renderBlock = (block:any) => {
  const { id, type, rich_text, has_children, children,checked,image,caption,language,url} = block
  switch (type) {
    case 'heading_1':
      return (
        <h1 className="font-bold mb-2 text-3xl text-neutral-800 dark:text-neutral-300">
          <AnchorLink text={rich_text[0].content}>
            <Text rich_text={rich_text} />
          </AnchorLink>
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="font-semibold mb-2 text-2xl text-neutral-800 dark:text-neutral-300">
           <AnchorLink text={rich_text[0].content}>
            <Text rich_text={rich_text} />
          </AnchorLink>
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className="font-semibold text-xl mb-2 text-neutral-800 dark:text-neutral-300">
          <AnchorLink text={rich_text[0].content}>
            <Text rich_text={rich_text} />
          </AnchorLink>
        </h3>
      )
    case 'paragraph':
      return (
        <p className="text-neutral-800 dark:text-neutral-300">
          <Text rich_text={rich_text} />
        </p>
      )
    case 'bulleted_list':
      return (
        <ul className='list-disc'>
           {children.map((block:any) => (renderBlock(block)))}
        </ul>
    )
     case 'bulleted_list_item':
      return (
        <li className="ml-4 py-0.5 text-neutral-800 dark:text-neutral-300">
          <Text rich_text={rich_text} />
          { has_children && (children.map((block:any) => (renderBlock(block))))}
        </li>
      )
    case 'numbered_list':
      return (
        <ol className='list-decimal'>
           {children.map((block:any) => (renderBlock(block)))}
        </ol>
    )
    case 'numbered_list_item':
      return (
        <li className="ml-4 py-0.5 text-neutral-800 dark:text-neutral-300">
          <Text rich_text={rich_text} />
          { has_children && (children.map((block:any) => (renderBlock(block))))}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label
            htmlFor={id}
            className="flex space-x-3 items-center justify-start"
          >
            <input
              id={id}
              name={id}
              type="checkbox"
              checked={checked || false}
              className="rounded border-gray-300 h-4 text-teal-500 w-4 focus:ring-teal-500"
            />
            <Text rich_text={rich_text} />
          </label>
        </div>
      )
     case 'toggle':
      return (
        <details>
          <summary>
            <Text rich_text={rich_text} />
          </summary>
          {has_children && children.map((block:any) => (<Fragment key={block.id}>{renderBlock(block)}</Fragment>))}
        </details>
      )
    case 'quote':
      return (
        <blockquote className="rounded-r-lg border-l-gray-500 border-l-2 p-1 ps-2">
         <Text rich_text={rich_text} />
        </blockquote>
      )
    case 'child_page':
      // todo 待优化
      return <p>{block.title}</p>
    case 'callout':
      return (
        <div className="rounded-lg flex space-x-4 bg-gray-50 p-3 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
           {block.icon && <span>{block.icon.emoji}</span>}
          <Text rich_text={rich_text} />
        </div>
      )
    case 'image':
      const src = image.type === 'external' ? image.external.url : image.file.url
      const figcaption = caption.length >= 1 ? caption[0].plain_text : ''
      return (
        <figure className="mt-0">
          <img src={src} alt={figcaption} />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    case 'code':
      return (
        <div className='font-mono text-sm'>
          <CodeBlock
            language={language}
            rich_text={rich_text}
          />
        </div>
      )
    case 'link_preview':
    case 'bookmark':
      const content = caption?.length ? caption[0].plain_text : url
      return (
        <Link href={url} isExternal showAnchorIcon>
          {content}
        </Link>
      )
    case 'column_list':
    case 'column':
      return (
        <div className='flex mx-1'>
          {has_children && children.map((block:any) => (<Fragment key={block.id}>{renderBlock(block)}</Fragment>))}
        </div>
      )
    case 'divider':
      return (
        <hr className="bg-gray h-0.5 my-2 w-full dark:bg-slate-800"></hr>
      )
    default:
      return `👾 Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}
    // case 'embed':
    //   const codePenEmbedKey = value.url.slice(value.url.lastIndexOf('/') + 1)
    //   return (
    //     <div>
    //       <iframe
    //         height="600"
    //         className="w-full"
    //         scrolling="no"
    //         title="Postage from Bag End"
    //         src={`https://codepen.io/thienjs/embed/preview/${codePenEmbedKey}?default-tab=result`}
    //         frameBorder="no"
    //         loading="lazy"
    //         allowFullScreen={true}
    //       >
    //         See the Pen <a href={value.url}></a> by Thien Tran (
    //         <a href="https://codepen.io/thienjs">@thienjs</a>) on{' '}
    //         <a href="https://codepen.io">CodePen</a>.
    //       </iframe>
    //     </div>
    //   )
    // case 'table_of_contents':
    //   return <div>TOC</div>
    // case 'video':
    //   return <YoutubeEmbed url={value.external.url} />

export const renderBlocks = (blocks:any) => {
  return blocks.map((block:any) => (
    <div key={block.id} className='p-0.5'>
      {renderBlock(block)}
    </div>
  ))
}