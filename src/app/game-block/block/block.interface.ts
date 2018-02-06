import { Point } from './point.class';

export interface IBlock {
    rotateIdx: number;
    colorIdx: number;
    rootPoint: Point;

    create();
    rotate();
    getRotateBody(idx: number);

}
