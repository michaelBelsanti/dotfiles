-- Standard awesome library
local gears = require("gears")
local awful = require("awful")
-- local hotkeys_popup = require("awful.hotkeys_popup").widget
local hotkeys_popup = require("awful.hotkeys_popup")
-- Menubar library
local menubar = require("menubar")

-- Variables
local modkey = RC.vars.modkey

local launcher = RC.vars.launcher
local options = RC.vars.options
local windows = RC.vars.windows
local math = RC.vars.math

local terminal = RC.vars.terminal
local browser = RC.vars.browser
local discord = RC.vars.discord
local files = RC.vars.files
local screenshot = RC.vars.screenshot

local _M = {}

function _M.get()
  local globalkeys = gears.table.join(
    -- Launch programs
    awful.key({ modkey,           }, "Space", function () awful.spawn(terminal) end,
              {description = "launcher", group = "launch"}),
    awful.key({ modkey,           }, "Return", function () awful.spawn(terminal) end,
              {description = "terminal", group = "launch"}),
    awful.key({ modkey,           }, "m", function () awful.spawn(math) end,
              {description = "math prompt", group = "launch"}),
    awful.key({ modkey,           }, "b", function () awful.spawn(browser) end,
              {description = "browser", group = "launch"}),
    awful.key({ modkey,           }, "d", function () awful.spawn(discord) end,
              {description = "discord", group = "launch"}),
    awful.key({ modkey,           }, "e", function () awful.spawn(files) end,
              {description = "file browser", group = "launch"}),
    awful.key({ modkey,           }, "s", function () awful.spawn(screenshot) end,
              {description = "screenshot", group = "launch"}),

    -- System
    awful.key({ modkey,           }, "o", function () awful.spawn(options) end,
              {description = "options menu", group = "system"}),
    awful.key({ modkey,           }, "Tab", function () awful.spawn(windows) end,
              {description = "window search", group = "system"}),
    awful.key({ modkey, "Shift"     }, "q", function () awful.spawn("xkill") end,
              {description = "click to kill", group = "system"}),
    awful.key({ modkey,           }, "u", function () awful.spawn("~/.config/polybar/scripts/runupdate.sh") end,
              {description = "run updates", group = "system"}),
    awful.key({ modkey, "Shift", "Control",}, "e", function () awful.spawn("~/.scripts/eerestart.sh") end,
              {description = "restart mic", group = "system"}),
    awful.key({ modkey, "Shift"   }, "c", function () awful.spawn("~/.scripts/picom.sh") end,
              {description = "toggle compositor", group = "system"}),
    awful.key({ modkey,           }, "n", function () awful.spawn("~/.scripts/togdnd.sh") end,
              {description = "toggle dnd", group = "system"}),
    awful.key({ modkey,           }, "Escape", function () awful.spawn("betterlockscreen --off 20 -l dimblur") end,
              {description = "lock screen", group = "system"}),

    -- Awesome specific
    awful.key({ modkey, "Shift" }, "r", awesome.restart,
              {description = "reload awesome", group = "awesome"}),
        awful.key({ modkey,           }, "Left",   awful.tag.viewprev,
              {description = "view previous", group = "tag"}),
    awful.key({ modkey,           }, "Right",  awful.tag.viewnext,
              {description = "view next", group = "tag"}),
    awful.key({ modkey,           }, "Escape", awful.tag.history.restore,
              {description = "go back", group = "tag"}),

    awful.key({ modkey,           }, "j",
        function ()
            awful.client.focus.byidx( 1)
        end,
        {description = "focus next by index", group = "client"}
    ),
    awful.key({ modkey,           }, "k",
        function ()
            awful.client.focus.byidx(-1)
        end,
        {description = "focus previous by index", group = "client"}
    ),
    awful.key({ modkey,           }, "w", function () RC.mainmenu:show() end,
              {description = "show main menu", group = "awesome"}),

    awful.key({ modkey, "Shift"   }, "j", function () awful.client.swap.byidx(  1)    end,
              {description = "swap with next client by index", group = "client"}),
    awful.key({ modkey, "Shift"   }, "k", function () awful.client.swap.byidx( -1)    end,
              {description = "swap with previous client by index", group = "client"}),
    awful.key({ modkey, "Control" }, "j", function () awful.screen.focus_relative( 1) end,
              {description = "focus the next screen", group = "screen"}),
    awful.key({ modkey, "Control" }, "k", function () awful.screen.focus_relative(-1) end,
              {description = "focus the previous screen", group = "screen"}),
    awful.key({ modkey,           }, "u", awful.client.urgent.jumpto,
              {description = "jump to urgent client", group = "client"}),
    awful.key({ modkey,           }, "Tab",
        function ()
            awful.client.focus.history.previous()
            if client.focus then
                client.focus:raise()
            end
        end,
        {description = "go back", group = "client"}),

    awful.key({ modkey,           }, "l",     function () awful.tag.incmwfact( 0.05)          end,
              {description = "increase master width factor", group = "layout"}),
    awful.key({ modkey,           }, "h",     function () awful.tag.incmwfact(-0.05)          end,
              {description = "decrease master width factor", group = "layout"}),
    awful.key({ modkey, "Shift"   }, "h",     function () awful.tag.incnmaster( 1, nil, true) end,
              {description = "increase the number of master clients", group = "layout"}),
    awful.key({ modkey, "Shift"   }, "l",     function () awful.tag.incnmaster(-1, nil, true) end,
              {description = "decrease the number of master clients", group = "layout"}),
    awful.key({ modkey, "Control" }, "h",     function () awful.tag.incncol( 1, nil, true)    end,
              {description = "increase the number of columns", group = "layout"}),
    awful.key({ modkey, "Control" }, "l",     function () awful.tag.incncol(-1, nil, true)    end,
              {description = "decrease the number of columns", group = "layout"}),
    awful.key({ modkey,           }, "space", function () awful.layout.inc( 1)                end,
              {description = "select next", group = "layout"}),
    awful.key({ modkey, "Shift"   }, "space", function () awful.layout.inc(-1)                end,
              {description = "select previous", group = "layout"}),

    awful.key({ modkey, "Control" }, "n",
              function ()
                  local c = awful.client.restore()
                  -- Focus restored client
                  if c then
                    c:emit_signal(
                        "request::activate", "key.unminimize", {raise = true}
                    )
                  end
              end,
              {description = "restore minimized", group = "client"})
  )

  return globalkeys
end
