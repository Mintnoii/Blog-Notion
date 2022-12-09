export const Text = (rich_text:any) => {
  if (!rich_text) {
    return null
  }
  return rich_text.map((value:any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        key={value.id}
        className={[
          bold ? 'font-bold' : null,
          italic ? 'italic' : null,
          code
            ? 'mx-1 inline-block rounded-md bg-cyan-200 py-0.5 px-2 align-middle text-base tracking-tight text-indigo-500 dark:bg-cyan-900 dark:bg-opacity-50 dark:text-indigo-200'
            : null,
          strikethrough ? 'line-through' : null,
          underline ? 'underline' : null,
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    )
  })
}

export default Text