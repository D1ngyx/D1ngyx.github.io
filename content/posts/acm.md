+++
date = '1999-10-09T15:00:00+09:00'
title = '[ACM] 网瘾比赛常见模版'
toc = true  # 启用目录
+++


## 1. 基础

### 1.1 前n项和
```cpp
// a1 * n + n * (n-1) / 2 * d
template <typename T>
T sn(T a1, T n, T d) {
    T an = a1 + (n - 1) * d;
    T ret = (a1 + an) * n / 2;
    return ret;
}
```
### 1.2 向上取整
```cpp
// x 除 y 向上取整
template<typename T>
T div_up(T x, T y) {return (x+y-1)/y;}
```
### 1.3 快速幂
```cpp
// a 的 b 次方，对 p 取模
i64 qpow(i64 _a, i64 _b, i64 _p) {i64 _ret = 1 % _p, _t = _a; while (_b) {if (_b&1) _ret = _ret * _t % _p; _t = _t * _t % _p; _b >>= 1;} return _ret;}
```

### 1.4 判质数
```cpp
// 朴素判质数。当年线下面试吉比特就出的这题我草。
template<typename T>
bool Is_prime(T x) {if (x < 2) return false; for (int i = 2; i <= x / i; i ++ ) if (x % i == 0) return false; return true;}
```

线性筛质数
```cpp
/* 
    线性筛质数
    比如 对于数字 n=10, 筛出来所有小于等于 n=10 的质数
    primes 中存放所有质数
    is_prime 用来筛掉合数
*/
Vec<int> primes, is_prime;
void prime_sieve (int n) {
    is_prime.resize(n+10, 1);
    for (int i = 2; i <= n; ++ i) {
        if (is_prime[i]) primes.push_back(i);
        for (auto &p : primes) {
            if (p > n/i) break;
            else {
                is_prime[p * i] = 0;
                if (i % p == 0) break;
            }
        }
    }
}
```

### 1.5 LCM
```cpp
// 最小公倍数
template<typename T>
T Lcm(T a, T b) {return a / std::__gcd(a, b) * b;}
// res = lcm(a, b);
```

### 1.6 质因数分解
```cpp
/*  例如 6 被分解输出
        2 1
        3 1
    8 被分解输出
        2 3
*/
auto Divide = [&] (int x) {
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0) {
            int s = 0;
            while (x % i == 0) x /= i, s ++ ;
            std::cout << i << ' ' << s << '\n';
        }
    if (x > 1) std::cout << x << ' ' << 1 << '\n';
};
```

### 1.7 递归
```cpp
auto dfs = [&] (auto&& dfs, ...) {
    ...
};
// dfs(dfs, ...);
```

### 1.8 双指针
```cpp
// 字符串 S 的总长度为 N
// 找重复元素的最大连续长度
for (i32 i = 0, j = 0; i < N; ) {
    while (j < N && S[j] == S[i]) ++ j; 
    // 每次做完 while，S[i]到S[j-1] 就是一段连续相同子数组 
    // 即 len = j - i;
    // logic here
    i = j;
}
// https://atcoder.jp/contests/abc329/tasks/abc329_c
```

### 1.9 二分
<img src="/images/binary_search.png" alt="bin search" style="zoom:50%;" />

```cpp
int bfind(int l, int r) {
    while (l < r) {
        int mid = l+r>>1 或者 l+r+1>>1;
        if (check(mid) == true) r=mid 或者 l=mid
        else 让两个指针交叉，即r在左边l在右边。例如上面是l=mid，那这里必然是r=mid-1 
    }
    return l; // 此必定有 l==r
}
```
需要注意，这个模版是针对 x 轴是正整数的，而且一定是假设 x 轴是按照 1,2,3,... 这样分布的
可能有点抽象不太好说，参考下图

<img src="/images/wired_bin_search.png" alt="wired bin search" style="zoom:50%;" />

或者来两道题感受一下
https://atcoder.jp/contests/abc161/tasks/abc161_d 
https://atcoder.jp/contests/abc155/tasks/abc155_d 

### 1.10 堆
```cpp
//大根堆，pop出来的是最大的数
priority_queue<int> pq;
// 小根堆，pop出来的是最小的数
priority_queue<int, vector<int>, greater<int> > pq;
```

## 2. 图论
### 2.1 四个方向
```cpp
constexpr i32 dx[4] = {0, 1, 0, -1}, dy[4] = {1, 0, -1, 0}; // RDLU
```

### 2.2 并查集
```cpp
/*
 * 初始化              Dsu dsu(N)     其中N是结点个数
 * 合并x和y            dsu.unite(x, y)
 * 找x的根节点          dsu.find(x)
 * 判断x和y是否联通      dsu.same(x, y)
 */
class Dsu {
private:
    vector<int> root_of_;
public:
    Dsu(int size) {
        root_of_.resize(size);
        std::iota(root_of_.begin(), root_of_.end(), 0);
    }
    int find(int x) {
        if (root_of_[x] != x) {
            root_of_[x] = find(root_of_[x]);
        }
        return root_of_[x];
    }
    void unite(int x, int y) {
        root_of_[find(x)] = find(y);
    }
    bool same(int x, int y) {
        return find(x) == find(y);
    }
};
```

## 3. 输入输出
### 3.1 小数点位数
只有沟槽的牛客喜欢出这种题。
```cpp
// 格式化输出 cout 后面固定 n 位数, 在主函数调用一次即可
void cout_percision(int n) {
    std::cout.setf(std::ios::fixed);
    std::cout.precision(n);
}
```

