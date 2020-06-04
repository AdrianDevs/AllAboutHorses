export interface Horse {
  id: string;
  name: string;
  profile: Profile;
}

interface Profile {
  favouriteFood: string;
  physical: Physical;
}

interface Physical {
  height: number;
  weight: number;
}
