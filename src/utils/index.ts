export function formatHashLink(link_text: string) {
  return link_text.toLowerCase().replace(/ /g, '-')
}