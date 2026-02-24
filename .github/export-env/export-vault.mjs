console.log('Starting export script...');

(async () => {
	try {
		console.log('Enabling plugins...');
		await this.app.plugins.setEnable(true);

		console.log('Enabling export plugin...');
		await this.app.plugins.enablePlugin('webpage-html-export');
		const plugin = await this.app.plugins.getPlugin('webpage-html-export');

		if (process.env.EXPORT_PRESET) {
			console.log(`Applying export preset: ${process.env.EXPORT_PRESET}`);
			if (process.env.EXPORT_PRESET === 'online') {
				await plugin.settings.onlinePreset();
			} else if (process.env.EXPORT_PRESET === 'local') {
				await plugin.settings.localPreset();
			} else if (process.env.EXPORT_PRESET === 'raw-documents') {
				await plugin.settings.rawDocumentsPreset();
			} else {
				console.log(`Unknown preset: ${process.env.EXPORT_PRESET}`);
			}
		}

		if (process.env.EXPORT_ENTIRE_VAULT) {
			console.log('Exporting entire vault...');
			await plugin.exportVault('/output');
		} else {
			console.log('Exporting...');
			await plugin.exportDocker();
		}

		console.log('Exported');
	} catch (error) {
		console.error('Export failed with error:');
		console.error(error);
		if (error && error.stack) {
			console.error(error.stack);
		}
	} finally {
		// Let the docker command complete, by killing the process
		console.log('Killing obsidian process');
		require('node:process').kill(process.pid, 'SIGKILL');
		console.log('Killed'); // Should never get here
	}
})();