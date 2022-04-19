function Needleman_Wunsch(subjet: String[], variation: String[], gap: Number = -4, match: Number = 5, nonmatch: Number = -3): String[] {
    let subject_length = subject.length + 1;
    let variation_length = variation.length + 1;
    
    // Create double array of size subject_length x variation_length
    let graph = new Array(subject_length);
    let direction = new Array(subject_length);
    graph.map((item) => item.push(new Array(variation_length)));
    direction.map((item) => item.push(new Array(variation_length)));
    

    // Initalize Array
    for(let row = 0;row< subject_length;row++){
        graph[row][0] = row*this.gap;
        for(let col = 0;col<variation_length;col++){
            graph[0][col] = col*this.gap;
            direction[row][col] = "";
        }
    }
  
  
  
    for(let row = 1;row<graph.length;row++){
        for(let col = 1;col<graph[0].length;col++){
            let value = subject[row-1] == variation[col-1] ? match : nonmatch;
            let diag = graph[row-1][col-1] + value;
            let top = graph[row-1][col] + gap;
            let left = graph[row][col-1] + gap;

            let max = Math.max(diag, top, left);
            
            // Set graph and direction arrays
            graph[row][col] = max;
            if(max == diag){
                direction[row][col] += "D" // Diagnoal
            }
            if(max == top){
                direction[row][col] += "T" // Top
            }
            if(max == left){
                direction[row][col] += "L" // Left
            }
        }
    }
  
    

    function findPathUntilDiverge(direction, row, col){
  

        let tempRow = row;
        let path = [];
        let tempCol = col;
         
        while(tempCol>0){
            if(direction[tempRow][tempCol].length <= 1) {
                console.log("Only one path: ", row, col)
                if(direction[tempRow][tempCol] == "D") { // Diagnol 
                    // have to subtract one from the column becasue the direction graph is one column larger
                    path.push(tempCol-1);
                    tempRow--;
                    tempCol--;
                } else if(direction[tempRow][tempCol] == "T") {// Top
                    tempRow--;  
                } else if(direction[tempRow][tempCol] == "L"){// Left
                    tempCol--;
                }
            } else {
              let s = direction[tempRow][tempCol].split("");

              if(s.includes("D")) { // Diagnol
                path.push(findPathUntilDiverge(direction, tempRow-1, tempCol-1));
              }
              if(s.includes("T")) { // Top
                path.push(findPathUntilDiverge(direction, tempRow-1, tempCol))
              }
              if(s.includes("L")){ // Left
                path.push(findPathUntilDiverge(direction, tempRow, tempCol-1))
              }
            } 
        }
         return path
        }
         
        let path = findPathUntilDiverge(direction, graph.length, graph[0].length)
         
        let filteredVariation = variation.filter((value, index) => {path.includes(index)})
        console.log({filteredVariation})
        
        
    return path;
}