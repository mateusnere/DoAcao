export class Evento {
    constructor(
        public idUser: string,
        public nome: string = '',
        public local: string = '',
        public data: string = '',
        public descricao: string = '',
        public uid: string
    ){}
}