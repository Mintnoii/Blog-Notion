import React from 'react'
import {Text} from '@/components/typography'
const renderBlocks = (block:any) => {
  const { type, id } = block
  console.log(block.rich_text,block,'blockblockblockblock');
  switch (type) {
    case 'paragraph':
      return (
        <p className="text-sm text-neutral-800 dark:text-neutral-300">
          <Text text={block.rich_text} />
        </p>
      )
    // case 'heading_1':
    //   return (
    //     <h1 className="font-bold mb-2 text-3xl text-neutral-800 dark:text-neutral-300">
    //       <AnchorLink text={value.text[0].text.content}>
    //         <Text text={value.text} />
    //       </AnchorLink>
    //     </h1>
    //   )
    // case 'heading_2':
    //   return (
    //     <h2 className="font-semibold text-lg pb-6 text-neutral-800 dark:text-neutral-300">
    //       <AnchorLink text={value.text[0].text.content}>
    //         <Text text={value.text} />
    //       </AnchorLink>
    //     </h2>
    //   )
    // case 'heading_3':
    //   return (
    //     <h3 className="font-semibold text-xl mb-2 text-neutral-800 dark:text-neutral-300">
    //       <AnchorLink text={value.text[0].text.content}>
    //         <Text text={value.text} />
    //       </AnchorLink>
    //     </h3>
    //   )
    // case 'bulleted_list_item':
    //   return (
    //     <li className="text-sm ml-4 text-neutral-800 dark:text-neutral-300">
    //       <Text text={value.text} />
    //     </li>
    //   )
    // case 'numbered_list_item':
    //   return (
    //     <li>
    //       <Text text={value.text} />
    //     </li>
    //   )
    // case 'to_do':
    //   return (
    //     <div>
    //       <label
    //         htmlFor={id}
    //         className="flex space-x-3 items-center justify-start"
    //       >
    //         <input
    //           id={id}
    //           aria-describedby={value.text}
    //           name={id}
    //           type="checkbox"
    //           className="rounded border-gray-300 h-4 text-teal-500 w-4 focus:ring-teal-500"
    //         />
    //         <Text text={value.text} />
    //       </label>
    //     </div>
    //   )
    // case 'toggle':
    //   return (
    //     <details>
    //       <summary>
    //         <Text text={value.text} />
    //       </summary>
    //       {value.children?.map((block) => (
    //         <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
    //       ))}
    //     </details>
    //   )
    // case 'child_page':
    //   return <p>{value.title}</p>
    // case 'image':
    //   const src =
    //     value.type === 'external' ? value.external.url : value.file.url
    //   const caption =
    //     value.caption.length >= 1 ? value.caption[0].plain_text : ''
    //   return (
    //     <figure className="mt-0">
    //       <Image
    //         className=""
    //         objectFit="cover"
    //         width={500}
    //         height={500}
    //         alt={
    //           caption
    //             ? caption
    //             : 'A visual depiction of what is being written about'
    //         }
    //         src={src}
    //       />
    //       {caption && (
    //         <figcaption className="text-center">{caption}</figcaption>
    //       )}
    //     </figure>
    //   )
    // case 'code':
    //   return (
    //     <div>
    //       <CodeBlock
    //         language={value.language}
    //         code={value.text[0].text.content}
    //       />
    //     </div>
    //   )
    // case 'bookmark':
    //   return (
    //     <div className="flex=col flex">
    //       <Link href={value.url}>
    //         <a>{value.url}</a>
    //       </Link>
    //     </div>
    //   )

    // case 'callout':
    //   return (
    //     <Callout>
    //       {value.icon && <span>{value.icon.emoji}</span>}
    //       <div>
    //         <Text text={value.text} />
    //       </div>
    //     </Callout>
    //   )
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
    // case 'quote':
    //   return (
    //     <blockquote className="rounded-r-lg p-4">
    //       <Text text={value.text} />
    //     </blockquote>
    //   )
    // case 'divider':
    //   return (
    //     <hr className="border-none h-10 my-16 text-center w-full before:text-2xl before:text-[#D1D5DB] '∿∿∿']"></hr>
    //   )
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}

export default renderBlocks