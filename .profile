# Preferences
export EDITOR="nvim"
export VISUAL="vscodium"
export BROWSER=librewolf
export FZF_DEFAULT_COMMAND='find .'

# Better DXVK Shader Caching
export __GL_SHADER_DISK_CACHE=1     
export __GL_SHADER_DISK_CACHE_PATH='$HOME/Games/cache'
export __GL_SHADER_DISK_CACHE_SKIP_CLEANUP=1

# Less Latency
export __GL_MaxFramesAllowed=1

# Useful settings
export ENABLE_VKBASALT=1
export MANGOHUD=0

# Consistent theming
#export GTK_USE_PORTAL=1
export QT_QPA_PLATFORMTHEME=gtk2

# XDG Paths
export XDG_CONFIG_HOME=$HOME/.config
export XDG_CACHE_HOME=$HOME/.cache
export XDG_DATA_HOME=$HOME/.local/share
export XDG_STATE_HOME=$HOME/.local/state

# Keep ~ clean
export CARGO_HOME="$XDG_DATA_HOME"/cargo
export CUDA_CACHE_PATH="$XDG_CACHE_HOME"/nv
export GNUPGHOME="$XDG_DATA_HOME"/gnupg
export GOPATH="$XDG_DATA_HOME"/go
export GTK2_RC_FILES="$XDG_CONFIG_HOME"/gtk-2.0/gtkrc
export GTK_RC_FILES="$XDG_CONFIG_HOME"/gtk-1.0/gtkrc
export MPLAYER_HOME="$XDG_CONFIG_HOME"/mplayer
export NUGET_PACKAGES="$XDG_CACHE_HOME"/NuGetPackages
export OCTAVE_HISTFILE="$XDG_CACHE_HOME/octave-hsts"
export OCTAVE_SITE_INITFILE="$XDG_CONFIG_HOME/octave/octaverc"
export STACK_ROOT="$XDG_DATA_HOME"/stack
export WGETRC="$XDG_CONFIG_HOME/wgetrc"
export WINEPREFIX="$XDG_DATA_HOME"/wineprefixes/default
export XINITRC="$XDG_CONFIG_HOME"/X11/xinitrc
export XMONAD_CONFIG_DIR=$HOME/.config/xmonad
export XMONAD_DATA_DIR=$HOME/.config/xmonad
export ZDOTDIR="$HOME/.config/zsh"
export _JAVA_OPTIONS=-
Djava.util.prefs.userRoot="$XDG_CONFIG_HOME"/java
export _Z_DATA="$XDG_DATA_HOME/z"
rm $HOME/.xsession-errors.old
