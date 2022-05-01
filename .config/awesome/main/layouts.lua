local awful = require("awful")
local _M = {}

function _M.get()
  local layouts = {
      awful.layout.suit.tile,
      awful.layout.suit.floating,
      -- awful.layout.suit.tile.left,
      -- awful.layout.suit.tile.bottom,
      -- awful.layout.suit.tile.top,
      -- awful.layout.suit.fair,
      -- awful.layout.suit.fair.horizontal,
      -- awful.layout.suit.spiral,
      -- awful.layout.suit.spiral.dwindle,
      -- awful.layout.suit.max,
      awful.layout.suit.max.fullscreen,
      -- awful.layout.suit.magnifier,
      -- awful.layout.suit.corner.nw,
      -- awful.layout.suit.corner.ne,
      -- awful.layout.suit.corner.sw,
      -- awful.layout.suit.corner.se,
  }
  return layouts
end

return setmetatable(
  {},
  { __call = function (_, ...) return _M.get(...) end }
)

-----------------------------------------------------------------

-- For named tags

--[[ function _M.get ()
  local tags = {}

  local tagpairs = {
--  names  = { "term", "net", "edit", "place", 5, 6, 7, 8, 9 },
    names  = {
      "❶ 一 term", "❷ 二 net", "❸ 三 edit",
      "❹ 四 place", "❺ 五 mail",
      " ❻ 六", "❼ 七", " ❽ 八", "❾ 九" },

    layout = {
      RC.layouts[1], RC.layouts[2], RC.layouts[4],
      RC.layouts[5], RC.layouts[6], RC.layouts[12],
      RC.layouts[9], RC.layouts[3], RC.layouts[7]
    }
  }

  awful.screen.connect_for_each_screen(function(s)
    -- Each screen has its own tag table.
    tags[s] = awful.tag(tagpairs.names, s, tagpairs.layout)
  end)
  
  return tags
end ]]
