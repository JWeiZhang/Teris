import { IBlock } from './block.interface';
import { Point } from './point.class';

export class Block implements IBlock {
    rotateIdx: number;
    colorIdx: number;
    rootPoint: Point;

    create() {
        return this.getRotateBody(this.rotateIdx).map((item, idx) => {
            return new Point(item.x + this.rootPoint.x, item.y + this.rootPoint.y);
        });
    }
    rotate() {
        const shape: Point[] = this.getRotateBody(this.rotateIdx + 1).map((item, idx) => {
            return new Point(item.x + this.rootPoint.x, item.y + this.rootPoint.y);
        });
        return shape;
    }

    public getRotateBody(idx: number) {
        return [];
    }

    private canRotate(changeBlock: Point[], sourcePoint: Point) {
        for (let i = 0; i < changeBlock.length; i++) {
            if (changeBlock[i].x + sourcePoint.x < 0 || changeBlock[i].x + sourcePoint.y > 9) {
                return false;
            }
        }
        return true;
    }

}
