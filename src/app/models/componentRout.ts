export interface DrpDwn {
    id: number;
    name: string;
    selectState: boolean;
    route: string;
}

export const components: DrpDwn[] = [
    {
        id:1,
        name:'Home',
        selectState: false,
        route: 'home',
      },
      {
        id:2,
        name:'Music',
        selectState: false,
        route: 'home',
      },
      {
        id:3,
        name:'Books',
        selectState: false,
        route: 'home',
      },
      {
        id:4,
        name:'Canvas',
        selectState: false,
        route: 'canvas-home',
      }
];