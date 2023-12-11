import { PrismaClient } from "@prisma/client";
import { RegisterUserInput } from "./userType";
import { GraphQLError } from "graphql";
import { StatusCodes } from "../../../constants/statusCode";
const prisma = new PrismaClient();

export const userResolvers = {
  Mutation: {
    registerUser: async (
      _parent: unknown,
      { input }: { input: RegisterUserInput }
    ) => {
      const { email, password, street, zipcode, houseNumber, location } = input;

      try {
        if (!email || !password) {
          throw new GraphQLError("Please input Email and Password!!!", {
            extensions: {
              code: "METHOD_NOT_ALLOWED",
              http: {
                status: StatusCodes.METHOD_NOT_ALLOWED,
              },
            },
          });
        }

        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (user) {
          throw new GraphQLError("Email already exists", {
            extensions: {
              code: "EMAIL_ALREADY_EXISTS",
              http: {
                status: StatusCodes.BAD_REQUEST,
              },
            },
          });
        }

        let address;
        if (street || zipcode || houseNumber || location) {
          address = await prisma.address.create({
            data: {
              street: street || "undefined",
              zipcode: zipcode || "undefined",
              houseNumber: houseNumber || "undefined",
              location: location || "undefined",
            },
          });
        }

        const user_ = await prisma.user.create({
          data: {
            email,
            password,
            address: { connect: { id: address?.id } },
          },
        });

        if (!user_ || !user_.id) {
          throw new GraphQLError(
            "User creation failed. Please check the provided information.",
            {
              extensions: {
                code: "USER_CREATION_FAILED",
                http: {
                  status: StatusCodes.INTERNAL_SERVER_ERROR,
                },
              },
            }
          );
        }

        // if (!user_.addressId) {
        //   const data = {
        //     ...user_,
        //   };
        //   return { success: true, message: "User Register Successful!!", data };
        // }

        const data = {
          ...user_,
          // address: async () => {
          //   return (
          //     user_ &&
          //     user_.addressId &&
          //     (await prisma.address.findUnique({
          //       where: {
          //         id: user_.addressId,
          //       },
          //     }))
          //   );
          // },
        };

        return { success: true, message: "User Register Successful!!", data };
      } catch (error) {
        return { error };
      }
    },
  },
};
