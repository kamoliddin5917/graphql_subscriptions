const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    message: [Message]!
  }
  type Message {
    text: String!
    createdBy: String!
  }
  input MessageInput {
    text: String!
    username: String!
  }
  type Mutation {
    createMessage(messageInput: MessageInput!): Message!
  }
  type Subscription {
    messageCreated: Message
  }
`;
