---
title: 回溯算法
published: 2025-05-24
description: 回溯算法
tags: [Markdown, Blogging]
category: Algorithm Design
licenseName: "Unlicensed"
author: Ankou
sourceLink: ''
draft: false
---
# Backtracking Algorithm

### 1) 入门例子

```java
public class Backtracking {
    public static void main(String[] args) {
        rec(1, new LinkedList<>());
    }

    static void rec(int n, LinkedList<String> list) {
        if (n == 3) {
            return;
        }
        System.out.println("before:" + list);
        list.push("a");
        rec(n + 1, list);
        list.pop();
        System.out.println("after:" + list);
    }
}
```



### 2) 全排列-Leetcode 46

```java
public class PermuteLeetcode46 {
    static List<List<Integer>> permute(int[] nums) {
        boolean[] visited = new boolean[nums.length];
        LinkedList<Integer> stack = new LinkedList<>();
        List<List<Integer>> r = new ArrayList<>();
        rec(nums, visited, stack, r);
        return r;
    }

    static void rec(int[] nums, boolean[] visited, LinkedList<Integer> stack, List<List<Integer>> r) {
        if (stack.size() == nums.length) {
            r.add(new ArrayList<>(stack));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if(visited[i]){
                continue;
            }
            stack.push(nums[i]);
            visited[i] = true;
            rec(nums, visited, stack, r);
            stack.pop();
            visited[i] = false;
        }
    }

    public static void main(String[] args) {
        List<List<Integer>> permute = permute(new int[]{1, 2, 3});
        for (List<Integer> s : permute) {
            System.out.println(s);
        }
    }
}
```



### 3) 全排列II-Leetcode 47

```java
public class PermuteLeetcode47 {

    static List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        dfs(nums, new boolean[nums.length], new LinkedList<>(), result);
        return result;
    }

    static void dfs(int[] nums, boolean[] visited, LinkedList<Integer> stack, List<List<Integer>> result) {
        if (stack.size() == nums.length) {
            result.add(new ArrayList<>(stack));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] == nums[i - 1] && !visited[i-1]) { // 找出重复数字
                continue;
            }
            if (!visited[i]) {
                stack.push(nums[i]);
                visited[i] = true;
                dfs(nums, visited, stack, result);
                visited[i] = false;
                stack.pop();
            }
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 3};        
        List<List<Integer>> permute = permuteUnique(nums);
        for (List<Integer> list : permute) {
            System.out.println(list);
        }
    }
}
```

* 排好序，这样重复的数字会相邻
* 定好规则：必须 1 固定之后才能固定 1'，即 1 的 visited = true 才能继续处理 1'
* 在遍历时，遇到了 `nums[i] == nums[i - 1]`（即 1 和 1‘ 这种情况），进一步检查 i-1 位置的数字有没有 visited，没有，则不处理（剪枝）



### 4) 组合-Leetcode 77

```java
public class CombinationLeetcode77 {
    static List<List<Integer>> combinationSum(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        dfs(n, k, 1, new LinkedList<>(), result);
        return result;
    }
    static int count = 0;

    static void dfs(int n, int k, int start, LinkedList<Integer> stack, List<List<Integer>> result) {
        count++;
        if (k == 0) {
            result.add(new ArrayList<>(stack));
            System.out.println(stack);
            return;
        }
//      if (k > n - start + 1) { return; }
        for (int i = start; i <= n; i++) {
//            System.out.printf("k-1=%d n=%d i=%d %n", k - 1, n, i);
            if (k > n - i + 1) {
                continue;
            }
            stack.push(i);
            dfs(n, k - 1, i + 1, stack, result);
            stack.pop();
        }
    }

    public static void main(String[] args) {
        List<List<Integer>> lists = combinationSum(5, 4);
//        for (List<Integer> list : lists) {
//            System.out.println(list);
//        }
        System.out.println(count);
    }
}
```

* k 代表剩余要组合的个数
* `n - i + 1` 代表剩余可用数字
* 剪枝条件是：剩余可用数字要大于剩余组合数
* 为啥放在外面不行？即这行代码：`if (k > n - start + 1) { return; }` 
  * 因为它只考虑了 start 一种情况，而实际在循环内要处理的是 start，start+1 ... n 这多种情况



