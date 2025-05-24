---
title: 动态规划
published: 2025-03-20
description: 动态规划
tags: [Markdown, Blogging]
category: Algorithm Design
licenseName: "Unlicensed"
author: Ankou
sourceLink: ''
draft: false
---
# Dynamic-Programming

### 1) Fibonacci

```java
public class Fibonacci {
    public static void main(String[] args) {
        System.out.println(fibonacci(13));
    }

    public static int fibonacci(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        if (n < 2) {
            return dp[n];
        }
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 2] + dp[i - 1];
        }
        return dp[n];
    }
}
```



#### 降维

```java
public class Fibonacci {
    public static void main(String[] args) {
        System.out.println(fibonacci(13));
    }

    public static int fibonacci(int n) {        
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        int a = 0;
        int b = 1;
        for (int i = 2; i <= n; i++) {
            int c = b + a;
            a = b;
            b = c;
        }
        return b;
    }
}
```



### 2) 最短路径 - Bellman-Ford

```java
public class BellmanFord {
    static class Edge {
        int from;
        int to;
        int weight;

        public Edge(int from, int to, int weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }
    }

    /*
            f(v) 用来表示从起点出发，到达 v 这个顶点的最短距离
            初始时
            f(v) = 0   当 v==起点 时
            f(v) = ∞   当 v!=起点 时

            之后
            新           旧     所有from
            f(to) = min(f(to), f(from) + from.weight)

            from 从哪来
            to   到哪去

            f(v4) = min( ∞, f(v3) + 11 ) = 20
            f(v4) = min( 20, f(v2) + 15 ) = 20


            v1  v2  v3  v4  v5  v6
            0   ∞   ∞   ∞   ∞   ∞
            0   7   9   ∞   ∞   14  第一轮
            0   7   9   20  23  11  第二轮
            0   7   9   20  20  11  第三轮
            0   7   9   20  20  11  第四轮
            0   7   9   20  20  11  第五轮

     */

    public static void main(String[] args) {
        List<Edge> edges = List.of(
                new Edge(6, 5, 9),
                new Edge(4, 5, 6),
                new Edge(1, 6, 14),
                new Edge(3, 6, 2),
                new Edge(3, 4, 11),
                new Edge(2, 4, 15),
                new Edge(1, 3, 9),
                new Edge(1, 2, 7)
        );
        int[] dp = new int[7]; // 一维数组用来缓存结果
        dp[1] = 0;
        for (int i = 2; i < dp.length; i++) {
            dp[i] = Integer.MAX_VALUE;
        }
        print(dp);
        for (int i = 0; i < 5; i++) {
            for (Edge e : edges) {
                if(dp[e.from] != Integer.MAX_VALUE) {
                    dp[e.to] = Integer.min(dp[e.to], dp[e.from] + e.weight);
                }
            }
        }
        print(dp);
    }

    static void print(int[] dp) {
        System.out.println(Arrays.stream(dp)
                .mapToObj(i -> i == Integer.MAX_VALUE ? "∞" : String.valueOf(i))
                .collect(Collectors.joining(",", "[", "]")));
    }
}
```



### 3) 不同路径-Leetcode 62 

机器人要从左上角走到右下角，每次只能**向右**或**向下**，问一共有多少条不同路径？

![](/imgs/robot_maze2.png)

分析，先考虑较为简单的情况

![](/imgs/robot_maze.png)

可能路径有三种情况：

* 👉 👇 👇
* 👇 👇👉
* 👇👉👇

分析：设坐标为，共有 m 行 n 列

```
(0,0)	(0,1)
(1,0)	(1,1)
(2,0)	(2,1)
```

如果终点是 (0,1) 那么只有一种走法

如果终点是 (1,0) 那么也只有一种走法

如果终点是 (1,1) 呢，它的走法是从它的上方走下来，或者从它的左边走过来，因此走法 = (0,1) + (1,0) = 2种

如果终点是 (2,0) 那么也只有一种走法

如果终点是 (2,1) 呢，它的走法是从它的上方走下来，或者从它的左边走过来，因此走法 = (1,1) + (2,0) = 3种



总结规律发现：

