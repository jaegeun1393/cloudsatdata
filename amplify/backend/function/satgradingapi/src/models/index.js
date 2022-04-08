// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Text = {
  "VALUE": "VALUE"
};

const { Studentlst, Usersat } = initSchema(schema);

export {
  Studentlst,
  Usersat,
  Text
};