似乎 ArrayList 作为 stack 性能高一些，见下面代码，但是这道题在 leetcode 上执行时间不稳定，相同代码都会有较大时间差异（15ms vs 9ms）

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {        
        List<List<Integer>> result = new ArrayList<>();
        if(k == 0 || n < k) return result;
        dfs(n, k, 1, new ArrayList<>(), result);
        return result;
    }

    static void dfs(int n, int k, int start, ArrayList<Integer> stack, List<List<Integer>> result) {
        if (k == 0) {
            result.add(new ArrayList<>(stack));
            return;
        }
        for (int i = start; i <= n; i++) {
            if (k-1 > n - i) {
                continue;
            }
            stack.add(i);
            dfs(n, k - 1, i + 1, stack, result);
            stack.remove(stack.size()-1);
        }
    }
}
```



### 5) 组合总和-Leetcode 39

```java
public class CombinationLeetcode39 {
    static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        dfs(target, 0,candidates, new LinkedList<>(), result);
        return result;
    }

    static void dfs(int target, int start, int[] candidates, LinkedList<Integer> stack, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(stack));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            int candidate = candidates[i];
            if (target < candidate) {
                continue;
            }
            stack.push(candidate);
            dfs(target - candidate, i, candidates, stack, result);
            stack.pop();
        }
    }

    public static void main(String[] args) {
        List<List<Integer>> lists = combinationSum(new int[]{6, 3, 2, 7}, 7);
        for (List<Integer> list : lists) {
            System.out.println(list);
        }
    }
}
```

与之前的零钱兑换问题其实是一样的，只是

* 本题求的是：所有组合的具体信息
* 零钱兑换问题求的是：所有组合中数字最少的、所有组合个数...



### 6) 组合总和 II-Leetcode 40

```java
public class CombinationLeetcode40 {
    static List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        dfs(target, 0, candidates, new boolean[candidates.length], new LinkedList<>(), result);
        return result;
    }

    static void dfs(int target, int start, int[] candidates, boolean[] visited, LinkedList<Integer> stack, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(stack));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            int candidate = candidates[i];
            if (target < candidate) {
                continue;
            }
            if (i > 0 && candidate == candidates[i - 1] && !visited[i - 1]) {
                continue;
            }
            visited[i] = true;
            stack.push(candidate);
            dfs(target - candidate, i + 1, candidates, visited, stack, result);
            stack.pop();
            visited[i] = false;
        }
    }

    public static void main(String[] args) {
        int[] candidates = {10, 1, 2, 7, 6, 1, 5};        
        List<List<Integer>> lists = combinationSum2(candidates, 8);
        for (List<Integer> list : lists) {
            System.out.println(list);
        }
    }
}
```



### 7) 组合总和 III-Leetcode 216

```java
public class CombinationLeetcode216 {
    // 此 target 代表数字组合后的和
    static List<List<Integer>> combinationSum3(int k, int target) {
        List<List<Integer>> result = new ArrayList<>();
        dfs(1, target, k, new LinkedList<>(), result);
        return result;
    }

    static int count = 0;

    static void dfs(int start, int target, int k,
                    LinkedList<Integer> stack,
                    List<List<Integer>> result) {
//        System.out.println(stack);
        count++;
        if (target == 0 && stack.size() == k) {
            result.add(new ArrayList<>(stack));
            return;
        }
        for (int i = start; i <= 9; i++) {
            //  还差几个数字          剩余可用数字
            /*if (k - stack.size() > 9 - i + 1) {
                continue;
            }*/
            if(target < i){
                continue;
            }
            if(stack.size() == k) {
                continue;
            }
            stack.push(i);
            dfs(i + 1, target - i, k, stack, result);
            stack.pop();
        }
    }