1. 终点是 (0,1) (0,2) (0,3) ... (0,n) 走法只有1种
2. 终点是 (1,0) (2,0) (3,0) ... (m,0) 走法也只有1种
3. 除了上面两种情况以外，(i,j) 处的走法等于(i-1,j) + (i,j-1) 的走法之和，即为递推公式



画表格

```
0	1	1	1	1	1	1
1	2	3	4	5	6	7
1	3	6	10	15	21	28
```



题解

```java
public class UniquePaths {
    public static void main(String[] args) {
        int count = new UniquePaths().uniquePaths(3, 7);
        System.out.println(count);
    }

    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

#### 降维

```java
public class UniquePaths {
    public static void main(String[] args) {
        int count = new UniquePaths().uniquePaths(3, 7);
        System.out.println(count);
    }

    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            dp[0] = 1;
            for (int j = 1; j < n; j++) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}
```

类似于不规则的杨辉三角



### 4) 0-1 背包问题

```java
public class KnapsackProblem {
    /*
        1. n个物品都是固体，有重量和价值
        2. 现在你要取走不超过 10克 的物品
        3. 每次可以不拿或全拿，问最高价值是多少

            编号 重量(g)  价值(元)                        简称
            1   4       1600           黄金一块   400    A
            2   8       2400           红宝石一粒 300    R
            3   5       30             白银一块         S
            0   1       1_000_000      钻石一粒          D
        1_001_630

        1_002_400
     */

    /*
        1   2   3   4   5   6   7   8   9   10
                    a
                    a               r
                    a               r
        d               da          da  dr  dr
     */

    static class Item {
        int index;
        String name;
        int weight;
        int value;

        public Item(int index, String name, int weight, int value) {
            this.index = index;
            this.name = name;
            this.weight = weight;
            this.value = value;
        }

        @Override
        public String toString() {
            return "Item(" + name + ")";
        }
    }

    public static void main(String[] args) {
        Item[] items = new Item[]{
                new Item(1, "黄金", 4, 1600),
                new Item(2, "宝石", 8, 2400),
                new Item(3, "白银", 5, 30),
                new Item(4, "钻石", 1, 10_000),
        };
        System.out.println(select(items, 10));
    }

    static int select(Item[] items, int total) {
        int[][] dp = new int[items.length][total + 1];
        print(dp);
        Item item0 = items[0];
        for (int j = 0; j < total + 1; j++) {
            if (j >= item0.weight) {
                dp[0][j] = item0.value;
            }
        }
        print(dp);
        for (int i = 1; i < dp.length; i++) {
            Item item = items[i];
            for (int j = 1; j < total + 1; j++) {
                // x: 上一次同容量背包的最大价值
                int x = dp[i - 1][j];
                if (j >= item.weight) {
                    // j-item.weight: 当前背包容量-这次物品重量=剩余背包空间
                    // y: 剩余背包空间能装下的最大价值 + 这次物品价值
                    int y = dp[i - 1][j - item.weight] + item.value;
                    dp[i][j] = Integer.max(x, y);
                } else {
                    dp[i][j] = x;
                }
            }
            print(dp);
        }
        return dp[dp.length - 1][total];
    }

    static void print(int[][] dp) {
        System.out.println("   " + "-".repeat(63));
        Object[] array = IntStream.range(0, dp[0].length + 1).boxed().toArray();
        System.out.printf(("%5d ".repeat(dp[0].length)) + "%n", array);
        for (int[] d : dp) {
            array = Arrays.stream(d).boxed().toArray();
            System.out.printf(("%5d ".repeat(d.length)) + "%n", array);
        }
    }
}
```

#### 降维

```java
static int select(Item[] items, int total) {
    int[] dp = new int[total + 1];
    for (Item item : items) {
        for (int j = total; j > 0; j--) {
            if (j >= item.weight) { // 装得下
                dp[j] = Integer.max(dp[j], item.value + dp[j - item.weight]);
            }
        }
        System.out.println(Arrays.toString(dp));
    }
    return dp[total];
}
```

注意：内层循环需要倒序，否则 dp[j - item.weight] 的结果会被提前覆盖



### 5) 完全背包问题

```java
public class KnapsackProblemComplete {
    static class Item {
        int index;
        String name;
        int weight;
        int value;

        public Item(int index, String name, int weight, int value) {
            this.index = index;
            this.name = name;
            this.weight = weight;
            this.value = value;
        }

