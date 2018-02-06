import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { SquareBlock } from './block/squareBlock.class';
import { TBlock } from './block/tBlock.class';
import { LineBlock } from './block/iBlock.class';
import { LLBlock } from './block/lLBlock.class';
import { RLBlock } from './block/rLBlock.class';
import { LZBlock } from './block/lZBlock.class';
import { RZBlock } from './block/rZBlock.class';
import { Point } from './block/point.class';

@Component({
  selector: 'app-game-block',
  templateUrl: './game-block.component.html',
  styleUrls: ['./game-block.component.css']
})
export class GameBlockComponent implements OnInit {

  public data: number[][] = [];
  public type: number;
  public squareStyle: number;
  public nowBlock: any;

  public style2: number[][][] = [[[0, 0], [1, 0], [2, 0], [3, 0]], [[0, 0], [0, 1], [0, 2], [0, 3]]];
  constructor(
    private renderer: Renderer
  ) {
    // this.data.push([0, 0, 0, 0, -1, -1, 0, 0, 0, 0]);
    // this.data.push([0, 0, 0, 0, -1, -1, 0, 0, 0, 0]);
    for (let y = 0; y < 22; y++) {
      const temp = [];
      for (let x = 0; x < 10; x++) {
        // temp.push(Math.random() > 0.5 ? 1 : 0);
        temp.push(0);
      }
      this.data.push(temp);
    }
    this.createNewObject();

  }

  ngOnInit() {
    setInterval(() => {
      const dropResult = this.canDrop();
      if (dropResult === 1) {
        this.drop();
      } else if (dropResult === 0) {
        this.stop();
        this.createNewObject();
      } else {
        console.log('Over');
      }
    }, 300);
  }

  ngAfterViewInit() {
    this.renderer.listen(document.body, 'keydown', this.onKeyDown.bind(this));
  }

