+++
date = '1999-10-09T15:00:00+08:00'
title = '[Linux] 个人Neovim和Tmux配置'
toc = true  # 启用目录
+++
**摘要：** 个人工作中用的 Neovim 和 Tmux 配置。备忘用，供参考。如果您使用这些工具，应该定义自己舒服的工作流，而不是照搬网上的配置，否则Vscode确实已经足够强大 :)

## Neovim
```lua
-- ============================================================================
-- Global Definition
-- ============================================================================
local vk = vim.keymap
local vo = vim.opt
local TABSPACE = 4
local KEEPLINE = 8
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- Dyx really need this
vk.set("i", "jk", "<ESC>")
vk.set("n", "<leader>s", ":w<CR>", {remap=true})

-- Basic settings
vo.number = true                  -- Line numbers
-- vim.opt.relativenumber = true          -- Relative line numbers
vo.cursorline = true              -- Highlight current line
vo.wrap = false                   -- Don't wrap lines
vo.scrolloff = KEEPLINE           -- Keep 10 lines above/below cursor 
-- vo.sidescrolloff = 8              -- Keep 8 columns left/right of cursor

-- Indentation
vo.tabstop = TABSPACE             -- Tab width
vo.shiftwidth = TABSPACE          -- Indent width
vo.softtabstop = TABSPACE         -- Soft tab stop
vo.expandtab = true               -- Use spaces instead of tabs
vo.smartindent = true             -- Smart auto-indenting
vo.autoindent = true              -- Copy indent from current line

-- Search settings
vo.ignorecase = true              -- Case insensitive search
vo.smartcase = true               -- Case sensitive if uppercase in search
vo.hlsearch = false               -- Don't highlight search results 
vo.incsearch = true               -- Show matches as you type

-- Visual settings
vim.opt.termguicolors = true                       -- Enable 24-bit colors
vim.opt.signcolumn = "yes"                         -- Always show sign column
-- vim.opt.colorcolumn = "100"                        -- Show column at 100 characters
vim.opt.showmatch = true                           -- Highlight matching brackets
vim.opt.matchtime = 2                              -- How long to show matching bracket
vim.opt.cmdheight = 1                              -- Command line height
-- vim.opt.showmode = false                           -- Don't show mode in command line 
vim.opt.pumheight = 10                             -- Popup menu height 
-- vim.opt.pumblend = 10                              -- Popup menu transparency 
-- vim.opt.winblend = 0                               -- Floating window transparency 
vim.opt.conceallevel = 0                           -- Don't hide markup 
vim.opt.concealcursor = ""                         -- Don't hide cursor line markup 
vim.opt.lazyredraw = true                          -- Don't redraw during macros
vim.opt.synmaxcol = 300                            -- Syntax highlighting limit

-- File handling
vo.backup = false                             -- Don't create backup files
vo.writebackup = false                        -- Don't create backup before writing
vo.swapfile = false                           -- Don't create swap files
vo.undofile = true                            -- Persistent undo
vo.undodir = vim.fn.expand("~/.vim/undodir")  -- Undo directory
vo.updatetime = 250                           -- Faster completion
vo.timeoutlen = 500                           -- Key timeout duration
vo.ttimeoutlen = 0                            -- Key code timeout
vo.autoread = true                            -- Auto reload files changed outside vim
vo.autowrite = false                          -- Don't auto save

-- Behavior settings
-- vo.hidden = true                          -- Allow hidden buffers
-- vo.modifiable = true                      -- Allow buffer modifications
vo.errorbells = false                     -- No error bells
vo.visualbell = true                      -- Use visual bell 
vo.backspace = "indent,eol,start"         -- Better backspace behavior
vo.autochdir = false                      -- Don't auto change directory
vo.iskeyword:append("-")                  -- Treat dash as part of word
vo.path:append("**")                      -- include subdirectories in search
vo.selection = "exclusive"                -- Selection behavior
vo.mouse = "a"                            -- Enable mouse support

-- 开启基于osc52的剪贴板 --
vim.g.clipboard = 'osc52'
vo.clipboard:append("unnamedplus")     
-- 开启基于osc52的剪贴板 --

vo.encoding = "UTF-8"                     -- Set encoding

-- Split behavior
vo.splitbelow = true      -- Horizontal splits go below
vo.splitright = true      -- Vertical splits go right

-- vk.set("x", "<leader>p", '"_dP', { desc = "Paste without yanking" })
vk.set("v", "<leader>d", '"_d', { desc = "Delete without yanking" })
vk.set("n", "<leader>e", ":Explore<CR>", { desc = "Open file explorer" }) 
vk.set("n", "<leader>ff", ":find ", { desc = "Find file" })

vk.set("n", "<leader>bn", ":bnext<CR>", { desc = "Next buffer" })
vk.set("n", "<leader>bp", ":bprevious<CR>", { desc = "Previous buffer" })

-- Better window navigation
vk.set('n', '<leader>o', '<C-w>w', { desc = 'Cycle windows forward' })

-- Splitting & Resizing
vk.set("n", "<leader>hl", ":vsplit<CR>", { desc = "Split window vertically" })
vk.set("n", "<leader>jk", ":split<CR>", { desc = "Split window horizontally" })
vk.set("n", "<M-k>", ":resize +2<CR>", { desc = "Increase window height" })
vk.set("n", "<M-j>", ":resize -2<CR>", { desc = "Decrease window height" })
vk.set("n", "<M-l>", ":vertical resize -2<CR>", { desc = "Decrease window width" })
vk.set("n", "<M-h>", ":vertical resize +2<CR>", { desc = "Increase window width" })

-- 
vk.set('i', '<Tab>', 'pumvisible() ? "<C-n>" : "<Tab>"', { expr = true })
vk.set('i', '<S-Tab>', 'pumvisible() ? "<C-p>" : "<S-Tab>"', { expr = true })
vim.keymap.set('i', '<M-c>p', '<C-x><C-f>', { noremap = true, silent = true })
vim.keymap.set('i', '<M-c>b', '<C-x><C-p>', { noremap = true, silent = true })
vim.keymap.set('i', '<M-c>l', '<C-x><C-o>', { noremap = true, silent = true })

vo.wildmenu = true
vo.wildmode = "longest:full,full"

-- Copy Full File-Path
vk.set("n", "<leader>pa", function()
	local path = vim.fn.expand("%:p")
	vim.fn.setreg("+", path)
	print("file:", path)
end)

-- Basic autocommands
local augroup = vim.api.nvim_create_augroup("UserConfig", {})

-- Highlight yanked text
vim.api.nvim_create_autocmd("TextYankPost", {
  group = augroup,
  callback = function()
    vim.highlight.on_yank()
  end,
})

-- !重要 下次打开文件从上次编辑的地方(行数)开始
vim.api.nvim_create_autocmd("BufReadPost", {
  group = augroup,
  callback = function()
    local mark = vim.api.nvim_buf_get_mark(0, '"')
    local lcount = vim.api.nvim_buf_line_count(0)
    if mark[1] > 0 and mark[1] <= lcount then
      pcall(vim.api.nvim_win_set_cursor, 0, mark)
    end
  end,
})

-- ============================================================================
-- Simple LSP 
-- ============================================================================
local function setup_cpp_lsp()
  vim.lsp.start({
    name = 'clangd',
    cmd = {'clangd', '--background-index', '--clang-tidy', '--compile-commands-dir=build', '--header-insertion=never'},
    filetypes = {'cpp', 'c'},
    root_dir = vim.fs.root(0, {'.git', 'CMakeLists.txt'}),
    settings = {},
  })
end

-- ??
local function setup_python_lsp()
  vim.lsp.start({
    name = 'pyright',
    cmd = {'pyright-langserver', '--stdio'},  
    filetypes = {'python'},
    root_dir = vim.fs.root(0, {'.git', 'setup.py'}),
    settings = {
        python = {
        },
    },
})
end

local function setup_shell_lsp()
  vim.lsp.start({
    name = 'bashls',
    cmd = {'bash-language-server', 'start'},
    filetypes = {'sh', 'bash', 'zsh'},
    root_dir = vim.fs.root(0, {'.git'}),
    settings = {
      bashIde = {
        globPattern = "*@(.sh|.inc|.bash|.command)"
      }
    }
  })
end

vim.api.nvim_create_autocmd('FileType', {
  pattern = 'sh,bash,zsh',
  callback = setup_shell_lsp,
  desc = 'Start shell LSP'
})

vim.api.nvim_create_autocmd('FileType', {
  pattern = 'cpp',
  callback = setup_cpp_lsp,
  desc = 'Start CPP LSP',
})

vim.api.nvim_create_autocmd('FileType', {
  pattern = 'python',
  callback = setup_python_lsp,
  desc = 'Start Python LSP'
})

-- keymap for lsp
vim.api.nvim_create_autocmd( "LspAttach", {
  callback = function(event)
    local opts = {buffer = event.buf}
    -- Navigation
    vk.set('n', 'gd', vim.lsp.buf.definition, opts)
    vk.set('n', 'gs', vim.lsp.buf.declaration, opts)
    vk.set('n', 'gr', vim.lsp.buf.references, opts)
    vk.set('n', 'gi', vim.lsp.buf.implementation, opts)
    -- Information
    vk.set('n', 'K', vim.lsp.buf.hover, opts)
    vk.set('n', '<C-k>', vim.lsp.buf.signature_help, opts)
    -- Code actions
    vk.set('n', '<leader>rn', vim.lsp.buf.rename, opts)
    -- Diagnostics
    vk.set('n', '<leader>d', vim.diagnostic.open_float, opts)
    vim.bo[event.buf].omnifunc = "v:lua.vim.lsp.omnifunc"
    if vim.fn.has"nvim-0.11" == 1 and vim.lsp.completion then
      vim.lsp.completion.enable(true, event.data.client_id, event.buf, {autotrigger = false})
    end
    -- setup_completion()
  end
})

vim.diagnostic.config({
  virtual_line = true,
  virtual_text = { prefix = '!' },
  signs = true,
  underline = true,
  update_in_insert = false,
  severity_sort = true,
  float = { border = 'rounded' }
})


-- ============================================================================
--  Package 
-- ============================================================================
-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)
-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
-- Setup lazy.nvim
require("lazy").setup({
  spec = {
    {
      -- add your plugins here
      'saghen/blink.cmp',
      opts = {
        fuzzy = {
          implementation = "lua", -- 强制使用 Lua 实现，不检查 Rust
        },
        keymap = {
          ['<S-Tab>'] = { 'select_prev', 'fallback' },
          ['<Tab>'] = { 'select_next', 'fallback' }, 
          ['<CR>'] = {'accept', 'fallback'}, 
        },
        completion = {
          list = {
            selection = {
              preselect = false,  -- 非常他妈的重要的一个配置
            },
          },
          menu = {
            border = "rounded",
          },
        },
      }
    },
    {
        'windwp/nvim-autopairs',
        event = "InsertEnter",
        config = true
    },
    {
      "vague2k/vague.nvim",
      opts = {italic = false}
    },

  },
  -- Configure any other settings here. See the documentation for more details.
  -- colorscheme that will be used when installing plugins.
  install = { colorscheme = { "habamax" } },
  -- automatically check for plugin updates
  checker = { enabled = false },
})

vim.cmd.colorscheme("vague")
```

