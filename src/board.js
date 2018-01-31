export class Board {
  constructor(numRows, numColumns, numBombs){
    this._numRows = numRows;
    this._numColumns = numColumns;
    this._numBombs = numBombs;
    this._numTiles = numRows*numColumns;
    this._playerBoard = Board.generatePlayerBoard(numRows, numColumns, ' ');
    this._bombBoard = Board.generateBombBoard(numRows, numColumns, numBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('Already Flipped!');
      return;
    }else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumNeighbourBombs(rowIndex,columnIndex);
    }
    this._numTiles--;
  }

  getNumNeighbourBombs(rowIndex, columnIndex) {
    this.neighbourOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    this.numRows = this._bombBoard.length;
    this.numColumns = this._bombBoard[0].length;
    this.numBombs = 0;
    this.neighbourOffsets.forEach(offest =>{
      const neighbourRowIndex = rowIndex + offest[0];
      const neighbourColumnIndex = columnIndex + offest[1];
      if (neighbourRowIndex >= 0 && neighbourRowIndex < this.numRows && neighbourColumnIndex>= 0 && neighbourColumnIndex < this.numColumns){
        if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B'){
          this.numBombs++;
        }
      }
    });
    return this.numBombs;
  }

  hasSafeTiles(){
    console.log(`tiles: ${this._numTiles}, bombs: ${this._numBombs}`)
    return (this._numTiles === this._numBombs);
  }

 print() {
   console.log(
    this._playerBoard.map(row =>row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard (numRows, numColumns, val) {
    this._playerBoard = [];
    for (this.rowIndex = numRows; this.rowIndex > 0; this.rowIndex--){
      this.row = [];
      for (this.columnIndex = numColumns; this.columnIndex > 0; this.columnIndex--){
        this.row.push(val);
      };
      this._playerBoard.push(this.row);
    };
    return this._playerBoard;
  }

static generateBombBoard (numRows, numColumns, numBombs) {
    this.generatePlayerBoard(numRows, numColumns, null);
    this.numBombsPlaced = 0;
    while (numBombs > this.numBombsPlaced){
      this.randomRowIndex = Math.floor(Math.random()*numRows);
      this.randomColumnIndex = Math.floor(Math.random()*numColumns);
      if (this._playerBoard[this.randomRowIndex][this.randomColumnIndex] !== 'B'){
        this._playerBoard[this.randomRowIndex][this.randomColumnIndex] = 'B';
        this.numBombsPlaced++;
      }
    }
    return this._playerBoard;
  }

}