  stop() {
    for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.data[y][x] < 0) {
          this.data[y][x] *= -1;
        }
      }

      let canClear = true;
      // 判斷是否可以消除列(整列不為0)
      for (let x = 0; x < 10; x++) {
        if (this.data[y][x] === 0) {
          canClear = false;
          break;
        }
      }

      if (canClear) {
        this.clearSquare(y);
      }
    }
  }

  canDrop() {
    for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.data[y][x] < 0 && (y + 1 > 21 || (this.data[y + 1][x] > 0))) {
          if (y === 2) {
            return 2;
          }
          return 0;
        }
      }
    }
    return 1;
  }

  drop() {
    this.nowBlock.rootPoint.y++;
    for (let y = 21; y > 0; y--) {
      for (let x = 0; x < 10; x++) {
        if (this.data[y][x] <= 0 && this.data[y - 1][x] < 0) {
          this.data[y][x] = this.data[y - 1][x];
          this.data[y - 1][x] = 0;
        }
      }
    }
  }

  createNewObject() {

    this.type = 0;//Math.floor(Math.random() * 7);
    let newSquare: Point[];
    switch (this.type) {
      case 0:
        this.nowBlock = new SquareBlock();
        newSquare = this.nowBlock.create();
        break;
      case 1:
        this.nowBlock = new TBlock();
        newSquare = this.nowBlock.create();
        break;
      case 2:
        this.nowBlock = new LineBlock();
        newSquare = this.nowBlock.create();
        break;
      case 3:
        this.nowBlock = new LLBlock();
        newSquare = this.nowBlock.create();
        break;
      case 4:
        this.nowBlock = new RLBlock();
        newSquare = this.nowBlock.create();
        break;
      case 5:
        this.nowBlock = new RZBlock();
        newSquare = this.nowBlock.create();
        break;
      case 6:
        this.nowBlock = new LZBlock();
        newSquare = this.nowBlock.create();
        break;
    }
    // this.squareStyle = 0;
    // 設定方塊位置
    this.setBlock(newSquare);
  }


  getSquareColor(num: number) {
    let color: string;
    switch (Math.abs(num)) {
      case 1:
        color = '#F0EE34';
        break;
      case 2:
        color = '#f0f';
        break;
      case 3:
        color = '#29F0EF';
        break;
      case 4:
        color = '#0921EC';
        break;
      case 5:
        color = '#EE9F26';
        break;
      case 6:
        color = '#26EE2B';
        break;
      case 7:
        color = '#f00';
        break;
    }
    return color;
  }

  onKeyDown(e: KeyboardEvent) {

    if (e.keyCode === 37 && this.canMove('left')) {
      this.moveSquare('left');
    }
    if (e.keyCode === 39 && this.canMove('right')) {
      this.moveSquare('right');
    }
    if (e.keyCode === 40 && this.canDrop()) {
      this.drop();
    }
    if (e.keyCode === 38) {

      this.Rotation();
    }

  }

  moveSquare(direction: string) {
    if (direction === 'left') {
      this.nowBlock.rootPoint.x--;
      for (let y = 21; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
          if (this.data[y][x] === 0 && this.data[y][x + 1] < 0) {
            this.data[y][x] = this.data[y][x + 1];
            this.data[y][x + 1] = 0;
          }
        }
      }
    } else if (direction === 'right') {
      this.nowBlock.rootPoint.x++;
      for (let y = 21; y >= 0; y--) {
        for (let x = 9; x > 0; x--) {
          if (this.data[y][x] === 0 && this.data[y][x - 1] < 0) {
            this.data[y][x] = this.data[y][x - 1];
            this.data[y][x - 1] = 0;
          }
        }
      }
    }
  }

  canMove(direction: string) {
    if (direction === 'left') {
      for (let y = 0; y < 22; y++) {
        for (let x = 0; x < 10; x++) {
          if (this.data[y][x] < 0 && (x - 1 < 0 || (this.data[y][x - 1] > 0))) {
            return false;
          }
        }
      }
    } else if (direction === 'right') {
      for (let y = 0; y < 22; y++) {
        for (let x = 9; x > 0; x--) {
          if (this.data[y][x] < 0 && (x + 1 > 9 || (this.data[y][x + 1] > 0))) {
            return false;
          }
        }
      }
    }
    return true;
  }

  Rotation() {
    if (this.canRotate(this.nowBlock.getRotateBody(this.nowBlock.rotateIdx + 1), this.nowBlock.rootPoint)) {
      this.resetSquare();
      this.setBlock(this.nowBlock.rotate());
      this.nowBlock.rotateIdx++;
    }
  }

  resetSquare() {
    for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.data[y][x] < 0) {
          this.data[y][x] = 0;
        }
      }
    }
  }

  canRotate(changeRange: Point[], rootPoint: Point) {

    for (let i = 0; i < changeRange.length; i++) {
      // console.log(changeRange[i][0], squareX);

      if (changeRange[i].x + rootPoint.x < 0 || changeRange[i].x + rootPoint.x > 9) {
        return false;
      }
      if (changeRange[i].y + rootPoint.y < 2 || changeRange[i].y + rootPoint.y > 21) {
        return false;
      }
    }
    return true;
  }

  setBlock(newPosition: Point[]) {
    // console.log(newPosition);
    newPosition.forEach((item, idx) => {
      console.log(item.y, item.x);
      this.data[item.y][item.x] = this.nowBlock.colorIdx * -1;
    });
  }

  clearSquare(rowNum) {

    // 先消除列
    for (let x = 0; x < 10; x++) {
      this.data[rowNum][x] = 0;
    }
    // 將全部方塊改為可降落模式 *-1
    for (let y = 0; y < rowNum; y++) {
      for (let x = 0; x < 10; x++) {
        this.data[y][x] *= -1;
      }
    }
    // 可以下降時持續下降
    while (this.canDrop()) {
      this.drop();
    }
    this.stop();
  }

  isOver() {

  }
}

