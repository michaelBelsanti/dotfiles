-- If LuaRocks is installed, make sure that packages installed through it are
-- found (e.g. lgi). If LuaRocks is not installed, do nothing.
pcall(require, "luarocks.loader")

-- Standard awesome library
local gears = require("gears")
local awful = require("awful")
-- require("awful.autofocus")

-- Widget and layout library
-- local wibox = require("wibox")

-- Theme handling library
local beautiful = require("beautiful")

-- Misc libraries
-- local naughty = require("naughty")
local menubar = require("menubar")
-- Enable hotkeys help widget for VIM and other apps
-- when client with a matching name is opened:
-- require("awful.hotkeys_popup.keys")

-- Error handling
require("main.error-handling")

-- Importing user defined variables
RC = {}
RC.vars = require("main.user-variables")
modkey = RC.vars.modkey

-- Local libraries
local main = {
  layouts = require("main.layouts"),
  tags = require("main.tags"),
  menu = require("main.menu"),
  rules = require("main.rules"),
}
local binding = {
  globalbuttons = require("binds.globalbuttons"),
  clientbuttons = require("binds.clientbuttons"),
  globalkeys = require("binds.globalkeys"),
  clientkeys = require("binds.clientkeys"),
  bindtotags = require("binds.bindtotags"),
}

-- Require layouts
RC.layouts = main.layouts()

-- Tags
RC.tags = main.tags()

-- Menu
RC.mainmenu = awful.menu({ items = main.menu() })
RC.launcher = awful.widget.launcher(
  { image = beautiful.awesome_icon, menu = RC.mainmenu}
)

-- Binds
-- RC.globalkeys = binding.globalkeys()
-- RC.globalkeys = binding.bindtotags(RC.globalkeys)
RC.globalkeys = binding.bindtotags()

root.buttons(binding.globalbuttons())
root.keys(RC.globalkeys)

-- Rules
awful.rules.rules = main.rules(
  binding.clientkeys(),
  binding.clientbuttons()
)

-- Signals
require("main.signals")

-- Autostart
require("main.autostart")
