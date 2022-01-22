SHELL=/usr/bin/zsh

# Preferences
export EDITOR="nvim"
export VISUAL="vscodium"
export BROWSER=brave

# Useful settings
export MANGOHUD=1
export ENABLE_VKBASALT=1

# Consistent theming
export QT_QPA_PLATFORMTHEME=gtk2
export GTK_USE_PORTAL=1

# XDG Paths
export XDG_CONFIG_HOME=$HOME/.config
export XDG_CACHE_HOME=$HOME/.cache
export XDG_DATA_HOME=$HOME/.local/share
export XDG_STATE_HOME=$HOME/.local/state

# Keep ~ clean
export CUDA_CACHE_PATH="$XDG_CACHE_HOME"/nv
export XINITRC="$XDG_CONFIG_HOME"/X11/xinitrc
export WINEPREFIX="$XDG_DATA_HOME"/wineprefixes/default
export GNUPGHOME="$XDG_DATA_HOME"/gnupg
export ZDOTDIR="$HOME/.config/zsh"
export XMONAD_CONFIG_DIR=$HOME/.config/xmonad
export XMONAD_DATA_DIR=$HOME/.config/xmonad
export STACK_ROOT="$XDG_DATA_HOME"/stack
export CARGO_HOME="$XDG_DATA_HOME"/cargo
export MPLAYER_HOME="$XDG_CONFIG_HOME"/mplayer
export NUGET_PACKAGES="$XDG_CACHE_HOME"/NuGetPackages
export GTK_RC_FILES="$XDG_CONFIG_HOME"/gtk-1.0/gtkrc
export GTK2_RC_FILES="$XDG_CONFIG_HOME"/gtk-2.0/gtkrc
export GOPATH="$XDG_DATA_HOME"/go
export _Z_DATA="$XDG_DATA_HOME/z"
