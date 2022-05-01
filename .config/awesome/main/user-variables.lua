local home = os.getenv("HOME")

local _M = {

  term = "alacritty",
  modkey = "Mod4", -- Super
  wallpaper = home .. "/wallpapers/pastel.png",
  editor = "nvim",
  editor_cmd = term .. " -e " .. editor,

  launcher = "rofi -show drun -theme ~/.config/rofi/main.rasi",
  windows = "~/.config/rofi/options.sh",
  options = "rofi -show window -theme ~/.config/rofi/main.rasi",
  math = "rofi -show calc -theme ~/.config/rofi/calc.rasi -no-show-match -no-sort -calc-command 'echo -n {result} | xclip'",
  browser = "firefox",
  discord = "flatpak run com.discordapp.Discord",
  files = "nemo",
  screenshot = "flameshot gui",


}

return _M