        @Override
        public String toString() {
            return "Item(" + name + ")";
        }
    }

    public static void main(String[] args) {
        Item[] items = new Item[]{
                new Item(1, "青铜", 2, 3),    // c
                new Item(2, "白银", 3, 4),    // s
                new Item(3, "黄金", 4, 7),    // a
        };
        System.out.println(select(items, 6));
    }

    /*
            0   1   2   3   4   5   6
        1   0   0   c   c   cc  cc  ccc
        2   0   0   c   s   cc  cs  ccc
        3   0   0   c   s   a   a   ac
     */

    private static int select(Item[] items, int total) {
        int[][] dp = new int[items.length][total + 1];
        Item item0 = items[0];
        for (int j = 0; j < total + 1; j++) {
            if (j >= item0.weight) {
                dp[0][j] = dp[0][j - item0.weight] + item0.value;
            }
        }
        print(dp);
        for (int i = 1; i < items.length; i++) {
            Item item = items[i];            
            for (int j = 1; j < total + 1; j++) {
                // x: 上一次同容量背包的最大价值
              int x = dp[i - 1][j];
                if (j >= item.weight) {
                    // j-item.weight: 当前背包容量-这次物品重量=剩余背包空间
                    // y: 剩余背包空间能装下的最大价值 + 这次物品价值
                    int y = dp[i][j - item.weight] + item.value;
                    dp[i][j] = Integer.max(x, y);
                } else {
                    dp[i][j] = x;
                }
            }
            print(dp);
        }
        return dp[dp.length - 1][total];
    }

    static void print(int[][] dp) {
        System.out.println("   " + "-".repeat(63));
        Object[] array = IntStream.range(0, dp[0].length + 1).boxed().toArray();
        System.out.printf(("%5d ".repeat(dp[0].length)) + "%n", array);
        for (int[] d : dp) {
            array = Arrays.stream(d).boxed().toArray();
            System.out.printf(("%5d ".repeat(d.length)) + "%n", array);
        }
    }
}
```

#### 降维

```java
private static int select(Item[] items, int total) {
    int[] dp = new int[total + 1];
    for (Item item : items) {
        for (int j = 0; j < total + 1; j++) {
            if (j >= item.weight) {
                dp[j] = Integer.max(dp[j], dp[j - item.weight] + item.value);
            }
        }
        System.out.println(Arrays.toString(dp));
    }
    return dp[total];
}
```



### 6) 零钱兑换问题-Leetcode322

```java
public class ChangeMakingProblemLeetcode322 {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[][] dp = new int[coins.length][amount + 1];
        for (int j = 1; j < amount + 1; j++) {
            if (j >= coins[0]) {
                dp[0][j] = 1 + dp[0][j - coins[0]];
            } else {
                dp[0][j] = max;
            }
        }

        for (int i = 1; i < coins.length; i++) {
            for (int j = 1; j < amount + 1; j++) {
                if (j >= coins[i]) {
                    dp[i][j] = Math.min(dp[i - 1][j], 1 + dp[i][j - coins[i]]);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
            print(dp);
        }
        int r = dp[coins.length - 1][amount];
        return r > amount ? -1 : r;
    }

    public static void main(String[] args) {
        ChangeMakingProblemLeetcode322 leetcode = new ChangeMakingProblemLeetcode322();
        int count = leetcode.coinChange(new int[]{1, 2, 5}, 5);
//        int count = leetcode.coinChange(new int[]{25, 10, 5, 1}, 41);
//        int count = leetcode.coinChange(new int[]{2}, 3);
//        int count = leetcode.coinChange(new int[]{15, 10, 1}, 21);
        System.out.println(count);
    }

    static void print(int[][] dp) {
        System.out.println("-".repeat(18));
        Object[] array = IntStream.range(0, dp[0].length + 1).boxed().toArray();
        System.out.printf(("%2d ".repeat(dp[0].length)) + "%n", array);
        for (int[] d : dp) {
            array = Arrays.stream(d).boxed().toArray();
            System.out.printf(("%2d ".repeat(d.length)) + "%n", array);
        }
    }
}
```

#### 降维

```java
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int coin : coins) {
        for (int j = coin; j < amount + 1; j++) {
            dp[j] = Math.min(dp[j], 1 + dp[j - coin]);
        }
    }
    int r = dp[amount];
    return r > amount ? -1 : r;
}
```

#### 零钱兑换 II-Leetcode 518

```java
public class ChangeMakingProblemLeetcode518 {
    /*
     面值    0        1        2        3        4        5
       1    1        1        1        1        1        1
       2    1        1        2        2        3        3
       5    1        1        2        2        3        4


     面值    0        1        2        3
            1        0        0        0
       2    1        0        1        0

     */

