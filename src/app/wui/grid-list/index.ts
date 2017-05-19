import {NgModule} from '@angular/core';
// import {MdLineModule, MdCommonModule} from '../core';
import {
  MdGridTile, FlGridTileOverlay, MdGridTileText, MdGridTileFooterCssMatStyler,
  MdGridTileHeaderCssMatStyler, MdGridAvatarCssMatStyler
} from './grid-tile';
import {MdGridList} from './grid-list';


@NgModule({
  // imports: [MdLineModule, MdCommonModule],
  exports: [
    MdGridList,
    MdGridTile,
    FlGridTileOverlay,
    MdGridTileText,
    // MdLineModule,
    // MdCommonModule,
    MdGridTileHeaderCssMatStyler,
    MdGridTileFooterCssMatStyler,
    MdGridAvatarCssMatStyler
  ],
  declarations: [
    MdGridList,
    MdGridTile,
    FlGridTileOverlay,
    MdGridTileText,
    MdGridTileHeaderCssMatStyler,
    MdGridTileFooterCssMatStyler,
    MdGridAvatarCssMatStyler
  ],
})
export class MdGridListModule {}


export * from './grid-list';
export {MdGridTile} from './grid-tile';
