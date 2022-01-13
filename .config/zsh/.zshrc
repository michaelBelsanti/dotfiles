#!/bin/sh

export ZDOTDIR=$HOME/.config/zsh
export PATH=/home/quasigod/.nimble/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/home/quasigod/.dotnet/tools:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:/home/quasigod/.local/bin
HISTFILE=~/.config/zsh/.zsh_history
HISTSIZE=10000
SAVEHIST=1000
setopt SHARE_HISTORY
bindkey -e

# some useful options (man zshoptions)
setopt autocd extendedglob nomatch menucomplete
setopt interactive_comments
stty stop undef     # Disable ctrl-s to freeze terminal.
# zle_highlight=('paste:none')

# beeping is annoying
unsetopt BEEP

# colors
autoload -Uz colors && colors

# functions
source "$ZDOTDIR/zsh-functions"

# plugins
# zsh_add_plugin "zsh-users/zsh-autosuggestions"
zsh_add_plugin "marlonrichert/zsh-autocomplete"
zsh_add_plugin "zsh-users/zsh-syntax-highlighting"
#zsh_add_plugin "chitoku-k/fzf-zsh-completions"


# sourced files
zsh_add_file "zsh-aliases"
zsh_add_file "zsh-paliases"
zsh_add_file "zsh-exports"
zsh_add_file "zsh-prompt"

#binds
# ctrl del to delete word
bindkey '^[[3;5~' kill-word
# ctrl bckspc to delete word
bindkey '^[[3~' delete-char
# ctrl -> to move right one word
bindkey '^[[1;5C' forward-word
# ctrl <- to move left one word
bindkey '^[[1;5D' backward-word
bindkey -s '^F' 'fzf^M'

# bindkey '^K' up-line-or-search
# bindkey '^J' down-line-or-select

# completions
# autoload -Uz compinit
# # zstyle ':completion:*' menu select
# zstyle ':completion::complete:lsof:*' menu yes select
# zmodload zsh/complist
# # compinit
# _comp_options+=(globdots)       # Include hidden files.

# autoload -U up-line-or-beginning-search
# autoload -U down-line-or-beginning-search
# zle -N up-line-or-beginning-search
# zle -N down-line-or-beginning-search

# variables
export EDITOR="emacsclient -c -a ''"
export VISUAL="emacsclient -c -a ''"
export BROWSER=brave

# startup
#pokemon-colorscripts -r
colorscript -r

eval "$(zoxide init zsh)"

source /home/quasigod/.config/broot/launcher/bash/br
eval $(thefuck --alias)
