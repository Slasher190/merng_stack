import { Address, PrismaClient } from "@prisma/client";
import { RegisterUserInput, RegisterUserResponse } from "./userType";
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
          email,
        },
      });

      if (user) {
        throw new GraphQLError("User already exist", {
          extensions: {
            code: "METHOD_NOT_ALLOWED",
            http: {
              status: StatusCodes.BAD_REQUEST,
            },
          },
        });
      }

      const address: Address | null =
        street || zipcode || houseNumber || location
          ? await prisma.address.create({
              data: {
                street: street || "undefined",
                zipcode: zipcode || "undefined",
                houseNumber: houseNumber || "undefined",
                location: location || "undefined",
              },
            })
          : null;

      if (address && address.id) {
        const user_ = await prisma.user.create({
          data: {
            email,
            password,
            address: { connect: { id: address.id } },
          },
        });

        const data: RegisterUserResponse = {
          id: user_.id,
          email: user_.email,
          password: user_.password,
          address: address,
        };

        console.log(data);
        return { success: true, message: "User Register Successful!!", data };
      } else {
        throw new GraphQLError(
          "User creation failed. Address creation failed or has no ID.",
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
    },
  },
};
