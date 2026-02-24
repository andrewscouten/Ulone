class GraphUtils {

    static importModule(module) {
        const { obsidian, app } = self.customJS || {};
        if (obsidian == null || app == null) throw new Error("customJS is null.");
        let adapter = app.vault.adapter;
        if (adapter instanceof obsidian.FileSystemAdapter) {
            let modulePath = `${adapter.getBasePath()}/(0) Files/src/${module}`
            delete global.require.cache[global.require.resolve(modulePath)];
            return require(modulePath);
        }
        throw new Error("Obsidian adapter is not a FileSystemAdapter.");
    }
    
    ConnectionGraph = GraphUtils.importModule("connections.js")
    
    connection(dv) {
        var graph = this.ConnectionGraph.create_graph(dv)
        dv.paragraph(graph)
    }
}