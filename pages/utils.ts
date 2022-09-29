interface ILink {
  url: string
  title: string
}

export const findURLInStr = (str: string): Promise<ILink[]> => {
  const urlRegx =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  const titleRegx = /<title>([^<]*)<\/title>/

  const links = str.match(urlRegx) || []

  const promises = links.map(async (l) => {
    try {
      const res = await fetch(l)
      const html = await res.text()
      const titles = html.match(titleRegx) || []
      return {
        url: l,
        title: titles[1],
      }
    } catch (error) {
      return {
        title: '',
        url: l,
      }
    }
  })
  return Promise.all(promises)
}

export const findMentionsInStr = (str: string): string[] => {
  if (!str) {
    return []
  }

  const regx = /(^|[^\w])@([\w\_\.]+)/g

  return str.match(regx) ?? []
}

export const findEmoticonsInStr = (str: string): string[] => {
  if (!str) {
    return []
  }
  const regx = /\([-a-zA-Z0-9]{0,15}\)/gi
  return str.match(regx) ?? []
}
