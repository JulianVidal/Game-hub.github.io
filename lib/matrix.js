class Matrix {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.matrix = []
  }

start() {
 for (let i = 0; i < this.rows; i++) {
   this.matrix[i] = []
   for (let j = 0; j < this.cols; j++) {
      this.matrix[i][j] = 0
   }
  }
}
  scale(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= n
      }
    }
  }

  add(n) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += n
      }
    }
  }
}
