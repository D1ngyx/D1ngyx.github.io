+++
date = '1999-10-09T15:00:00+08:00'
title = '[Linux] 个人Neovim和Tmux配置'
toc = true  # 启用目录
+++
**摘要：** 个人工作中用的 Neovim 和 Tmux 配置。备忘用，供参考。如果您使用这些工具，应该定义自己舒服的工作流，而不是照搬网上的配置，否则Vscode确实已经足够强大 :)

## Neovim
```lua
-- #####################################################
-- ##  ~/.config/nvim/init.lua                        ##
-- ##  Minimal Require: Neovim 0.7.0 (gclib >= 2.27)  ##
-- ##  Last Update: 2025.11.29                        ##
-- ##  By: dingyx109@gmail.com                        ##
-- #####################################################


-- ============================================================================
-- Global Definition  一些基本的全局定义
-- ============================================================================
local NUMBER_OF_TABSPACE = 4
local NUMBER_OF_KEEPLINES = 8
local LEFT_BAR_SIZE = 24
local NETRW_LISTSTYLE = 0
local NETRW_BANNER_DISABLE = 0
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"
vim.keymap.set("i", "jk", "<ESC>")
vim.keymap.set("n", "<leader>s", ":w<CR>", {remap=true})
vim.keymap.set("n", "<leader>q", ":q<CR>", {remap=true})
vim.keymap.set("n", "<leader>ff", ":find ", {desc = "Find file"})
local DARK_YELLOW = "#b58900"
local DARK_GREEN = "#228b22"
local LIGHT_YELLOW = "#ffd700"
local DARK_GREY = "#A9A9A9"


-- ============================================================================
-- Color Scheme Fix  对内置配色做一些自定义修正
-- ============================================================================
vim.o.background = "dark"
vim.cmd("colorscheme default")
vim.api.nvim_set_hl(0, "Number", { fg = LIGHT_YELLOW, bold = true })
vim.api.nvim_set_hl(0, "Comment", { fg = DARK_GREY, bold = true })

-- vim.o.background = "light"
-- vim.cmd("colorscheme quiet")
-- vim.api.nvim_set_hl(0, "String", {fg = DARK_GREEN})
-- vim.api.nvim_set_hl(0, "Number", {fg = DARK_YELLOW, bold=true})


-- ============================================================================
-- Display and Controll  基础的浏览和控制功能
-- ============================================================================
-- Basic Display  基础的显示、浏览功能
vim.opt.number = true                     -- Show line numbers
vim.opt.cursorline = true                 -- Highlight current line
vim.opt.wrap = false                      -- Don't wrap lines
vim.opt.scrolloff = NUMBER_OF_KEEPLINES   -- Keep some lines above/below cursor when scroll
-- Indentation  缩进相关
vim.opt.tabstop = NUMBER_OF_TABSPACE      -- Tab width
vim.opt.shiftwidth = NUMBER_OF_TABSPACE   -- Indent width
vim.opt.softtabstop = NUMBER_OF_TABSPACE  -- Soft tab stop
vim.opt.expandtab = true                  -- Use spaces instead of tabs
vim.opt.smartindent = true                -- Smart auto-indenting
vim.opt.autoindent = true                 -- Copy indent from current line
-- Search settings  搜索设置
vim.opt.ignorecase = true                 -- Case insensitive search
vim.opt.smartcase = true                  -- Case sensitive if uppercase in search
vim.opt.hlsearch = true                   -- Highlight search results 
vim.opt.incsearch = true                  -- Show matches as you type
-- Highlight yanked text  复制的时候高亮闪烁一下
local augroup = vim.api.nvim_create_augroup("UserConfig", {})
vim.api.nvim_create_autocmd("TextYankPost", {
  group = augroup,
  callback = function()
    vim.highlight.on_yank()
  end,
})
-- Visual settings
vim.opt.termguicolors = true                       -- Enable 24-bit colors
vim.opt.signcolumn = "yes"                         -- Always show sign column
vim.opt.cmdheight = 1                              -- Command line height
vim.opt.pumheight = 10                             -- Popup menu height 
vim.opt.conceallevel = 0                           -- Don't hide markup 
vim.opt.concealcursor = ""                         -- Don't hide cursor line markup 
vim.opt.lazyredraw = true                          -- Don't redraw during macros
vim.opt.synmaxcol = 300                            -- Syntax highlighting limit
-- File handling
vim.opt.backup = false                             -- Don't create backup files
vim.opt.writebackup = false                        -- Don't create backup before writing
vim.opt.swapfile = false                           -- Don't create swap files
vim.opt.undofile = true                            -- Persistent undo
vim.opt.undodir = vim.fn.expand("~/.config/nvim/undodir")  
vim.opt.updatetime = 250                           -- Faster completion
vim.opt.timeoutlen = 500                           -- Key timeout duration
vim.opt.ttimeoutlen = 0                            -- Key code timeout
vim.opt.autoread = true                            -- Auto reload files changed outside vim
vim.opt.autowrite = false                          -- Don't auto save
-- Behavior settings
vim.opt.errorbells = false                     -- No error bells
vim.opt.visualbell = true                      -- Use visual bell 
vim.opt.backspace = "indent,eol,start"         -- Better backspace behavior
vim.opt.autochdir = false                      -- Don't auto change directory
vim.opt.iskeyword:append("-")                  -- Treat dash as part of word
vim.opt.path:append("**")                      -- include subdirectories in search
vim.opt.mouse = "a"                            -- Enable mouse support
vim.opt.encoding = "UTF-8"                     -- Set encoding

 
-- ============================================================================
-- Multi Window Controll  多窗口控制
-- ============================================================================
vim.opt.splitbelow = true      
vim.opt.splitright = true     
vim.keymap.set('n', '<leader>o', '<C-w>w', { desc = 'Cycle windows forward' })
vim.keymap.set("n", "<leader>hl", ":vsplit<CR>", { desc = "Split window vertically" })
vim.keymap.set("n", "<leader>jk", ":split<CR>", { desc = "Split window horizontally" })
vim.keymap.set("n", "<M-k>", ":resize +2<CR>", { desc = "Increase window height" })
vim.keymap.set("n", "<M-j>", ":resize -2<CR>", { desc = "Decrease window height" })
vim.keymap.set("n", "<M-l>", ":vertical resize -2<CR>", { desc = "Decrease window width" })
vim.keymap.set("n", "<M-h>", ":vertical resize +2<CR>", { desc = "Increase window width" })


-- ============================================================================
-- Persistent Editing Records  持久化编辑记录
-- ============================================================================
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
-- Clipboard (OSC52)  OSC52剪贴板
-- ============================================================================
-- vo.clipboard:append("unnamedplus")        
vim.g.clipboard = 'osc52'
local function send_osc52(text)
  if not text or text == '' then return end
  local encoded = vim.fn.systemlist({'base64', '-w', '0'}, text)
  if encoded and encoded[1] then
    local osc52 = '\027]52;c;' .. encoded[1] .. '\007'
    local tty = vim.loop.new_tty(1, false)  
    -- Use vim.uv instead of vim.loop, after Nvim0.10, ref:https://neovim.io/doc/user/deprecated.html#_lsp
    -- local tty = vim.uv.new_tty(1, false)  
    tty:write(osc52)
  end
end
-- Listen yank event
vim.api.nvim_create_autocmd('TextYankPost', {
  pattern = '*',
  callback = function()
    if vim.v.event.regname == '+' or vim.v.event.regname == '' then
      local text = vim.fn.getreg('"')
      if #text > 0 then
        send_osc52(text)
        print(" [INFO]: Copied to system clipboard via OSC52. ")
      end
    end
  end,
})


-- ============================================================================
-- Netrw tree-liked side bar (left side bar)  左边那个文件树
-- ============================================================================
vim.g.netrw_liststyle = NETRW_LISTSTYLE
vim.g.netrw_winsize = LEFT_BAR_SIZE
vim.g.netrw_banner = NETRW_BANNER_DISABLE
vim.keymap.set("n", "<leader>e", ":Lexplore<CR>", { desc = "Open file explorer" }) 
-- 在 netrw 中复制文件路径
vim.api.nvim_create_autocmd("FileType", {
  pattern = "netrw",
  callback = function()
    vim.keymap.set("n", "<leader>pa", function()
      local path = vim.fn.fnamemodify(
        vim.b.netrw_curdir .. "/" .. vim.fn.matchstr(vim.fn.getline('.'), "\\S\\+$"),
        ":p"
      )
      -- vim.fn.setreg("+", path)
      send_osc52(path)
      print(" [INFO] Copied: " .. path .. "via OSC52")
    end, { buffer = true })
  end,
})

-- ============================================================================
-- Compeletion  补全(路径补全+缓存词补全)
-- ============================================================================
-- vim.keymap.set('i', '<Tab>', 'pumvisible() ? "<C-n>" : "<Tab>"', { expr = true })
-- vim.keymap.set('i', '<S-Tab>', 'pumvisible() ? "<C-p>" : "<S-Tab>"', { expr = true })
-- vscode-liked cmp menu.  类似 vscode 的补全功能(tab选择 回车确认)
local function feed_special_keys(keys)
    local keys = vim.api.nvim_replace_termcodes(keys, true, false, true)
    vim.api.nvim_feedkeys(keys, 'n', false)
end

vim.keymap.set('i', '<Tab>', function()
    if vim.fn.pumvisible() == 1 then
        feed_special_keys('<Down>')
        return ''
    else
        return '<Tab>'
    end
end, { expr = true })
vim.keymap.set('i', '<S-Tab>', function()
    if vim.fn.pumvisible() == 1 then
        feed_special_keys('<Up>')
        return ''
    else
        return '<S-Tab>'
    end
end, { expr = true })
vim.keymap.set('i', '<CR>', 'pumvisible() ? "<C-y>" : "<CR>"', { expr = true })
vim.opt.complete = {'.', 'w', 'b', 'u', 't'} 
vim.opt.completeopt = {'menu', 'menuone', 'noinsert', 'noselect'}
vim.opt.wildmenu = true
vim.opt.wildmode = "longest:full,full"
-- Event Listener
vim.api.nvim_create_autocmd({'TextChangedI', 'TextChangedP'}, { -- I for normal env, P for popmenu env
  pattern = '*',
  callback = function()
    local col = vim.fn.col('.') - 1
    local line = vim.api.nvim_get_current_line()
    local prev_chars = line:sub(col-1, col)
    local pum_visible = vim.fn.pumvisible() == 1
    local in_complete_mode = vim.fn.complete_info().mode ~= ''
    local buftype = vim.bo.buftype
    --========== 路径补全 ==========--
    if prev_chars:match('[/]') then
      if not pum_visible then 
        vim.schedule(function() pcall(feed_special_keys, '<C-x><C-f>') end)
      end
      return
    end
    --========== 缓冲区补全 ==========--
    if not prev_chars:match('[%w_][%w_]') then
      if pum_visible then 
        vim.schedule(function() pcall(feed_special_keys, '<C-e>') end)
      end
      return
    end
    -- pm已经弹出或者在补全状态中
    if pum_visible or in_complete_mode then
      return
    end
    -- 只在普通 buffer（排除 prompt/special）触发
    if buftype ~= '' then
      return
    end
    -- 触发补全
    vim.schedule(function() pcall(feed_special_keys, '<C-n>') end)
  end,
})


-- ============================================================================
-- A Littlebit Useless for ME  一些在我的工作流中好像没什么用的功能(用的很少)
-- ============================================================================
vim.keymap.set("v", "<leader>d", '"_d', { desc = "Delete without yanking" })
vim.keymap.set("n", "<leader>bn", ":bnext<CR>", { desc = "Next buffer" })
vim.keymap.set("n", "<leader>bp", ":bprevious<CR>", { desc = "Previous buffer" })
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
