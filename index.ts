import { PrismaClient } from "@prisma/client";
import { server } from "./src/app";
import { startStandaloneServer } from "@apollo/server/standalone";


const prisma = new PrismaClient();

async function main() {}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const connect = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || '8000') },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

connect();
