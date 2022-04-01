import { getNewUsers } from './get-new-users';

export const cronRun = async () => {
  console.log('CRON WAS STARTED');
  await getNewUsers();
}
