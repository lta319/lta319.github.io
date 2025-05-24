---
title: 单调队列和栈
published: 2025-05-24
description: 单调队列和栈
tags: [Markdown, Blogging]
category: Algorithm Design
licenseName: "Unlicensed"
author: Ankou
sourceLink: ''
draft: false
---
# 单调队列和栈

### 单调递减队列

```java
public class MonotonicStack<T extends Comparable<T>> {
    private final LinkedList<T> stack = new LinkedList<>();

    public void push(T t) {
        while (!stack.isEmpty() && stack.peek().compareTo(t) < 0) {
            stack.pop();
        }
        stack.push(t);
    }

    public void pop() {
        stack.pop();
    }

    public T peek() {
        return stack.peek();
    }

    @Override
    public String toString() {
        return stack.toString();
    }

    public static void main(String[] args) {
        MonotonicStack<Integer> stack = new MonotonicStack<>();
        for (int i : new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}) {
            stack.push(i);
            System.out.println(stack);
        }
    }
}
```



### 最大滑动窗口-Leetcode 239

```java
public class SlidingWindowMaximumLeetcode239 {
    static int[] maxSlidingWindow(int[] nums, int k) {
        MonotonicQueue<Integer> q = new MonotonicQueue<>();
        int[] output = new int[nums.length - (k - 1)];
        for (int i = 0; i < nums.length; i++) {
            if (i >= k && nums[i - k] == q.peek()) {
                q.poll();
            }
            int num = nums[i];
            q.offer(num);
            if (i >= k - 1) {
                output[i - (k - 1)] = q.peek();
            }
        }
        return output;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3))); //[3, 3, 5, 5, 6, 7]
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{7, 2, 4}, 2))); // [7, 4]
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1, 3, 1, 2, 0, 5}, 3))); // [3, 3, 2, 5]
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{-7, -8, 7, 5, 7, 1, 6, 0}, 4))); // [7, 7, 7, 7, 7]
    }
}
```

* 如果每移动一次窗口，就在 k 个数里找最大值，时间复杂度约为 $O(n*k)$
* 利用了单调队列后，每个元素都最多**入队**、**出队**一次，找最大值就在队头找，时间复杂度为 $O(n)$



### 单调递减栈

```java
public class MonotonicStack {
    static class ValueAndIndex {
        int value;
        int i;

        public ValueAndIndex(int value, int i) {
            this.value = value;
            this.i = i;
        }

        @Override
        public String toString() {
//            return "[%d]%d".formatted(index, value);
            return "%d".formatted(value);
        }
    }

    private final LinkedList<ValueAndIndex> stack = new LinkedList<>();

    public void push(int value, int i, TriConsumer onPop) {
        while (!stack.isEmpty() && stack.peek().value < value) {
            ValueAndIndex pop = stack.pop();
            ValueAndIndex peek = stack.peek();
            if (peek != null) {
                onPop.accept(pop.value, peek.value, peek.i);
            }
        }
        stack.push(new ValueAndIndex(value, i));
    }

    @Override
    public String toString() {
        return stack.toString();
    }
}
```



### 接雨水-Leetcode 42

```java
public class TrappingRainWaterLeetcode42 {
    public static void main(String[] args) {
        System.out.println(trap(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1})); // 6
        System.out.println(trap(new int[]{4, 2, 0, 3, 2, 5})); // 9
    }

    record Data(int height, int i) {
    }


    static int trap(int[] heights) {
        int sum = 0;
        LinkedList<Data> stack = new LinkedList<>();
        for (int i = 0; i < heights.length; i++) {
            Data right = new Data(heights[i], i);
            while (!stack.isEmpty() && stack.peek().height < heights[i]) {
                Data pop = stack.pop();
                Data left = stack.peek();
                if (left != null) {
                    sum += (Integer.min(left.height, right.height) - pop.height) * (right.i - left.i - 1);
                }
            }
            stack.push(right);
        }
        return sum;
    }
}
```

* 维护一个单调栈
* 当加入新柱子（right）时，如果发现要弹出之前的柱子，表示遇到了凹陷的地方
  * 此时栈里没有更左边的柱子，表示拦不住雨水
  * 栈里有左边柱子（left）就可以计算雨水容量：$(right.i - left.i-1)*Min(right.height,left.height)-pop.height$