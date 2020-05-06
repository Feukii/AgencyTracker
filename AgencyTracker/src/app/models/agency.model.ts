export class AgencyModel {
    photo: string;
    synopsis: string;
    constructor(public name: string,
                public town: string,
                public district: string,
                public latitude: any,
                public longitude: any) {
    }
}