export class Coordinates{
  lat?: string;
  lng?: string;

  public constructor(init?: Partial<Coordinates>){
    Object.assign(this, init)
  }
}


