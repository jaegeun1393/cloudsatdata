// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Text = {
  "VALUE": "VALUE"
};

const { Users } = initSchema(schema);

export {
  Users,
  Text
};