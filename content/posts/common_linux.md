+++
date = '2025-08-29T08:05:44+08:00'
title = '[Linux] 常用CLI'
toc = true  # 启用目录
+++
**摘要**：工作中常用的 Linux 命令及其解释说明。

## 排查存储空间占用
```bash
sudo du -h --max-depth=1 . | sort -hr | head -n 5
```
`du`: disk usage, 查看磁盘使用量的

`-h`: human-readable, 转成人类可以理解的K、M、G这种单位

`--max-depth=1`: du 命令遍历目录的深度，0 表示只查看当前目录的容量，1 表示查看当前目录下一层目录的使用量，和tree -L 1 那个意思是一样的

`.`：查看当前目录，当然也可以指定其他目录

`sort -hr`：按照前面 -h 到排序，reverse 逆序排序

`head -n 5`：只输出前 5 项到终端