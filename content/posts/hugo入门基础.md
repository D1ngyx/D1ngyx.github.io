+++
date = '2025-08-24T13:16:15+08:00'
title = 'Hugo入门'
toc = true  # 启用目录
+++

## 1. 基本内容

## 2. 自定义主题

## 3. 部署到Github

​	部署到 Github 到方法有很多，这里介绍本人常用的一种。比较常见的是把public文件夹上传，但是个人感觉这样有点麻烦，一种更简洁的方法是导出 `docs` 文件夹然后可以把这个项目上传。

### 3.1 项目导出

​	首先把这个hugo项目导出到 `docs` 文件夹。不同于直接使用 hugo 命令生成项目到 public 目录中。

​	这里注意，导出到的 `--destination` 指定的文件夹名字必须是 `docs`。另一个 `--minify` 这个参数顾名思义了，就是简化生产的文件，在使用之初不必在意。

```bash
 hugo --minify --destination docs
```

​	如果正常，应在项目根路径下生成如下目录：

<img src="/images/generate_docs.png" alt="generate_docs" width="10%">


​	然后要记得在 `hugo.homl` 目录下配置一下 baseURL：

```bash
# 原版官方生成的大概率是这个，注释掉 
# baseURL = 'https://example.org/'
# 这个 `baseURL` 就是你的域名，如果没有买域名那就是 Github 静态页面的标准地址
baseURL = 'https://你的Github用户名.github.io/'
```



### 3.2 Github仓库设置

​	原因在于，我们需要在 Github 的 Pages 页面做如下设置，让他从 `docs` 路径下解析静态页面，而不是从默认的 root 路径下。

<img src="/images/modify_github_pages.png" alt="modify_github_pages" width="50%">



### 3.3 推送到 Github

​	确保设置了远程仓库的地址。

```bash
git remote add origin https://github.com/xxx/xxx.git	
```

​	直接一套常规操作推上去即可。

```bash
git add .
git commit -m "[x]: Comment"
git push -u origin main
```





