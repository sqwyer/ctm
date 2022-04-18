import * as main from '../src/index';

const tourney = new main.Tourney();

tourney.addFile('./test/test.csv', (err: any, data: any) => {
    console.log(data);
});