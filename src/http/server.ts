import { App } from '../app';

const app = new App();
const PORT = process.env.PORT;

app.server.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);

});