    public int change(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int j = coin; j < amount + 1; j++) {
                dp[j] = dp[j] + dp[j - coin];
            }
        }
        return dp[amount];
    }

    public static void main(String[] args) {
        ChangeMakingProblemLeetcode518 leetcode = new ChangeMakingProblemLeetcode518();
        int count = leetcode.change(new int[]{1, 2, 5}, 5);
        System.out.println(count);
    }

}
```



### 7) 钢条切割问题

```java
public class CutRodProblem {
    /*
    1 5 8 9
            0   1   2   3   4
        1       1   11  111 1111
                (1) (2) (3) (4)
        2           11  111 1111
                    2   21  211
                            22
                (1) (5) (6) (10)
        3       1   11  111 1111
                    2   21  211
                        3   22
                            31
                (1) (5) (8) (10)
        4       1   11  111 1111
                    2   21  211
                        3   22
                            31
                            4
                (1) (5) (8) (10)
     */


    static int cut(int[] values, int n) {
        int[][] dp = new int[values.length][n + 1];
        for (int i = 1; i < values.length; i++) {
            int v = values[i];
            for (int j = 1; j < n + 1; j++) {
                if (j >= i) {
                    dp[i][j] = Integer.max(dp[i - 1][j], v + dp[i][j - i]);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
            print(dp);
        }
        return dp[values.length - 1][n];
    }

    public static void main(String[] args) {
        System.out.println(cut(new int[]{0, 1, 5, 8, 9}, 4));
    }
}
```

#### 降维

```java
static int cut(int[] values, int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i < values.length; i++) {
        int v = values[i];
        for (int j = i; j < n + 1; j++) {
            dp[j] = Integer.max(dp[j], v + dp[j - i]);
        }
        System.out.println(Arrays.toString(dp));
    }
    return dp[n];
}
```

本质上是完全背包问题，把钢条总长度看作背包容量，切分后的钢条看作物品。只是

* 此时的背包容量=物品数量，例如，钢条总长度为4，可以看作有四种物品：

  * 长度1的钢条

  * 长度2的钢条

  * 长度3的钢条

  * 长度4的钢条

* 另外，这个场景下，总能装满背包



#### 类似题目 Leetcode-343 整数拆分

```java
public class Leetcode343 {

    /*
         0   1   2   3   4
     1   1   1   11  111 1111
     2   1   1   11  111 1111
                 2   21  211
                         22
             (1) (2) (2) (4)
     3   1   1   11  111 1111
                 2   21  211
                     3   22
                         31
             (1) (2) (3) (4)
     4   1   1   11  111 1111
                 2   21  211
                     3   22
                         31
                         4
             (1) (2) (3) (4)
     */

    public int integerBreak(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, 1);
        dp[0] = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n + 1; j++) {
                if (j >= i) {
                    dp[j] = Integer.max(dp[j], i * dp[j - i]);
                }
            }
            System.out.println(Arrays.toString(dp));
        }
        return dp[n];
    }

    public int integerBreak2(int n) {
        int[][] dp = new int[n][n + 1];
        Arrays.fill(dp[0], 1);
        for (int i = 1; i < n; i++) {
            dp[i][0] = 1;
        }
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n + 1; j++) {
                if (j >= i) {
                    dp[i][j] = Integer.max(dp[i - 1][j], i * dp[i][j - i]);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
            print(dp);
        }
        return dp[n - 1][n];
    }

    public static void main(String[] args) {
        Leetcode343 code = new Leetcode343();
        System.out.println(code.integerBreak(4));
        System.out.println(code.integerBreak(10));
    }
}
```



### 8) 最长公共子串

```java
public class LCSubstring {

