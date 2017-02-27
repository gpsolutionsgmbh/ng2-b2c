import {QueryEncoder} from "@angular/http";
export class GptsQueryEncoder extends QueryEncoder {

  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

}
