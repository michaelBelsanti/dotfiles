# copy the active line from the command line buffer 
# onto the system clipboard

copybuffer () {
  printf "%s" "$BUFFER" | xclip -sel clip
   zle -M "👍"
}

zle -N copybuffer

bindkey -M emacs "^O" copybuffer
bindkey -M viins "^O" copybuffer
bindkey -M vicmd "^O" copybuffer
