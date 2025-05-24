---
title: 双指针
published: 2025-05-24
description: 双指针
tags: [Markdown, Blogging]
category: Algorithm Design
licenseName: "Unlicensed"
author: Ankou
sourceLink: ''
draft: false
---
# Leetcode 双指针

下面是的题目都会涉及双指针，除此外，还有

* Leetcode3 最长不重复子串，在 hash 表部分讲过了
* 快排中
* 二分中
*  ...

### 移动零-Leetcode 283

```java
public class MoveZeroesLeetcode283 {
    static void moveZeroes(int[] nums) {
        int i = 0;
        int j = 0;
        while (j < nums.length) {
            if (nums[j] != 0) {
                int t = nums[i];
                nums[i] = nums[j];
                nums[j] = t;
                i++;
            }
            j++;
        }
    }

    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12};
        moveZeroes(nums);
        System.out.println(Arrays.toString(nums));
    }
}
```



### 两数之和 II-Leetcode 167

```java
public class SumLeetcode167 {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
    }
    static public int[] twoSum(int[] numbers, int target) {
        return twoSum(numbers, 0, numbers.length - 1, target);
    }
    static int[] twoSum(int[] nums, int left, int right, int target) {
        int i = left;
        int j = right;
        while (i < j) {
            if (nums[i] + nums[j] < target) {
                i++;
            } else if (nums[i] + nums[j] > target) {
                j--;
            } else {
                break;
            }
        }
        return new int[]{i + 1, j + 1};
    }
}
```

与 Leetcode 1 的两数之和区别在于，本题的数组是升序排好的



### 三数之和-Leetcode 15

```java
public class SumLeetcode15 {

    static List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new LinkedList<>();
        dfs(3, 0, nums.length - 1, 0, nums,
                new LinkedList<>(), result);
        return result;
    }

    static void dfs(int n, int i, int j, int target, int[] nums,
                    LinkedList<Integer> stack,
                    List<List<Integer>> result) {
        if (n == 2) {
            // 套用两数之和求解
            twoSum(i, j, nums, target, stack, result);
            return;
        }
        for (int k = i; k < j - (n - 2); k++) {
            // 检查重复
            if (k > i && nums[k] == nums[k - 1]) {
                continue;
            }
            // 固定一个数字，再尝试 n-1 数字之和
            stack.push(nums[k]);
            dfs(n - 1, k + 1, j, target - nums[k], nums, stack, result);
            stack.pop();
        }
    }

    static int count;

    static public void twoSum(int i, int j, int[] numbers, int target,
                              LinkedList<Integer> stack,
                              List<List<Integer>> result) {
        count++;
        while (i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum < target) {
                i++;
            } else if (sum > target) {
                j--;
            } else { // 找到解
                ArrayList<Integer> list = new ArrayList<>(stack);
                list.add(numbers[i]);
                list.add(numbers[j]);
                result.add(list);
                // 继续查找其它的解
                i++;
                j--;
                while (i < j && numbers[i] == numbers[i - 1]) {
                    i++;
                }
                while (i < j && numbers[j] == numbers[j + 1]) {
                    j--;
                }
            }
        }
    }

    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        int[] candidates = {-4, -1, -1, 0, 0, 1, 1, 2};
        System.out.println("数据量:" + candidates.length);
        System.out.println(threeSum(candidates));
        System.out.println("耗费时间:" + (System.currentTimeMillis() - start));
        System.out.println("递归次数:" + count);
    }
}
```

* 本题与之前的两数之和（Leetcode 1 和 Leetcode 167）相比，区别在于
  * 两数之和里明确说了，只有一个答案，而本题要找出所有答案
  * 本题要考虑去重
* 本题类似于 组合总和 II（Leetcode 40） 区别在于
  * 40 题要求列出任意数之和等于 target 的所有组合，而本题要求三数之和等于 target 的所有组合
  * 40 题使用回溯的办法时间复杂度是 $O(2^n * n)$，而本题的三数限制了递归次数仅有一次，并且每次递归终点是求两数之和时间复杂度为 $O(n)$，因此总时间复杂度为 $O(n^2)$
* 小优化：固定数字时，应该预留三个数字做三数之和，预览两个数字做两数之和，因此有 k < j - (n - 2)



### 四数之和-Leetcode 18

```java
public class SumLeetcode18 {

    static List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> result = new LinkedList<>();
        dfs(4, 0, nums.length - 1, target, nums,
                new LinkedList<>(), result);
        return result;
    }

    static void dfs(int n, int i, int j, int target, int[] nums,
                    LinkedList<Integer> stack,
                    List<List<Integer>> result) {
        if (n == 2) {
            // 套用两数之和求解
            twoSum(i, j, nums, target, stack, result);
            return;
        }
        for (int k = i; k < j - (n - 2); k++) { // 四数之和 i <j-2  三数之和 i <j-1
            // 检查重复
            if (k > i && nums[k] == nums[k - 1]) {
                continue;
            }
            // 固定一个数字，再尝试 n-1 数字之和
            stack.push(nums[k]);
            dfs(n - 1, k + 1, j, target - nums[k], nums, stack, result);
            stack.pop();
        }
    }

    static int count;

    static public void twoSum(int i, int j, int[] numbers, int target,
                              LinkedList<Integer> stack,
                              List<List<Integer>> result) {
        count++;
        while (i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum < target) {
                i++;
            } else if (sum > target) {
                j--;
            } else { // 找到解
                ArrayList<Integer> list = new ArrayList<>(stack);
                list.add(numbers[i]);
                list.add(numbers[j]);
                result.add(list);
                // 继续查找其它的解
                i++;
                j--;
                while (i < j && numbers[i] == numbers[i - 1]) {
                    i++;
                }
                while (i < j && numbers[j] == numbers[j + 1]) {
                    j--;
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println(fourSum(new int[]{1, 0, -1, 0, -2, 2}, 0));
//        System.out.println(fourSum(new int[]{2, 2, 2, 2, 2}, 8));
//        System.out.println(fourSum(new int[]{1000000000,1000000000,1000000000,1000000000}, -294967296));
    }
}
```



### 盛最多水的容器-Leetcode 11

```java
public class MostWaterLeetcode11 {
    static int maxArea(int[] height) {
        int i = 0;
        int j = height.length - 1;
        int max = 0;
        while (i < j) {
            int min = Integer.min(height[i], height[j]);
            max = Integer.max(max, (j - i) * min);
            while (i < j && height[i] <= min) {
                i++;
            }
            while (i < j && height[j] <= min) {
                j--;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7})); // 49
        System.out.println(maxArea(new int[]{2,1})); // 1
    }
}
```



### 反转字符数组-Leetcode 344

双指针

```java
public class ReverseStringLeetcode344 {
    public static void main(String[] args) {
        char[] array = "abcde".toCharArray();
        reverseString(array);
        System.out.println(Arrays.toString(array));
    }

    static void reverseString(char[] s) {
        recursion(s, 0, s.length - 1);
    }

    public static void recursion(char[] array, int i, int j) {
        if (i >= j) {
            return;
        }
        swap(array, i, j);
        recursion(array, ++i, --j);
    }

    public static void swap(char[] array, int i, int j) {
        char c = array[i];
        array[i] = array[j];
        array[j] = c;
    }
}
```

* 第一次交换的是 array[0] 和 array[4]
* 第二次交换的是 array[1] 和 array[3]
* 第三次 i = j = 2，开始返回
* 如果 array.length 是偶数，则会在 i > j 时返回