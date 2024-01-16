function solution(A: number[], K: number): number[] {
  // Implement your solution here
  if (A.every((a: number) => a === A[0])) return A;
  
  for (let i = 0; i < K; i++) {
      A.unshift(A[(A.length - 1)]);
      A.pop();
  }
  return A;
}