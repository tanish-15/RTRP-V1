const practiceData = [
{ id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", company: "Google", url: "https://leetcode.com/problems/two-sum/" },
    { id: 49, title: "Group Anagrams", difficulty: "Medium", topic: "Arrays", company: "Amazon", url: "https://leetcode.com/problems/group-anagrams/" },
    { id: 11, title: "Container With Most Water", difficulty: "Medium", topic: "Two Pointers", company: "Facebook", url: "https://leetcode.com/problems/container-with-most-water/" },
    { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Sliding Window", company: "Microsoft", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", company: "Uber", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { id: 206, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", company: "Google", url: "https://leetcode.com/problems/reverse-linked-list/" },
    { id: 98, title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Trees", company: "Bloomberg", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
    { id: 200, title: "Number of Islands", difficulty: "Medium", topic: "Graphs", company: "Amazon", url: "https://leetcode.com/problems/number-of-islands/" },
    { id: 70, title: "Climbing Stairs", difficulty: "Easy", topic: "DP", company: "Adobe", url: "https://leetcode.com/problems/climbing-stairs/" },
    { id: 322, title: "Coin Change", difficulty: "Medium", topic: "DP", company: "Amazon", url: "https://leetcode.com/problems/coin-change/" },  
    // Microsoft
    { id: 217, title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays", company: "Microsoft", url: "https://leetcode.com/problems/contains-duplicate/" },
    { id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", company: "Microsoft", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { id: 15, title: "3Sum", difficulty: "Medium", topic: "Two Pointers", company: "Microsoft", url: "https://leetcode.com/problems/3sum/" },
    { id: 139, title: "Word Break", difficulty: "Medium", topic: "DP", company: "Microsoft", url: "https://leetcode.com/problems/word-break/" },
    { id: 124, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Trees", company: "Microsoft", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { id: 72, title: "Edit Distance", difficulty: "Hard", topic: "DP", company: "Microsoft", url: "https://leetcode.com/problems/edit-distance/" },

    // Amazon
    { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", company: "Amazon", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { id: 242, title: "Valid Anagram", difficulty: "Easy", topic: "Hashing", company: "Amazon", url: "https://leetcode.com/problems/valid-anagram/" },
    { id: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search", company: "Amazon", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { id: 56, title: "Merge Intervals", difficulty: "Medium", topic: "Intervals", company: "Amazon", url: "https://leetcode.com/problems/merge-intervals/" },
    { id: 84, title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stack", company: "Amazon", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    { id: 42, title: "Trapping Rain Water", difficulty: "Hard", topic: "Two Pointers", company: "Amazon", url: "https://leetcode.com/problems/trapping-rain-water/" },

    // TCS
    { id: 58, title: "Length of Last Word", difficulty: "Easy", topic: "Strings", company: "TCS", url: "https://leetcode.com/problems/length-of-last-word/" },
    { id: 67, title: "Add Binary", difficulty: "Easy", topic: "Math", company: "TCS", url: "https://leetcode.com/problems/add-binary/" },
    { id: 49, title: "Group Anagrams", difficulty: "Medium", topic: "Hashing", company: "TCS", url: "https://leetcode.com/problems/group-anagrams/" },
    { id: 78, title: "Subsets", difficulty: "Medium", topic: "Backtracking", company: "TCS", url: "https://leetcode.com/problems/subsets/" },
    { id: 51, title: "N-Queens", difficulty: "Hard", topic: "Backtracking", company: "TCS", url: "https://leetcode.com/problems/n-queens/" },
    { id: 37, title: "Sudoku Solver", difficulty: "Hard", topic: "Backtracking", company: "TCS", url: "https://leetcode.com/problems/sudoku-solver/" },

// ===================== INFOSYS (Additions) =====================
{ id: 35, title: "Search Insert Position", difficulty: "Easy", topic: "Binary Search", company: "Infosys", url: "https://leetcode.com/problems/search-insert-position/" },
{ id: 205, title: "Isomorphic Strings", difficulty: "Easy", topic: "Strings", company: "Infosys", url: "https://leetcode.com/problems/isomorphic-strings/" },
{ id: 19, title: "Remove Nth Node From End of List", difficulty: "Medium", topic: "Linked List", company: "Infosys", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
{ id: 238, title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", company: "Infosys", url: "https://leetcode.com/problems/product-of-array-except-self/" },
{ id: 25, title: "Reverse Nodes in k-Group", difficulty: "Hard", topic: "Linked List", company: "Infosys", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
{ id: 127, title: "Word Ladder", difficulty: "Hard", topic: "Graphs", company: "Infosys", url: "https://leetcode.com/problems/word-ladder/" },

// ===================== WIPRO (Additions) =====================
{ id: 14, title: "Longest Common Prefix", difficulty: "Easy", topic: "Strings", company: "Wipro", url: "https://leetcode.com/problems/longest-common-prefix/" },
{ id: 118, title: "Pascal's Triangle", difficulty: "Easy", topic: "DP", company: "Wipro", url: "https://leetcode.com/problems/pascals-triangle/" },
{ id: 128, title: "Longest Consecutive Sequence", difficulty: "Medium", topic: "Arrays", company: "Wipro", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
{ id: 394, title: "Decode String", difficulty: "Medium", topic: "Stack", company: "Wipro", url: "https://leetcode.com/problems/decode-string/" },
{ id: 76, title: "Minimum Window Substring", difficulty: "Hard", topic: "Sliding Window", company: "Wipro", url: "https://leetcode.com/problems/minimum-window-substring/" },
{ id: 140, title: "Word Break II", difficulty: "Hard", topic: "DP", company: "Wipro", url: "https://leetcode.com/problems/word-break-ii/" },

// ===================== TECH MAHINDRA (Additions) =====================
{ id: 101, title: "Symmetric Tree", difficulty: "Easy", topic: "Trees", company: "Tech Mahindra", url: "https://leetcode.com/problems/symmetric-tree/" },
{ id: 226, title: "Invert Binary Tree", difficulty: "Easy", topic: "Trees", company: "Tech Mahindra", url: "https://leetcode.com/problems/invert-binary-tree/" },
{ id: 207, title: "Course Schedule", difficulty: "Medium", topic: "Graphs", company: "Tech Mahindra", url: "https://leetcode.com/problems/course-schedule/" },
{ id: 210, title: "Course Schedule II", difficulty: "Medium", topic: "Graphs", company: "Tech Mahindra", url: "https://leetcode.com/problems/course-schedule-ii/" },
{ id: 329, title: "Longest Increasing Path in a Matrix", difficulty: "Hard", topic: "DP", company: "Tech Mahindra", url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/" },
{ id: 212, title: "Word Search II", difficulty: "Hard", topic: "Backtracking", company: "Tech Mahindra", url: "https://leetcode.com/problems/word-search-ii/" },

// ===================== HCL (Additions) =====================
{ id: 191, title: "Number of 1 Bits", difficulty: "Easy", topic: "Bit Manipulation", company: "HCL", url: "https://leetcode.com/problems/number-of-1-bits/" },
{ id: 231, title: "Power of Two", difficulty: "Easy", topic: "Bit Manipulation", company: "HCL", url: "https://leetcode.com/problems/power-of-two/" },
{ id: 130, title: "Surrounded Regions", difficulty: "Medium", topic: "Graphs", company: "HCL", url: "https://leetcode.com/problems/surrounded-regions/" },
{ id: 347, title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap", company: "HCL", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
{ id: 239, title: "Sliding Window Maximum", difficulty: "Hard", topic: "Heap", company: "HCL", url: "https://leetcode.com/problems/sliding-window-maximum/" },
{ id: 85, title: "Maximal Rectangle", difficulty: "Hard", topic: "DP", company: "HCL", url: "https://leetcode.com/problems/maximal-rectangle/" },

// BLIND 75 - NEETCODE//

{ id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/two-sum/" },
{ id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
{ id: 217, title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/contains-duplicate/" },
{ id: 238, title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/product-of-array-except-self/" },
{ id: 53, title: "Maximum Subarray", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/maximum-subarray/" },
{ id: 152, title: "Maximum Product Subarray", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/maximum-product-subarray/" },
{ id: 153, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
{ id: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
{ id: 15, title: "3Sum", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/3sum/" },
{ id: 11, title: "Container With Most Water", difficulty: "Medium", topic: "Arrays", company: "Blind 75", url: "https://leetcode.com/problems/container-with-most-water/" },

/* ================= BINARY ================= */
{ id: 371, title: "Sum of Two Integers", difficulty: "Medium", topic: "Binary", company: "Blind 75", url: "https://leetcode.com/problems/sum-of-two-integers/" },
{ id: 191, title: "Number of 1 Bits", difficulty: "Easy", topic: "Binary", company: "Blind 75", url: "https://leetcode.com/problems/number-of-1-bits/" },
{ id: 338, title: "Counting Bits", difficulty: "Easy", topic: "Binary", company: "Blind 75", url: "https://leetcode.com/problems/counting-bits/" },
{ id: 268, title: "Missing Number", difficulty: "Easy", topic: "Binary", company: "Blind 75", url: "https://leetcode.com/problems/missing-number/" },
{ id: 190, title: "Reverse Bits", difficulty: "Easy", topic: "Binary", company: "Blind 75", url: "https://leetcode.com/problems/reverse-bits/" },

/* ================= DYNAMIC PROGRAMMING ================= */
{ id: 70, title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/climbing-stairs/" },
{ id: 322, title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/coin-change/" },
{ id: 300, title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
{ id: 1143, title: "Longest Common Subsequence", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/longest-common-subsequence/" },
{ id: 139, title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/word-break/" },
{ id: 377, title: "Combination Sum IV", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/combination-sum-iv/" },
{ id: 198, title: "House Robber", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/house-robber/" },
{ id: 213, title: "House Robber II", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/house-robber-ii/" },
{ id: 91, title: "Decode Ways", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/decode-ways/" },
{ id: 62, title: "Unique Paths", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/unique-paths/" },
{ id: 55, title: "Jump Game", difficulty: "Medium", topic: "Dynamic Programming", company: "Blind 75", url: "https://leetcode.com/problems/jump-game/" },

/* ================= GRAPH ================= */
{ id: 133, title: "Clone Graph", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/clone-graph/" },
{ id: 207, title: "Course Schedule", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/course-schedule/" },
{ id: 417, title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
{ id: 200, title: "Number of Islands", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/number-of-islands/" },
{ id: 128, title: "Longest Consecutive Sequence", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
{ id: 269, title: "Alien Dictionary", difficulty: "Hard", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/alien-dictionary/" },
{ id: 261, title: "Graph Valid Tree", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/graph-valid-tree/" },
{ id: 323, title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", topic: "Graph", company: "Blind 75", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },

/* ================= INTERVAL ================= */
{ id: 57, title: "Insert Interval", difficulty: "Medium", topic: "Interval", company: "Blind 75", url: "https://leetcode.com/problems/insert-interval/" },
{ id: 56, title: "Merge Intervals", difficulty: "Medium", topic: "Interval", company: "Blind 75", url: "https://leetcode.com/problems/merge-intervals/" },
{ id: 435, title: "Non-overlapping Intervals", difficulty: "Medium", topic: "Interval", company: "Blind 75", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
{ id: 252, title: "Meeting Rooms", difficulty: "Easy", topic: "Interval", company: "Blind 75", url: "https://leetcode.com/problems/meeting-rooms/" },
{ id: 253, title: "Meeting Rooms II", difficulty: "Medium", topic: "Interval", company: "Blind 75", url: "https://leetcode.com/problems/meeting-rooms-ii/" },

/* ================= LINKED LIST ================= */
{ id: 206, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", company: "Blind 75", url: "https://leetcode.com/problems/reverse-linked-list/" },
{ id: 141, title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List", company: "Blind 75", url: "https://leetcode.com/problems/linked-list-cycle/" },
{ id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", company: "Blind 75", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
{ id: 23, title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Linked List", company: "Blind 75", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
{ id: 19, title: "Remove Nth Node From End of List", difficulty: "Medium", topic: "Linked List", company: "Blind 75", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
{ id: 143, title: "Reorder List", difficulty: "Medium", topic: "Linked List", company: "Blind 75", url: "https://leetcode.com/problems/reorder-list/" },

/* ================= TREE ================= */
{ id: 104, title: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
{ id: 100, title: "Same Tree", difficulty: "Easy", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/same-tree/" },
{ id: 226, title: "Invert Binary Tree", difficulty: "Easy", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/invert-binary-tree/" },
{ id: 124, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
{ id: 102, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
{ id: 297, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
{ id: 572, title: "Subtree of Another Tree", difficulty: "Easy", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/subtree-of-another-tree/" },
{ id: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
{ id: 98, title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
{ id: 230, title: "Kth Smallest Element in a BST", difficulty: "Medium", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
{ id: 235, title: "Lowest Common Ancestor of BST", difficulty: "Easy", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
{ id: 208, title: "Implement Trie", difficulty: "Medium", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
{ id: 211, title: "Add and Search Word", difficulty: "Medium", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
{ id: 212, title: "Word Search II", difficulty: "Hard", topic: "Tree", company: "Blind 75", url: "https://leetcode.com/problems/word-search-ii/" },

/* ================= HEAP ================= */
{ id: 347, title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap", company: "Blind 75", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
{ id: 295, title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap", company: "Blind 75", url: "https://leetcode.com/problems/find-median-from-data-stream/" },

/* ================= BACKTRACKING ================= */
{ id: 39, title: "Combination Sum", difficulty: "Medium", topic: "Backtracking", company: "Blind 75", url: "https://leetcode.com/problems/combination-sum/" },
{ id: 79, title: "Word Search", difficulty: "Medium", topic: "Backtracking", company: "Blind 75", url: "https://leetcode.com/problems/word-search/" },
{ id: 131, title: "Palindrome Partitioning", difficulty: "Medium", topic: "Backtracking", company: "Blind 75", url: "https://leetcode.com/problems/palindrome-partitioning/" },
{ id: 78, title: "Subsets", difficulty: "Medium", topic: "Backtracking", company: "Blind 75", url: "https://leetcode.com/problems/subsets/" },

/* ================= STACK ================= */
{ id: 20, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", company: "Blind 75", url: "https://leetcode.com/problems/valid-parentheses/" },
{ id: 155, title: "Min Stack", difficulty: "Medium", topic: "Stack", company: "Blind 75", url: "https://leetcode.com/problems/min-stack/" },
{ id: 150, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", topic: "Stack", company: "Blind 75", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
{ id: 739, title: "Daily Temperatures", difficulty: "Medium", topic: "Stack", company: "Blind 75", url: "https://leetcode.com/problems/daily-temperatures/" },
{ id: 853, title: "Car Fleet", difficulty: "Medium", topic: "Stack", company: "Blind 75", url: "https://leetcode.com/problems/car-fleet/" },

/* ================= BINARY SEARCH ================= */
{ id: 704, title: "Binary Search", difficulty: "Easy", topic: "Binary Search", company: "Blind 75", url: "https://leetcode.com/problems/binary-search/" },
{ id: 74, title: "Search a 2D Matrix", difficulty: "Medium", topic: "Binary Search", company: "Blind 75", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
{ id: 875, title: "Koko Eating Bananas", difficulty: "Medium", topic: "Binary Search", company: "Blind 75", url: "https://leetcode.com/problems/koko-eating-bananas/" },
{ id: 162, title: "Find Peak Element", difficulty: "Medium", topic: "Binary Search", company: "Blind 75", url: "https://leetcode.com/problems/find-peak-element/" },
{ id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search", company: "Blind 75", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },

];