    static int lcs(String a, String b) {
        int[][] dp = new int[b.length()][a.length()];
        int max = 0;
        for (int i = 0; i < b.length(); i++) {
            for (int j = 0; j < a.length(); j++) {
                if (a.charAt(j) == b.charAt(i)) {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = dp[i - 1][j - 1] + 1;
                    }
                    max = Integer.max(dp[i][j], max);
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        print(dp, a, b);
        return max;
    }

    static void print(int[][] dp, String a, String b) {
        System.out.println("-".repeat(23));
        Object[] array = a.chars().mapToObj(i -> String.valueOf((char) i)).toArray();
        System.out.printf("  "+"%2s ".repeat(a.length()) + "%n", array);
        for (int i = 0; i < b.length(); i++) {
            int[] d = dp[i];
            array = Arrays.stream(d).boxed().toArray();
            System.out.printf(b.charAt(i) + " " + "%2d ".repeat(d.length) + "%n", array);
        }
    }
    /*
            i   t   h   e   i   m   a
         t  0   1   0   0   0   0   0
         h  0   0   2   0   0   0   0
         e  0   0   0   3   0   0   0
         n  0   0   0   0   0   0   0
     */

    public static void main(String[] args) {
        System.out.println(lcs("itheima", "then"));
    }
}
```



#### 类似题目 Leetcode-718 最长重复子数组

```java
public class Leetcode718 {

    public int findLength(int[] nums1, int[] nums2) {
        int m = nums1.length + 1;
        int n = nums2.length + 1;
        int[] dp = new int[n];
        int max = 0;
        for (int i = 1; i < m; i++) {
            for (int j = n - 1; j > 0; j--) {
                if (nums1[i - 1] == nums2[j - 1]) {
                    dp[j] = dp[j - 1] + 1;
                    max = Integer.max(max, dp[j]);
                } else {
                    dp[j] = 0;
                }
            }
        }
        return max;
    }

    public int findLength1(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int[] dp = new int[n];
        int max = 0;
        for (int i = 0; i < m; i++) {
            for (int j = n - 1; j >= 0; j--) {
                if (nums1[i] == nums2[j]) {
                    if (i == 0 || j == 0) {
                        dp[j] = 1;
                    } else {
                        dp[j] = dp[j - 1] + 1;
                    }
                    max = Integer.max(max, dp[j]);
                } else {
                    dp[j] = 0;
                }
            }
        }
        return max;
    }

    public int findLength2(int[] nums1, int[] nums2) {
        int[][] dp = new int[nums1.length][nums2.length];
        int max = 0;
        for (int i = 0; i < nums1.length; i++) {
            for (int j = 0; j < nums2.length; j++) {
                if (nums1[i] == nums2[j]) {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = dp[i - 1][j - 1] + 1;
                    }
                    max = Integer.max(max, dp[i][j]);
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        return max;
    }

    public static void main(String[] args) {
        Leetcode718 code = new Leetcode718();
        System.out.println(code.findLength(new int[]{1, 2, 3, 2, 1}, new int[]{3, 2, 1, 4, 7}));
        System.out.println(code.findLength(new int[]{1, 0, 0, 0, 1}, new int[]{1, 0, 0, 1, 1}));
    }
}
```



### 9) 最长公共子序列

#### 最长公共子序列-Leetcode 1143 

```java
public class LCSubsequence {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i < m + 1; i++) {
            char a = text1.charAt(i - 1);
            for (int j = 1; j < n + 1; j++) {
                char b = text2.charAt(j - 1);
                if (a == b) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Integer.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        print(dp, text2, text1);
        return dp[m][n];
    }

    static void print(int[][] dp, String a, String b) {
        System.out.println("-".repeat(23));
        Object[] array = a.chars().mapToObj(i -> String.valueOf((char) i)).toArray();
        System.out.printf("     " + "%2s ".repeat(a.length()) + "%n", array);
        for (int i = 0; i < b.length(); i++) {
            int[] d = dp[i + 1];
            array = Arrays.stream(d).boxed().toArray();
            System.out.printf(b.charAt(i) + " " + "%2d ".repeat(d.length) + "%n", array);
        }
    }

    public static void main(String[] args) {
        LCSubsequence code = new LCSubsequence();
        System.out.println(code.longestCommonSubsequence("abcde", "ace"));
        System.out.println(code.longestCommonSubsequence("ba", "yby"));
    }
}
```



#### 两个字符串的删除操作-Leetcode 583 

```java
public class Leetcode538 {
    public static void main(String[] args) {
        Leetcode538 code = new Leetcode538();
        System.out.println(code.minDistance("leetcode", "etco"));  // 4
        System.out.println(code.minDistance("eat", "sea"));		   // 2
        System.out.println(code.minDistance("park", "spake"));	   // 3
    }

    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        char[] chars1 = word1.toCharArray();
        char[] chars2 = word2.toCharArray();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i < m + 1; i++) {
            int x = chars1[i - 1];
            for (int j = 1; j < n + 1; j++) {
                int y = chars2[j - 1];
                if (x == y) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Integer.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return m + n - dp[m][n] - dp[m][n];
    }
}
```



### 10) 最长上升子序列-Leetcode 300

```java
public class Leetcode300 {
    /*
                    1       2       3       4
            1       3       6       4       9
            1       13      16      14      19
                            136     134     139
                                            169
                                            1369
                                            149
                                            1349
           (1)    (2)      (3)     (3)      (4)
                                            4
     */
    public int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) { // 满足了升序条件
                    // 用之前递增子序列的最大长度 + 1 更新当前长度
                    dp[i] = Integer.max(dp[i], dp[j] + 1);
                }
            }
            System.out.println(Arrays.toString(dp));
        }
        return Arrays.stream(dp).max().getAsInt();
    }

