import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/pool";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  //em producao deve ser um variavel de ambiente
  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  fastify.register(authRoutes);
  fastify.register(gameRoutes);
  fastify.register(poolRoutes);
  fastify.register(userRoutes);
  fastify.register(guessRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
