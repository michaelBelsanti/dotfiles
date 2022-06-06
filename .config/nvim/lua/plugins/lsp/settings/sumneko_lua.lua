return {
	settings = {
		Lua = {
			diagnostics = {
				globals = { "vim", "awesome", "root", "client", "tag", "screen" },
        disable = { "lowercase-global" },
			},
			workspace = {
				library = {
					[vim.fn.expand("$VIMRUNTIME/lua")] = true,
					[vim.fn.stdpath("config") .. "/lua"] = true,
				},
			},
		},
	},
}
