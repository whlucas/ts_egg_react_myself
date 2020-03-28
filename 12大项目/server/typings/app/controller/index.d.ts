// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMovie from '../../../app/controller/movie';
import ExportPageInit from '../../../app/controller/pageInit';

declare module 'egg' {
  interface IController {
    movie: ExportMovie;
    pageInit: ExportPageInit;
  }
}
