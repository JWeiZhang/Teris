import { IBlock } from './block.interface';
import { Block } from './block.class';
import { Point } from './point.class';

export class TBlock extends Block implements IBlock {
    public rotateIdx = 0;
    public colorIdx = 2;
    public rootPoint = new Point(4, 1);


    getRotateBody(idx: number) {
        let result: Point[];
        switch (idx % 4) {
            case 0:
                result = [new Point(0, 0), new Point(1, 0), new Point(-1, 0), new Point(0, -1)];
                break;
            case 1:
                result = [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(0, -1)];
                break;
            case 2:
                result = [new Point(0, 0), new Point(1, 0), new Point(-1, 0), new Point(0, 1)];
                break;
            case 3:
                result = [new Point(0, 0), new Point(0, 1), new Point(-1, 0), new Point(0, -1)];
                break;

        }
        return result;
    }
}
