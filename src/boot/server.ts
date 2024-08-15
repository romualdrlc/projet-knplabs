import { boot } from 'quasar/wrappers';
import DomainServiceServer from 'src/domain/Service/DomainServiceServer';

const server = new DomainServiceServer();

export default boot(({ app }) => {
  app.config.globalProperties.$server = server;
});

export { server };
