vim.cmd [[
try
  let g:catppuccin_flavour = "mocha"
  colorscheme catppuccin
catch /^Vim\%((\a\+)\)\=:E185/
  colorscheme default
  set background=dark
endtry
]]
