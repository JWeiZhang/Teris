import { IBlock } from './block.interface';
import { Block } from './block.class';
import { Point } from './point.class';

export class LineBlock extends Block implements IBlock {
    public rotateIdx = 0;
    public colorIdx = 3;
    public rootPoint = new Point(4, 0);


    getRotateBody(idx: number) {
        let result: Point[];
        switch (idx % 2) {
            case 0:
                result = [new Point(-1, 0), new Point(0, 0), new Point(1, 0), new Point(2, 0)];
                break;
            case 1:
                result = [new Point(0, -1), new Point(0, 0), new Point(0, 1), new Point(0, 2)];
                break;

        }
        return result;
    }
}
