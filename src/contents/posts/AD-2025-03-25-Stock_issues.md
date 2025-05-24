---
title: 股票问题
published: 2025-03-25
description: 股票问题
tags: [Markdown, Blogging]
category: Algorithm Design
licenseName: "Unlicensed"
author: Ankou
sourceLink: ''
draft: false
---
# 股票问题

### Leetcode 121

```java
public class SharesI {
    static int maxProfit(int[] prices) {
        int i = 0;
        int j = 1;
        int max = 0;
        while (j < prices.length) {
            if (prices[j] - prices[i] > 0) {
                max = Math.max(max, prices[j] - prices[i]);
                j++;
            } else {
                i = j;
                j++;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{9, 3, 12, 1, 2, 3, 11}));
    }
}
```



### Leetcode 122

```java
public class SharesIILeetcode122 {
    static int maxProfit(int[] prices) {
        int i = 0;
        int j = 1;
        int max = 0;
        while (j < prices.length) {
            if (prices[j] - prices[i] > 0) { // 有利润
                max += prices[j] - prices[i];
            }
            i = j;
            j++;
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{9, 3, 12, 1, 2, 3})); // 11
        System.out.println(maxProfit(new int[]{7, 1, 5, 3, 6, 4})); // 7
    }
}
```



### Leetcode 714

```java
public class SharesLeetcode714 {
    /*
        0       1           2           3           4       5
        1       3           2           8           4       9
 买     -1     等-1 √       等-1 √       等-1 √      -1       等1 √
               买-3         买-2        买-8        买1 √     买-4
 卖     0      等0  √        等0  √      等0          等5 √    等5
               卖0          卖-1         卖5 √        卖1     卖8 √


     */
    static int maxProfit(int[] prices, int fee) {
        int b1 = -prices[0];
        int s1 = 0;
        for (int i = 1; i < prices.length; i++) {
            int s0 = Math.max(s1, b1 + prices[i] - fee);
            int b0 = Math.max(b1, s1 - prices[i]);
            s1 = s0;
            b1 = b0;
        }
        return s1;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{1, 3, 2, 8, 4, 9}, 2)); // 8
        System.out.println(maxProfit(new int[]{1, 3, 7, 2, 18, 3}, 3)); // 16
//
        System.out.println(maxProfit(new int[]{1, 3, 7, 5, 10, 3}, 3)); // 6
        System.out.println(maxProfit(new int[]{1, 3, 7, 5, 10, 11, 3}, 3)); // 7
        System.out.println(maxProfit(new int[]{2,1,4,4,2,3,2,5,1,2}, 1)); // 4
    }
}
```

降维

```java
static int maxProfit(int[] prices, int fee) {
    // _buy _sell 代表上一次 buy sell 代表这一次
    int _buy = -prices[0];
    int _sell = 0;
    for (int i = 1; i < prices.length; i++) {
        int buy = Math.max(_buy, _sell - prices[i]);
        int sell = Math.max(_sell, _buy + prices[i] - fee);
        _buy = buy;
        _sell = sell;
    }
    return _sell;
}
```



结构优化（非性能）

```java
static int maxProfit(int[] prices, int fee) {
    int buy = Integer.MIN_VALUE;
    int sell = 0;
    for (int price : prices) {
        buy = Math.max(buy, sell - price);
        /*
            若 max 是 上次 buy，那么显然用这次 buy 是一样的
            若 max 是 上次 sell - prices[i], 则
                Math.max(sell, sell - prices[i] + prices[i] - fee);
                ==>
                Math.max(sell, sell - fee);
                显然后面的式子不可能比上次 sell 更大，此时新的 sell 只由上次 sell 决定，与 上次 buy 无关
         */
        sell = Math.max(sell, buy + price - fee);
    }
    return sell;
}
```

1. 在计算这次的 sell 时，用这次的 buy 代替上次 buy（证明见上方注释）
2. 设置 buy 的初始值为最小，可以让循环统一从 0 开始



### Leetcode 309

```java
public class SharesLeetcode309 {
    /*
        0       1           2           3           4
        1       2           3           0           2
 买     -1      -2          -3          1√          0
 等             -1√         -1√         -1          1√
 卖     0       1√          2√          -1          3√
 等             0           1           2√          2

     */
    static int maxProfit(int[] prices) {
        if (prices.length == 1) {
            return 0;
        }
        int[] buy = new int[prices.length];
        int[] sell = new int[prices.length];
        buy[0] = -prices[0];
        sell[0] = 0;
        buy[1] = Math.max(-prices[0], -prices[1]);
        sell[1] = Math.max(sell[0], buy[0] + prices[1]);
        for (int i = 2; i < prices.length; i++) {
            buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);
            sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
        }
        return sell[prices.length - 1];
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{1, 2, 3, 0, 2})); // 3
    }
}
```

降维

```java
static int maxProfit(int[] prices) {
    if (prices.length == 1) {
        return 0;
    }
    int __sell = 0;
    int _sell = 0;
    int _buy = -prices[0];
    for (int i = 1; i < prices.length; i++) {
        int buy = Math.max(_buy, __sell - prices[i]);
        int sell = Math.max(_sell, prices[i] + _buy);
        _buy = buy;
        __sell = _sell;
        _sell = sell;
    }
    return _sell;
}
```



### Leetcode 123

```java
public class SharesIIILeetcode123 {
    static int maxProfit(int[] prices) {
        int buy1 = Integer.MIN_VALUE;
        int sell1 = 0;
        int buy2 = Integer.MIN_VALUE;
        int sell2 = 0;
        for (int price : prices) {
            buy1 = Math.max(buy1, -price);
            sell1 = Math.max(sell1, buy1 + price);
            buy2 = Math.max(buy2, sell1 - price);
            sell2 = Math.max(sell2, buy2 + price);
        }
        return sell2;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{3, 3, 5, 0, 0, 3, 1, 4})); // 6
    }
}
```



### Leetcode 188

```java
public class SharesLeetcode188 {
    static int maxProfit(int[] prices) {
        int i = 0;
        int j = 1;
        int sum = 0;
        while (j < prices.length) {
            if (prices[j] - prices[i] > 0) { // 有利润
                sum += prices[j] - prices[i];
            }
            i++;
            j++;
        }
        return sum;
    }

    static int maxProfit(int k, int[] prices) {
        if (k > prices.length / 2) {
            return maxProfit(prices);
        }
        int[] buy = new int[k];
        int[] sell = new int[k];
        Arrays.fill(buy, Integer.MIN_VALUE);
        for (int price : prices) {
            buy[0] = Math.max(buy[0], -price);
            sell[0] = Math.max(sell[0], buy[0] + price);
            for (int j = 1; j < k; j++) {
                buy[j] = Math.max(buy[j], sell[j - 1] - price);
                sell[j] = Math.max(sell[j], buy[j] + price);
            }
        }
        return sell[k - 1];
    }

    public static void main(String[] args) {
//        System.out.println(maxProfit(2, new int[]{3, 2, 6, 5, 0, 3})); // 7
        System.out.println(maxProfit(2, new int[]{3, 3, 5, 0, 0, 3, 1, 4})); // 6
    }
}
```

* 对于天数 n = 6，最多进行 3 次交易，如果此时 k > 3，意味着不限次交易

* 对于天数 n = 7，最多进行 3 次交易，如果此时 k > 3，意味着不限次交易