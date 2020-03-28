// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMovie from '../../../app/model/Movie';

declare module 'egg' {
  interface IModel {
    Movie: ReturnType<typeof ExportMovie>;
  }
}
