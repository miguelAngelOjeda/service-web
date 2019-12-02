import {Rules} from "../models";
export class Filter {
    _search: boolean = false;
    page: number = 1;
    rows: number = 10;
    sidx: string = "id";
    sord: string = "desc";
    all: boolean = false;
    filters: string;
}