    public static void main(String[] args) {
//        List<List<Integer>> lists = combinationSum3(3, 7);
        List<List<Integer>> lists = combinationSum3(2, 18); // 9 8
        for (List<Integer> list : lists) {
            System.out.println(list);
        }
        System.out.println(count);
    }
}
```

这道题更类似于 77 题，区别在于

1. 77 题的数字范围 n 更大 [1,20]，而本题数字范围限制为 [1,9]
2. 本题不仅仅找到组合，还要让组合之和等于 target（类似于 39 题）

剪枝优化

1. 如果剩余的和 target 还没 i 大，这时减完 i 是负数，肯定无法满足要求，因此有剪枝条件：
   * `target < i` 
2. 如果组合的数字个数已经到达了上限 k，还没有凑够 target，也没必要继续递归，因此有：
   - `stack.size() == k`



### 8) N 皇后 Leetcode 51

```java
public class NQueenLeetcode51 {
    static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] table = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(table[i], '.');
        }
        dfs(0, n, table, result);
        return result;
    }

    static void dfs(int i, int n, char[][] table, List<List<String>> result) {
        if (i == n) {
            ArrayList<String> list = new ArrayList<>();
            for (char[] chars : table) {
                list.add(String.valueOf(chars));
            }
            result.add(list);
            return;
        }
        for (int j = 0; j < n; j++) {
            if (notValid(table, i, j)) {
                continue;
            }
            table[i][j] = 'Q';
            dfs(i + 1, n, table, result);
            table[i][j] = '.';
        }
    }
    /*
        .   .   .   .
        .   .   .   .
        .   ?   .   .
        .   .   .   .
     */

    static boolean notValid(char[][] table, int row, int col) {
        int n = table.length;
        for (int i = 0; i < n; i++) {
            if (table[i][col] == 'Q') { // 上
                return true;
            }
        }
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (table[i][j] == 'Q') {
                return true;
            }
        }
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (table[i][j] == 'Q') {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int count = 0;
        for (List<String> table : solveNQueens(8)) {
            for (String row : table) {
                System.out.println(row);
            }
            count++;
            System.out.println("--------------------- " + count);
        }
    }
}
```



```java
public class NQueenLeetcode51 {
    static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] table = new char[n][n];
        boolean[] va = new boolean[n];
        boolean[] vb = new boolean[2 * n - 1];
        boolean[] vc = new boolean[2 * n - 1];
        for (int i = 0; i < n; i++) {
            Arrays.fill(table[i], '.');
        }
        dfs(0, n, table, result, va, vb, vc);
        return result;
    }

    static void dfs(int i, int n, char[][] table, List<List<String>> result, boolean[] va, boolean[] vb, boolean[] vc) {
        if (i == n) {
            ArrayList<String> list = new ArrayList<>();
            for (char[] chars : table) {
                list.add(String.valueOf(chars));
            }
            result.add(list);
            return;
        }
        for (int j = 0; j < n; j++) {
            if (va[j] || vb[i + j] || vc[i - j + n - 1]) {
                continue;
            }
            va[j] = true;
            vb[i + j] = true;
            vc[i - j + n - 1] = true;
            table[i][j] = 'Q';
            dfs(i + 1, n, table, result, va, vb, vc);
            table[i][j] = '.';
            va[j] = false;
            vb[i + j] = false;
            vc[i - j + n - 1] = false;
        }
    }

    public static void main(String[] args) {
        int count = 0;
        for (List<String> table : solveNQueens(4)) {
            for (String row : table) {
                System.out.println(row);
            }
            count++;
            System.out.println("--------------------- " + count);
        }
    }
}
```



### 9) 解数独-Leetcode37

```java
public class SudokuLeetcode37 {
    record Pair(int i, int j) {

    }

