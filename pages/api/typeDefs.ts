export const typeDefs = /* GraphQL */ `
  type Query {
    records(message: String): [MessageType]
  }
  type MessageType {
    mentions: [String]
    emoticons: [String]
    links: [LinkType]
  }

  type LinkType {
    url: String
    title: String
  }
`