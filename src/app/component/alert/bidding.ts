export class Bidding {
    _id: number = 2;
    lat: number = 123;
    lng: number = 111;
    product: string;
    qtd: string = '200';
    tags: Array<Tag>;
    tag_id: string;
    
    constructor() {
        this.tags = new Array();
    }
}

class Tag {
    private checked: boolean;
    private description: string;
}