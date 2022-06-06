local _M = {
  terminal = os.getenv('TERMINAL') or 'alacritty',
  editor   = os.getenv('EDITOR')   or 'nvim',
  options  = "~/.config/rofi/options.sh",
  browser  = "firefox",
  run      = "rofi -show window -theme ~/.config/rofi/main.rasi",
  window   = "rofi -show {drun,window} -theme ~/.config/rofi/main.rasi",
  file     = "nemo",
  discord  = "flatpak run com.discordapp.Discord",
  dnd      = "~/.scripts/togdnd.sh",
  snip     = "gui",
  screenshot = "full --region 1920x1080+1920+0 -c",
  update   = "~/.config/polybar/scripts/runupdate.sh",
  compositor    = "~/.scripts/picom.sh",
  lock     = "betterlockscreen --off 10 -l dimblur",
  replay   = "replace_keycodes",
  pause    = "nyrna -t",
}

_M.editor_cmd = _M.terminal .. ' -e ' .. _M.editor
_M.manual_cmd = _M.terminal .. ' -e man awesome'

return _M