    public static void main(String[] args) {
        Leetcode300 code = new Leetcode300();
        System.out.println(code.lengthOfLIS(new int[]{1, 3, 6, 4, 9}));
//        System.out.println(code.lengthOfLIS(new int[]{10, 9, 2, 5, 3, 7, 101, 18}));
//        System.out.println(code.lengthOfLIS(new int[]{1, 3, 6, 7, 9, 4, 10, 5, 6}));
        //                                            1 3 6 7 9 10  = 6
        //                                            1 3 4 5 6     = 5
//        System.out.println(code.lengthOfLIS(new int[]{0, 1, 0, 3, 2, 3}));
//        System.out.println(code.lengthOfLIS(new int[]{7, 7, 7, 7, 7, 7, 7}));
    }
}
```



### 11) Catalan 数

```java
public class Catalan {
    public static void main(String[] args) {
        System.out.println(catalan(6));
    }

    static int catalan(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i < n + 1; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print("(" + j + " " + (i - 1 - j) + ")\t");
                dp[i] += dp[j] * dp[i - 1 - j];
            }
            System.out.println();
            System.out.println(Arrays.toString(dp));
        }
        return dp[n];
    }
}
```



#### Leetcode-96 不同的二叉搜索树

```java
class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int j = 2; j < n + 1; j++) {
            for (int i = 0; i < j; i++) { 
                dp[j] += dp[i] * dp[j - 1 - i];
            }
        }
        return dp[n];
    }
}
```



#### Leetcode-22 括号生成

```java
public class Leetcode22 {

    public List<String> generateParenthesis(int n) {
        ArrayList<String>[] dp = new ArrayList[n + 1];
        dp[0] = new ArrayList<>(List.of(""));
        dp[1] = new ArrayList<>(List.of("()"));
        for (int j = 2; j < n + 1; j++) {
            dp[j] = new ArrayList<>();
            for (int i = 0; i < j; i++) { // 第j个卡特兰数的拆分
                System.out.printf("(%d,%d)\t", i, j - 1 - i);
//                dp[j] += dp[i] * dp[j - 1 - i];
//                dp[j].add("(" + dp[i] + ")" + dp[j - 1 - i]);
                for (String k1 : dp[i]) {
                    for (String k2 : dp[j - 1 - i]) {
                        dp[j].add("(" + k1 + ")" + k2);
                    }
                }
            }
            System.out.println(dp[j]);
        }
        return dp[n];
    }

    public static void main(String[] args) {
        Leetcode22 code = new Leetcode22();
        System.out.println(code.generateParenthesis(4));
    }
}
```



#### 买票找零问题

售票处售卖球票，每张票 50 元。有2n人前来买票

* 其中一半人手持 50 元钞票
* 另一半人手持 100 元钞票

若售票处开始没有任何零钱，问：有多少种排队方式，能够让售票顺畅进行。



思路：

* 把手持 50 元钞票的人视为左括号
* 把手持 100 元钞票的人视为右括号
* 左右括号合法配对，即先出现左括号，再出现右括号，就可以让售票顺畅执行

可以看到，问题又变成了求解 n 的卡特兰数



#### 其它问题

| 题号         | 标题                   |
| ------------ | ---------------------- |
| Leetcode 331 | 验证二叉树的前序序列化 |
| Leetcode 894 | 所有可能的满二叉树     |
|              |                        |



### 12) 打家劫舍-Leetcode 198 

```java
public class HouseRobberLeetcode198 {

