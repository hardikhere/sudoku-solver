//code copyright hardik hehe
var myarray=new Array(9);
for (i=0; i <9; i++)
    myarray[i]=new Array(9);

class point {
	findPoint(mat){
		let flag=0;let count=0;
         for(let i=0;i<9;i++){
         	for(let j=0;j<9;j++){
              if(mat[i][j]===0){
              	this.i=i;
              	this.j=j;
              	return;
              }else count ++;
         	}
         }
         if(count===81){
        this.i=-1;
        this.j=-1;
        }
	}
}

$(document).ready(function(){
 for(var i=0;i<9;i++){
	for(var d =0;d<9;d++){
		$(`<input type="text" name="" id="${d}-${i}" placeholder="${d}x${i}">`).insertBefore("#grid");
	}
}
});

const constructMat = ()=>{
  var mat=new Array(9);
  for (i=0; i <9; i++)
     mat[i]=new Array(9);
  for(let r =0;r<9;r++){
  	for(let c=0;c<9;c++){
  		const value = $(`#${r}-${c}`).val();
       if(value!=''){
       	mat[r][c]=parseInt(value);
       }else if(value != NaN)mat[r][c]=0;
  	}
  }
  return mat;
};
const usedInBox=(mat,brow,bcol,num)=>{
    for(let r=0;r<3;r++){
    	for(let c=0;c<3;c++){
    		if(mat[r+brow][c+bcol]===num)return true;
    	}
    }
    return false;
};
const isFillable = (mat,row,col,num)=>{
    //chek in row
    for(let u=0;u<9;u++)if(mat[row][u]===num)return false;
    for(let u=0;u<9;u++)if(mat[u][col]===num)return false;
    if(usedInBox(mat,row-row%3,col-col%3,num)===true)return false;
    return true;	

};
const solveSudokuUtil = (mat,i,j)=>{
   if(i===-1 && j===-1)return 1;
   for(let num=0;num<=9;num++){
   	 if(isFillable(mat,i,j,num)===true){
   	 	mat[i][j]=num;
   	 	const r=new point;
   	 	r.findPoint(mat);
   	 	console.log(r.i +" and"+r.j);
   	 	if(solveSudokuUtil(mat,r.i,r.j)===1)return 1;
   	 	mat[i][j]=0; //backtrack;
   	 }
   }
   return 0;
};
const printSolution=(mat)=>{
	for(var i=0;i<9;i++ ){
		for(var j=0;j<9;j++){
           $(`#${i}-${j}`).val(mat[i][j].toString());
		}
	}
};
//main driver program
const solve = ()=>{
  const mat = constructMat();
  const p = new point;
  p.findPoint(mat);
  console.log(p.i+"and"+p.j);
  if(solveSudokuUtil(mat,p.i,p.j)===0){
  	alert('no solution possible');
  }else printSolution(mat);
 };
