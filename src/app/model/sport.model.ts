import { Genre } from "./genre.model";
import { Image } from "./Image.model";

export class Sport{
    idSport! : number;
    nomSport! : string;
    sexe!: string;
    dateTournoi! : Date ;
    genre!  : Genre; 
    image! : Image
    imageStr!: string
    }
    