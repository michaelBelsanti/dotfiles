#!/bin/sh

export ZDOTDIR=$HOME/.config/zsh
export PATH=/home/quasigod/.nimble/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/home/quasigod/.dotnet/tools:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:/home/quasigod/.local/bin
HISTFILE=~/.config/zsh/zsh-history
HISTSIZE=10000
SAVEHIST=1000
bindkey -e

# some useful options (man zshoptions)
setopt SHARE_HISTORY
setopt autocd autopushd 
setopt extendedglob nomatch menucomplete interactive_comments

stty stop undef     # Disable ctrl-s to freeze terminal.
# zle_highlight=('paste:none')

# beeping is annoying
unsetopt BEEP

# colors
autoload -Uz colors && colors

# functions
source "$ZDOTDIR/zsh-functions"

# plugins
zsh_add_plugin "zsh-users/zsh-autosuggestions"
zsh_add_plugin "zsh-users/zsh-completions"
zsh_add_plugin "zsh-users/zsh-syntax-highlighting"
zsh_add_plugin "Aloxaf/fzf-tab"

zsh_add_file "plugins/sudo.zsh"
zsh_add_file "plugins/copybuffer.zsh"
zsh_add_file "plugins/dirhistory.zsh"
zsh_add_file "plugins/colorful-man.zsh"

# fzf
source "/usr/share/fzf/key-bindings.zsh"
source "/usr/share/fzf/completion.zsh"

autoload -U compinit
compinit

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

# fix annoying fzf "do you wish..." shit
zstyle ':completion:*' list-prompt   ''
zstyle ':completion:*' select-prompt ''
# disable sort when completing `git checkout`
zstyle ':completion:*:git-checkout:*' sort false
# set descriptions format to enable group support
zstyle ':completion:*:descriptions' format '[%d]'
# set list-colors to enable filename colorizing
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
# # preview directory's content with exa when completing cd
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'exa -1a --color=always $realpath'
# # switch group using `,` and `.`
zstyle ':fzf-tab:*' switch-group ',' '.'

# startup
#pokemon-colorscripts -r # requires pokemon-colorscripts be installed
colorscript -r # requires dt's color scripts be installed

eval "$(zoxide init zsh)" #requires zoxide be installed
eval $(thefuck --alias) # requires thefuck be installed
source /usr/share/undistract-me/long-running.bash;notify_when_long_running_commands_finish_install # requires undistract-me be installed