    /*
        房子价值
              0   1   2   3   4
              2   7   9   3   1

              0   1   2   3   4
              0   0   0   0   0
              2   7   11  10  12


              0   1   2   3
              2   1   1   2

              0   1   2   3
              2   2   3   4
     */

    public int rob(int[] nums) {
        int len = nums.length;
        if (len == 1) {
            return nums[0];
        }
        int[] dp = new int[len];
        dp[0] = nums[0];
        dp[1] = Integer.max(nums[0], nums[1]);
        for (int i = 2; i < len; i++) {
            dp[i] = Integer.max(dp[i - 2] + nums[i], dp[i - 1]);
        }
        return dp[len - 1];
    }

    public static void main(String[] args) {
        HouseRobberLeetcode198 code = new HouseRobberLeetcode198();
        System.out.println(code.rob(new int[]{2, 7, 9, 3, 1}));
        System.out.println(code.rob(new int[]{2, 1, 1, 2}));
    }
}
```



### 13) Travelling salesman problem

旅行商问题

![image-20230731213127478](/imgs/image-20230731213127478.png)

java 代码

```java
public class TravellingSalesmanProblem {

    /*
            0   1   2   3
        0   0   1   2   3
        1   1   0   6   4
        2   2   6   0   5
        3   3   4   5   0

        d(0,{1,2,3}) => c01+d(1,{2,3}) => c12+d(2,{3}) => c23+d(3,{})
                                          c13+d(3,{2}) => c32+d(2,{})
                        c02+d(2,{1,3}) => c21+d(1,{3}) => c13+d(3,{})
                                          c23+d(3,{1}) => c31+d(1,{})
                        c03+d(3,{1,2}) => c31+d(1,{2}) => c12+d(2,{})
                                          c32+d(2,{1}) => c21+d(1,{})

        d(0,{1}) => c01+d(1,{}) 0->1->0
        d(1,{1})
        d(2,{1}) => c21+d(1,{}) 2->1->0
        d(3,{1}) => c31+d(1,{}) 3->1->0

        d(0,{2}) => c02+d(2,{}) 0->2->0
        d(1,{2}) => c12+d(2,{}) 1->2->0
        d(2,{2})
        d(3,{2}) => c32+d(2,{}) 3->2->0

        d(0,{1,2}) => c01+d(1,{2}) => 0->1->2->0
                      c02+d(2,{1}) => 0->2->1->0
        d(3,{1,2}) => c31+d(1,{2}) => 3->1->2->0
                      c32+d(2,{1}) => 3->2->1->0

        d(0,{3}) => c03+d(3,{}) 0->3->0
        d(1,{3}) => c13+d(3,{}) 1->3->0
        d(2,{3}) => c23+d(3,{}) 2->3->0
        d(3,{3})

        d(0,{1,3}) => c01+d(1,{3}) => 0->1->3->0
                      c03+d(3,{1}) => 0->3->1->0
        d(2,{1,3}) => c21+d(1,{3}) => 2->1->3->0
                      c23+d(3,{1}) => 2->3->1->0


        d(0,{2,3}) => c02+d(2,{3}) => 0->2->3->0
                      c03+d(3,{2}) => 0->3->2->0
        d(1,{2,3}) => c12+d(2,{3}) => 1->2->3->0
                      c13+d(3,{2}) => 1->3->2->0

        d(0,{1,2,3}) => c01+d(1,{2,3})  11+1
                        c02+d(2,{1,3})  10+2
                        c03+d(3,{1,2})  12+3

            0       1       2       12      3       13      23      123
            0       1       2       3       4       5       6       7
       0    0       2       4       9       6       8       10      12
       1    1       _       8       _       7       _       11      _
       2    2       7       _       _       8       10      _       _
       3    3       5       7       12      _       _       _       _

     */


