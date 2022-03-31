--[[
 _____ __ _ __ _____ _____ _____ _______ _____
|     |  | |  |  ___|  ___|     |       |  ___|
|  -  |  | |  |  ___|___  |  |  |  | |  |  ___|
|__|__|_______|_____|_____|_____|__|_|__|_____|

--]]
pcall(require, "luarocks.loader")

-- Standard awesome library
local gfs = require("gears.filesystem")
local awful = require("awful")

-- Theme handling library
local beautiful = require("beautiful")
dpi = beautiful.xresources.apply_dpi
beautiful.init("~/.config/awesome/theme/theme.lua")

-- User vars
--------------
terminal = "alacritty"
editor = terminal .. " -e " .. os.getenv("EDITOR")
browser = "librewolf"
launcher = "rofi -show drun -theme ~/.config/rofi/main.rasi"
file_manager = "nemo"

-- openweathermap_key = ""
-- openweathermap_city_id = ""
-- weather_units = "metric" -- metric or imperial


-- Load configuration
-----------------------

-- Sub (signals for battery, volume, brightness, etc)
-- require("sub")

-- Misc (bar, titlebar, notification, etc)
require("misc")

-- Main (layouts, keybinds, rules, etc)
require("main")


-- Autostart
--------------

awful.spawn.with_shell("~/.config/awesome/main/autorun.sh")


-- Garbage Collector
----------------------

collectgarbage("setpause", 110)
collectgarbage("setstepmul", 1000)