    static void solveSudoku(char[][] table) {
        int n = 9;
        boolean[][] va = new boolean[n][n];
        boolean[][] vb = new boolean[n][n];
        boolean[][][] vc = new boolean[3][3][n];
        List<Pair> blanks = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (table[i][j] != '.') {
                    int x = table[i][j] - '0' - 1;
                    va[i][x] = true;
                    vb[j][x] = true;
                    vc[i / 3][j / 3][x] = true;
                } else {
                    blanks.add(new Pair(i, j));
                }
            }
        }
        dfs(0, blanks, table, va, vb, vc);
    }

    static boolean dfs(int p, List<Pair> blanks, char[][] table, boolean[][] va, boolean[][] vb, boolean[][][] vc) {
        if (p == blanks.size()) {
            print(table);
            return true;
        }
        int n = table.length;
        for (int d = 0; d < n; d++) {
            Pair pair = blanks.get(p);
            if (va[pair.i][d] || vb[pair.j][d] || vc[pair.i / 3][pair.j / 3][d]) {
                continue;
            }
            char ch = (char) (d + '0' + 1);
            table[pair.i][pair.j] = ch;
            va[pair.i][d] = true;
            vb[pair.j][d] = true;
            vc[pair.i / 3][pair.j / 3][d] = true;
            boolean dfs = dfs(p + 1, blanks, table, va, vb, vc);
            if (dfs) {
                return true;
            }
            table[pair.i][pair.j] = '.';
            va[pair.i][d] = false;
            vb[pair.j][d] = false;
            vc[pair.i / 3][pair.j / 3][d] = false;

        }
        return false;
    }

    public static void main(String[] args) {
        char[][] table = {
                {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
                {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
                {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
                {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
                {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
                {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
                {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
                {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
                {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
        };

        solveSudoku(table);

        print(table);
    }

    static char[][] solved = {
            {'5', '3', '4', '6', '7', '8', '9', '1', '2'},
            {'6', '7', '2', '1', '9', '5', '3', '4', '8'},
            {'1', '9', '8', '3', '4', '2', '5', '6', '7'},
            {'8', '5', '9', '7', '6', '1', '4', '2', '3'},
            {'4', '2', '6', '8', '5', '3', '7', '9', '1'},
            {'7', '1', '3', '9', '2', '4', '8', '5', '6'},
            {'9', '6', '1', '5', '3', '7', '2', '8', '4'},
            {'2', '8', '7', '4', '1', '9', '6', '3', '5'},
            {'3', '4', '5', '2', '8', '6', '1', '7', '9'}
    };

    static void print(char[][] table) {
        for (char[] chars : table) {
            System.out.println(new String(chars));
        }
        System.out.println(Arrays.deepEquals(table, solved));
    }
}
```



```java
public class SudokuLeetcode37 {

    static void solveSudoku(char[][] table) {
        int n = 9;
        boolean[][] va = new boolean[n][n];
        boolean[][] vb = new boolean[n][n];
        boolean[][][] vc = new boolean[3][3][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (table[i][j] != '.') {
                    int x = table[i][j] - '0' - 1;
                    va[i][x] = true;
                    vb[j][x] = true;
                    vc[i / 3][j / 3][x] = true;
                }
            }
        }
        dfs(table, va, vb, vc, 0, 0);
    }

    static boolean dfs(char[][] table, boolean[][] va, boolean[][] vb, boolean[][][] vc, int i, int j) {
        while (table[i][j] != '.') {
            if (++j >= 9) {
                j = 0;
                i++;
            }
            if (i >= 9) {
                return true;
            }
        }
        int n = table.length;
        for (int d = 0; d < n; d++) {
            if (va[i][d] || vb[j][d] || vc[i / 3][j / 3][d]) {
                continue;
            }
            char ch = (char) (d + '0' + 1);
            table[i][j] = ch;
            va[i][d] = true;
            vb[j][d] = true;
            vc[i / 3][j / 3][d] = true;
            boolean dfs = dfs(table, va, vb, vc, i, j);
            if (dfs) {
                return true;
            }
            table[i][j] = '.';
            va[i][d] = false;
            vb[j][d] = false;
            vc[i / 3][j / 3][d] = false;

        }
        return false;
    }

    public static void main(String[] args) {
        char[][] table = {
                {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
                {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
                {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
                {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
                {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
                {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
                {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
                {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
                {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
        };
        solveSudoku(table);

        print(table);
    }

    static char[][] solved = {
            {'5', '3', '4', '6', '7', '8', '9', '1', '2'},
            {'6', '7', '2', '1', '9', '5', '3', '4', '8'},
            {'1', '9', '8', '3', '4', '2', '5', '6', '7'},
            {'8', '5', '9', '7', '6', '1', '4', '2', '3'},
            {'4', '2', '6', '8', '5', '3', '7', '9', '1'},
            {'7', '1', '3', '9', '2', '4', '8', '5', '6'},
            {'9', '6', '1', '5', '3', '7', '2', '8', '4'},
            {'2', '8', '7', '4', '1', '9', '6', '3', '5'},
            {'3', '4', '5', '2', '8', '6', '1', '7', '9'}
    };

    static void print(char[][] table) {
        for (char[] chars : table) {
            System.out.println(new String(chars));
        }
        System.out.println(Arrays.deepEquals(table, solved));
    }
}
```



### 其它题目

| 题号          | 标题                                  | 说明                                                         |
| ------------- | ------------------------------------- | ------------------------------------------------------------ |
| Leetcode 1219 | 黄金矿工                              |                                                              |
| 无            | 马踏棋盘（The Knight’s tour problem） |                                                              |
| 无            | Rat in a Maze                         | 与 Leetcode 62 不同路径区别在于，该题问的是有多少种走法，而本题只是找到其中一种走法实现 |