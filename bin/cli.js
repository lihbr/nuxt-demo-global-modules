const path = require("path");
const { readUser, writeUser } = require("rc9");
const pkg = require("../package.json");

const toggle = () => {
	// 1. Define module file path
	const modulePath = path.join(__dirname, "..");

	// 2. Get current .nuxtrc config
	const current = readUser(".nuxtrc");

	if (!current.buildModules || !current.buildModules.includes(modulePath)) {
		// 3.1. If the module is disabled, enable it
		current.buildModules = current.buildModules || [];
		current.buildModules.push(modulePath);

		writeUser(current, ".nuxtrc");
		console.info(`✅ ${pkg.name} enabled`);
	} else {
		// 3.2. Else the module is enabled, disable it
		current.buildModules = current.buildModules.filter(
			module => module !== modulePath
		);

		// Delete the array if empty
		if (current.buildModules.length === 0) {
			delete current.buildModules;
		}

		writeUser(current, ".nuxtrc");
		console.info(`❌ ${pkg.name} disabled`);
	}
};

toggle();
