import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Text {
  VALUE = "VALUE"
}



type UsersatMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Usersat {
  readonly id: string;
  readonly username?: Text | keyof typeof Text | null;
  readonly satid?: Text | keyof typeof Text | null;
  readonly userid?: Text | keyof typeof Text | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Usersat, UsersatMetaData>);
  static copyOf(source: Usersat, mutator: (draft: MutableModel<Usersat, UsersatMetaData>) => MutableModel<Usersat, UsersatMetaData> | void): Usersat;
}