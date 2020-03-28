// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportMovie from '../../../app/service/movie';
import ExportTest from '../../../app/service/Test';
import ExportTools from '../../../app/service/tools';

declare module 'egg' {
  interface IService {
    movie: AutoInstanceType<typeof ExportMovie>;
    test: AutoInstanceType<typeof ExportTest>;
    tools: AutoInstanceType<typeof ExportTools>;
  }
}
