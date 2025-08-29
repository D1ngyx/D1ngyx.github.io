+++
date = '2025-08-27T08:19:56+08:00'
title = '[C++] [ROS] CPP基础开发环境配置'
toc = true  # 启用目录
+++

**摘要：** 这里的 CPP 开发环境，指的是为文本编辑器配置特定语言的补全以及诊断功能。显示的配置方式有很多，这里只展示本人在**工作中**经常用到的一种。经实测，适用于常规 **CPP** 项目开发，或者 **ROS** 中的 CPP 项目开发。
</br></br>

## 1. 提供语言服务

### 1.1  基本逻辑

现代文本编辑器的语言支持，依赖语言服务协议（LanguageServerProtocol, LSP），来为文本编辑器实时检测功能。

<img src="/images/cppconfig_overall.png" alt="cppconfig_overall" />


本质来说，实现语言服务功能，是要让文本编辑器能够读取到编译时需要的各种路径和库，从而实现语言支持。

对于常规的 `cmake`，或者是 ros 中的 `catkin_make`，可以通过 `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON` 来生成一个叫做 `compile_commands.json` 的文件。

简单来说，我们只需要让文本编辑器，读取这个 compile_commands.json 里面的内容，就可以实现基本的补全、高亮、诊断的基础语言服务功能了。



### 1.2 具体实现

假设我们在一个标准的 CPP 开发项目目录中，结构如下。

```bash
dingyx in ~/Temporary/cpp_project_root
> tree
.
├── build
├── CMakeLists.txt
├── include
└── src
```

通过以下命令来生成 compile_commands.json 到 build 目录中 (**cmake 和 catkin_make 都适用**)

```bash
cmake -Bbuild -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

由此，您应该能够在 build 目录下看到一个 compile_commands.json 文件。

需要注意的是 compile_commands.json 文件是**不会** 自动更新的，如果您修改代码或者头文件，必须 **重新** 编译并使用 -DCMAKE_EXPORT_COMPILE_COMMANDS=ON 参数。

此外，您也可以直接在 CMakeLists.txt 中设置 CMAKE_EXPORT_COMPILE_COMMANDS 参数为 ON。



### 1.3 Dummy 技巧（可选）

您应该在一些项目中看到过类似 dummy.cpp 的文件，这是生成 compile_commands.json 的一种 **trick**。

有时候，**不方便** 重新编译整个项目来直接生成 compile_commands.json 文件。

此时，常见的方法，是通过创建一个 dummy.cpp 文件（当然，文件名可以随便定义，常见的是 dummy.cpp），来导入所有头文件，然后编译 dummy.cpp 文件，来把所有头文件导入进来，一个示例如下。

```cpp
// src/dummy.cpp
// 导入项目中使用的所有头文件
#include <...>
#include "..."
...
// 随便写一个 main 函数
int main() {
  std::cout << "include all you need" << std::endl;
  return 0;
}
```
</br></br>


## 2. 在 Vscode 中使用

Vscdoe 的配置非常简单，只需要在 CPP 的配置文件中指定 compile_commands.json 的路径即可。

通过 Ctrl (cmd) + Shift + p 打开 Vscode 的命令面板，找到 C++ 的配置选项。

<img src="/images/cppconfig_forvscode.png" alt="vscode_config" style="zoom:50%;" />

打开后，插入 `"compileCommands": "path/to/your/compile_commands.json"` 代码即可。一个示例如下。

```json
{
    "configurations": [
        {
            "name": "Mac",
          	//////// 加上这条代码，指定 compile_commands.json 的路径 ////////
          	"compileCommands": "${workspaceFolder}/build/compile_commands.json",
          	/////////////////////////////////////////////////////////////
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c17",
            "cppStandard": "c++14",
            "intelliSenseMode": "macos-clang-arm64"
        }
    ],
    "version": 4
}
```
</br></br>

## 3. 在 Neovim 中使用

Neovim 的配置比较底层，要直接通过 Clangd 的 CLI 接口，定义 Clangd 应该从项目根目录的哪个路径下读取 compile_commands.json。

具体的细节，如果您使用 Neovim，我认为您大概率具备对 Clangd 文档的阅读、理解、使用能力。这里给出**个人配置示例**以供参考：

```lua
local function setup_cpp_lsp()
  vim.lsp.start({
    name = 'clangd',
    cmd = {'clangd', '--background-index', '--clang-tidy', '--compile-commands-dir=build', '--header-insertion=never'},
    filetypes = {'cpp', 'c'},
    root_dir = vim.fs.root(0, {'.git', 'CMakeLists.txt'}),
    settings = {},
  })
end

```

配置在 `'--compile-commands-dir=build'` 这里，这实际上是 Clangd 官方文档中提供的 CLI。

这表明 Neovim 会去 `项目根目录` 下的 `build` 文件夹搜索并使用 `compile_commands.json` 文件。如果没有配置，默认是在项目根目录中搜索，这您可以根据使用习惯自由设置。

