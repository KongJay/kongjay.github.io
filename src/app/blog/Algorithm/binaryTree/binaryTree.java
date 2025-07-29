class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode parent;
    TreeNode(int x) {
        val = x;
    }
}
class Info{
      int max;
      int min;
      int maxBSTSize;
      int size;
      public Info(int max,int min,int maxBSTSize,int size){
         this.max = max;
         this.min = min;
         this.size=size;
         this.maxBSTSize = maxBSTSize;

      }
}
public class binaryTree{

   public int getBST(TreeNode root){

    return  process(root).maxBSTSize;
    
   }
   //找出最大的BST树。
   public Info process(TreeNode root){
      if(root == null){
         return null;
      }
      Info left = process(root.left);
      Info right = process(root.right);
      int max=root.val;
      int min = root.val;
      int size = 1;
      if(left !=null){ 
         max = Math.max(left.max,max);
         min = Math.min(left.min,min);
         size +=left.size;
      }
      if(right !=null){
         max = Math.max(right.max,max);
         min =Math.min(right.min, min);
         size +=right.size;
      }
     int p1  = -1;
     if(left!=null){
      p1 = left.maxBSTSize;
     }
     int p2 = -1;
     if(right !=null){
      p2 = right.maxBSTSize;
     }
     int p3 = -1;
     boolean isLeftBST = left == null ? true : (left.maxBSTSize == left.size);
     boolean isRightBST = right == null ? true : (right.maxBSTSize == right.size);
     if(isLeftBST && isRightBST){
         boolean leftMax = left == null ? true : (left.max < root.val);
         boolean rightMin = right == null ? true : (right.min > root.val);
         if(leftMax && rightMin){
            int leftSize =left == null ? 0 : left.size; 
            int rightSize = right== null ? 0:right.size;
            p3 = leftSize + rightSize + 1;
         }
     }
      return new Info(max, min,Math.max(Math.max(p1,p2), p3),size);
   }
   for(TreeNode next :nexts){
   Info info = process(next);
       next.yes +=info.no;
       next.no += 

   }

}