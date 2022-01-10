const message = [];
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

module.exports = {
  Query: { message: async () => message },
  Mutation: {
    createMessage: async (_, { messageInput: { text, username } }) => {
      const newMessage = {
        text,
        createdBy: username,
      };
      message.push(newMessage);

      pubSub.publish("MESSAGE_CREATED", {
        messageCreated: newMessage,
      });

      return newMessage;
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubSub.asyncIterator("MESSAGE_CREATED"),
    },
  },
};
