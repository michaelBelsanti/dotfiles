local config_status_ok, nnn = pcall(require, "nnn")
if not config_status_ok then
  return
end

nnn.setup({
  explorer = {
    cmd = "nnn -H",
  },

  picker = {
    cmd = "nnn -H",
  },

  auto_close = true,
 })
