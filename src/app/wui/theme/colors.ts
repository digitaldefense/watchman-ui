import { Injectable } from '@angular/core';
import { get as _get } from 'lodash';

import { PALETTE } from './palette';

@Injectable()
export class Colors {

    constructor() {}

    get(value: string): string {
        return <string>_get(PALETTE, value);
    }
}