</br></br></br>

## Tmux
``` bash
# ~/.tmux.conf

unbind C-b
set -g prefix C-f
bind C-f send-prefix

set -g mouse on

# 这个是针对 osc52 的一些剪切板适配，具体地，看文档 https://github.com/tmux/tmux/wiki/Clipboard 
set -g default-terminal "tmux-256color"
# set -g default-terminal "rxvt-unicode-256color"
set -as terminal-overrides ',screen-256color:Ms=\E]52;%p1%s;%p2%s\007'
set-option -s set-clipboard on

# 分割 window 成多个 panes
unbind /
bind / split-window -h -c "#{pane_current_path}" 
unbind -
bind - split-window -v  -c "#{pane_current_path}" 

# 选择 window 内的 pane
unbind p
bind p display-panes     
set -g display-panes-time 5000  # 展示 5 秒

# 调整窗口大小
bind -r C-h resize-pane -L 2  # 向左扩展5单位
bind -r C-l resize-pane -R 2  # 向右扩展5单位
bind -r C-k resize-pane -U 2  # 向上扩展5单位
bind -r C-j resize-pane -D 2  # 向下扩展5单位

# create 的时候，会继承当前的所在路径
unbind c
bind c new-window -c "#{pane_current_path}"

# 设置 vi 模式的 visual 操作
setw -g mode-keys vi

# 关闭窗口后刷新编号
set -g renumber-windows on

#unbind o                  # 解除默认的 prefix + o
#bind -r o select-pane -t :.+  # 将功能绑定到 prefix + o


# 基础状态栏设置
set -g status on
set -g status-interval 1
set -g status-justify left
set -g status-position bottom
 
# 颜色方案
# set -g status-style bg=default,fg=white
set -g status-style bg=black,fg=white
set -g window-status-current-style fg=green
 
# 状态栏布局
set -g status-left-length 30
set -g status-right-length 30
set -g status-left "#[fg=green]#S #[fg=white]|"

set -g status-right "#[fg=cyan]#{?client_prefix,⌨️ ,}#{?pane_in_mode,🖱️ ,}  #[fg=yellow]#{?#{SSH_CLIENT},🌐 #{@ip},🏠 Local}#[default] | %H:%M"
run-shell "tmux set -g @ip \"$(hostname -I | awk '{print $1}')\""


# 窗口列表设置
set -g window-status-format " #I:#W "
set -g window-status-current-format "#[fg=green,bold][#W]#[default]"
set -g window-status-separator ""
```
