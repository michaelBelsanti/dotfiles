﻿## Set values
# Hide welcome message
set fish_greeting
set VIRTUAL_ENV_DISABLE_PROMPT "1"
set EDITOR "nvim"

# ~/.config/fish/config.fish

starship init fish | source

# exa > ls
alias ls='exa -al --color=always --group-directories-first --icons' # preferred listing
alias la='exa -a --color=always --group-directories-first --icons'  # all files and dirs
alias ll='exa -l --color=always --group-directories-first --icons'  # long format
alias lt='exa -aT --color=always --group-directories-first --icons' # tree listing
alias l.="exa -a | egrep '^\.'"                                     # show only dotfiles

# bat > cat
alias cat='bat --style header --style rules --style snip --style changes --style header'

# Common use
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'
alias dir='dir --color=auto'
alias broot='broot -h'
alias vdir='vdir --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias hw='hwinfo --short'                                   # Hardware Info
alias big="expac -H M '%m\t%n' | sort -h | nl"              # Sort installed packages according to size in MB (expac must be installed)
alias code='vscodium'
alias vim='nvim'
alias please='sudo'
alias cleanup='paru -Rns (paru -Qtdq)'
alias update='paru -Syu'
alias upgrade='paru -Syu'
alias rmcache='paru -Scc'
alias yay='paru'
alias nnn='nnn -H'

set -x TERM alacritty

## Run neofetch if session is interactive
if status --is-interactive
   fet.sh 
   pokemon-colorscripts -r
end

set thefuck fuck -hard 

thefuck --alias | source

navi widget fish | source
