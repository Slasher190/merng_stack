import { userResolvers } from "./User/userResolvers";
export default {
  Mutation: {
    ...userResolvers.Mutation,
  },
};
