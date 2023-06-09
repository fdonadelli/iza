import 'module-alias/register';
import { ServerApplication } from './v1/users/application/ServerApplication';

(async (): Promise<void> => {
  await runApplication();
})();

async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}
