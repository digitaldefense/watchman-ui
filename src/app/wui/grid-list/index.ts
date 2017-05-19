import {NgModule} from '@angular/core';
// import {MdLineModule, MdCommonModule} from '../core';
import {
  FlGridTile, FlGridTileOverlay
} from './grid-tile';
import { FlGridList } from './grid-list';


@NgModule({
  exports: [
    FlGridList,
    FlGridTile,
    FlGridTileOverlay,
  ],
  declarations: [
    FlGridList,
    FlGridTile,
    FlGridTileOverlay,
  ],
})
export class FlGridListModule {}

export * from './grid-list';
export { FlGridTile } from './grid-tile';