    public static void main(String[] args) {
        int[][] graph = {
                {0, 1, 2, 3},
                {1, 0, 6, 4},
                {2, 6, 0, 5},
                {3, 4, 5, 0},
        };
//        System.out.println(tsp(graph));
        System.out.println(6 >> (0-1));
    }

    static int tsp1(int[][] graph) {
        int n = graph.length;
        int[][] dp = new int[1 << n][n];
        for (int[] row : dp) {
            Arrays.fill(row, Integer.MAX_VALUE / 2);
        }
        dp[1][0] = 0;
        for (int mask = 1; mask < 1 << n; mask++) {
            for (int i = 0; i < n; i++) {
                if ((mask & 1 << i) == 0) continue;
                for (int j = 0; j < n; j++) {
                    if ((mask & 1 << j) != 0) continue;
                    dp[mask | 1 << j][j] = Math.min(dp[mask | 1 << j][j], dp[mask][i] + graph[i][j]);
                }
            }
            print(dp);
        }

        int res = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            res = Math.min(res, dp[(1 << n) - 1][i] + graph[i][0]);
        }
        return res;
    }

    /*
        110 是否包含 0 = 0 & 1 = 0
        110 是否包含 1 = 110 & 1 = 0
        110 是否包含 2 = 11 & 1 = 1
        110 是否包含 3 = 1 & 1 = 1
        110 是否包含 4 = 0 & 1 = 0
     */
    static boolean contains(int set, int city) {
        return (set >> (city - 1) & 1) == 1;
    }

    /*
        110     110
       ^100    ^010
       ----    ----
         10     100

     */
    static int exclude(int set, int city) {
        return set ^ (1 << (city - 1));
    }

    static int tsp(int[][] g) {
        int n = g.length;
        int m = 1 << (n - 1);
        int[][] dp = new int[n][m];
        for (int i = 0; i < n; i++) {
            dp[i][0] = g[i][0];
        }
        for (int j = 1; j < m; j++) {
            for (int i = 0; i < n; i++) {
                dp[i][j] = Integer.MAX_VALUE / 2;
                if (contains(j, i)) continue;
                for (int k = 1; k < n; k++) {
                    if (contains(j, k)) {
//                    System.out.println("(" + k + "," + (j ^ (1 << (k - 1))) + ")");
                        dp[i][j] = Math.min(dp[i][j], g[i][k] + dp[k][exclude(j, k)]);
                    }
                }
            }
            print(dp);
        }

        return dp[0][m - 1];
    }

    static void print(int[][] dist) {
        System.out.println("-------------------------");
        for (int[] row : dist) {
            System.out.println(Arrays.stream(row).boxed()
                    .map(x -> x >= Integer.MAX_VALUE / 2 ? "∞" : String.valueOf(x))
                    .map(s -> String.format("%2s", s))
                    .collect(Collectors.joining(",", "[", "]")));
        }
    }
}
```



### 其它题目

| 题号         | 标题             |
| ------------ | ---------------- |
| 无           | 集合覆盖问题     |
| 无           | 扔鸡蛋问题       |
| Leetcode 72  | 编辑距离         |
| Leetcode 121 | 买股票的最佳时机 |



#### 组合总和 IV-Leetcode 377

不要被题目名字误导了，本题类似于零钱兑换518题，区别在于零钱兑换求的是组合数，本题求的是排列数

```java
public class CombinationLeetcode377 {
    static int combinationSum4(int[] nums, int target) {
        return change(nums, target);
    }

    /*
            0       1       2       3       4 总金额
        1           1       11      111     1111
        2           1       11      111     1111
                            2       12      112
                                    21      121
                                            22
                                            211
        3           1       11      111     1111
                            2       12      112
                                    21      121
                                    3       13
                                            211
                                            22
                                            31
        面值
        dp[j] = dp[j-1] + dp[j-2] + dp[j-3]
     */

    static int change(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int j = 1; j < amount + 1; j++) {
            for (int coin : coins) {
                if (j >= coin) {
                    dp[j] += dp[j - coin];
                }
            }
            System.out.println(Arrays.toString(dp));
        }
        return dp[amount];
    }

    public static void main(String[] args) {
        System.out.println(combinationSum4(new int[]{1, 2, 3}, 4));
    }
}
```