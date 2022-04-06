import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Text {
  VALUE = "VALUE"
}



type StudentlstMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersatMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Studentlst {
  readonly id: string;
  readonly name?: string | null;
  readonly sid?: Text | keyof typeof Text | null;
  readonly tid?: Text | keyof typeof Text | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Studentlst, StudentlstMetaData>);
  static copyOf(source: Studentlst, mutator: (draft: MutableModel<Studentlst, StudentlstMetaData>) => MutableModel<Studentlst, StudentlstMetaData> | void): Studentlst;
}

export declare class Usersat {
  readonly id: string;
  readonly authid?: Text | keyof typeof Text | null;
  readonly tid?: Text | keyof typeof Text | null;
  readonly name?: Text | keyof typeof Text | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Usersat, UsersatMetaData>);
  static copyOf(source: Usersat, mutator: (draft: MutableModel<Usersat, UsersatMetaData>) => MutableModel<Usersat, UsersatMetaData> | void): Usersat;
}