
import { IBlock } from './block.interface';
import { Block } from './block.class';
import { Point } from './point.class';

export class RZBlock extends Block implements IBlock {
    public rotateIdx = 0;
    public colorIdx = 6;
    public rootPoint = new Point(4, 0);


    getRotateBody(idx: number) {
        let result: Point[];
        switch (idx % 2) {
            case 0:
                result = [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(-1, 1)];
                break;
            case 1:
                result = [new Point(0, 0), new Point(0, -1), new Point(1, 0), new Point(1, 1)];
                break;
        }
        return result;
    }
}
