import { DateTime } from "ionic-angular/components/datetime/datetime";

export class Campanha {
    constructor(
        public idUser: string,
        public nome: string,
        public data: DateTime,
        public descricao: string,
        public uid: string){}
}