import { findMentionsInStr, findURLInStr, findEmoticonsInStr } from '../utils'

interface IRecords {
  message: string
}

const resolvers = {
  Query: {
    async records(_: any, args: IRecords) {
      const { message } = args
      console.log(message)
      if (!message) {
        throw Error('Empty message')
      }
      try {
        const links = await findURLInStr(message)
        const mentions = findMentionsInStr(message)
        const emoticons = findEmoticonsInStr(message)
        return [
          {
            mentions,
            links,
            emoticons,
          },
        ]
      } catch (error) {
        return []
      }
    },
  },
}

export default resolvers
