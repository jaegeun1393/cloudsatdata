import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Text {
  VALUE = "VALUE"
}



type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Users {
  readonly id: string;
  readonly pswd?: Text | keyof typeof Text | null;
  readonly uid?: Text | keyof typeof Text | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}